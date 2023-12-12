import {useEffect, useMemo, useState} from "react";
import {getPublicClient} from "@wagmi/core";
import {useEthersSigner} from "@/src/hooks/useEthersSigner";

export const useEstimateGas = ({config, isEnabled = true}:{config: any, isEnabled?: boolean}) => {
    const [estimatedGas, setEstimatedGas] = useState<bigint>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const pc = useMemo(() => getPublicClient(), [])
    const ethersSigner = useEthersSigner();
    useEffect(() => {
        console.log(config, isEnabled)
        if (!config || !config.abi || !isEnabled) return;
        setIsLoading(true)
        setIsError(false)
        pc.estimateContractGas(config).then((gas) => {
            ethersSigner?.provider?.getFeeData().then((feeData) => {
                setEstimatedGas(gas * ((feeData.maxFeePerGas ?? 0n) + (feeData.maxPriorityFeePerGas??0n)))
            })
        }).catch(reason => {
            setIsError(true)
            console.error(reason);
        }).finally(() => {
            setIsLoading(false)
        })
    }, [pc, config, isEnabled])

    return {estimatedGas, isLoading, isError};
}
