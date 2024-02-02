import {Module} from "@/src/stores/useMintStore";
import {useEffect, useMemo, useState} from "react";
import {useEthersSigner} from "@/src/hooks/useEthersSigner";

const openCost = 107833;
// ERC20 Per module:
const erc20Cost = 39883;
const erc20CostAdditional = 32594;

//ERC721 Per module:
const erc721Cost = 47903;
const erc721CostAdditional = 40685;
export const useMinGasCost = (modules: Module[]) => useMemo(() => {
    const erc20Count = modules.filter(m => m.type === 'ERC20').length;
    const erc721Count = modules.filter(m => m.type === 'ERC721').length;
    let erc20CostTotal = 0;
    let erc721CostTotal = 0;
    if (erc20Count) {
        erc20CostTotal = erc20Cost + (erc20Count - 1) * erc20CostAdditional;
    }
    if (erc721Count) {
        erc721CostTotal = erc721Cost + (erc721Count - 1) * erc721CostAdditional;
    }
    return BigInt(openCost + erc20CostTotal + erc721CostTotal);
}, [modules]);

export const useEstimateMinGasFee = (modules: Module[]) => {
    const ethersSigner = useEthersSigner();
    const [estimatedGas, setEstimatedGas] = useState<bigint>()
    const minGasCost = useMinGasCost(modules);
    useEffect(() => {
        if (!minGasCost) {
            return;
        }
        ethersSigner?.provider?.getFeeData().then((feeData) => {
            setEstimatedGas(minGasCost! * ((feeData.maxFeePerGas ?? 0n) + (feeData.maxPriorityFeePerGas??0n)))
        })
    }, [ethersSigner?.provider, minGasCost]);
    return estimatedGas;
};

