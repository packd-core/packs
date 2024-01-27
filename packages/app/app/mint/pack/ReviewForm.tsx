import {ContentTitle} from "@/app/components/content/ContentRow";
import {useEffect, useMemo} from "react";
import Button from "@/app/components/button/Button";
import {FiArrowLeft, FiArrowRight} from "react-icons/fi";
import {usePackState} from "@/app/mint/usePackState";
import usePackdAddresses from "@/src/hooks/usePackdAddresses";
import {useNetwork} from "wagmi";
import {useMintStore, Module} from "@/src/stores/useMintStore";
import {ContentCard} from "@/app/components/content/ContentCard";
import useMintPack from "@/src/hooks/useMintPack";
import {formatEther, formatUnits} from "ethers";
import {Modules} from "@/app/mint/modules/Modules";
import {useEstimateGas} from "@/src/hooks/useEstimateGas";


export const ReviewForm = () => {

    const setHash = usePackState(state => state.setLoading)
    const previousStep = usePackState(state => state.previousStep)
    const setControls = usePackState(state => state.setControls)
    const addresses = usePackdAddresses();
    const modules = useMintStore(state => state.modules)
    const amountEth = useMintStore(state => state.eth)
    const {chain} = useNetwork();
    const {write, isLoading, error, data, config, isPrepareSuccess} = useMintPack();
    const {estimatedGas, isLoading: isGasLoading, isError: isGasError} = useEstimateGas({config: config.request, isEnabled: isPrepareSuccess})
    const gasPrice = useMemo(() => estimatedGas ? ((formatUnits(estimatedGas, chain?.nativeCurrency?.decimals ?? 18) || '-') + chain?.nativeCurrency?.symbol) : 'Loading', [chain?.nativeCurrency?.decimals, chain?.nativeCurrency?.symbol, estimatedGas])

    useEffect(() => {
        if (data?.hash) {
            setHash(data!.hash)
        }
    }, [data, setHash]);
    useEffect(() => {
        setControls(<div className='w-full flex justify-between py-1'>
            <Button
                onClick={previousStep}
                variant="navigation"
                leftIcon={<FiArrowLeft className='text-inherit inline'/>}>
                Back
            </Button>
            <Button
                onClick={() => write && write()}
                variant="navigation" rightIcon={<FiArrowRight className='text-inherit inline'/>}>
                Pack it!
            </Button>
        </div>)
    }, [setControls, previousStep, write]);
    return (
        <div className="flex flex-col w-full gap-2">
            <div className='text-center pb-8'>
                <h2 className="text-2xl font-bold ">Review Pack Content</h2>
            </div>
            <ContentTitle>Contents</ContentTitle>
            <ReviewData
            eth={amountEth}
            modules={modules}/>
            <table className="font-semibold mt-4">
                <tbody>
                <tr>
                    <td className='text-gray-500'>Chain</td>
                    <td className='text-right'>{chain?.name}</td>
                </tr>
                <tr>
                    <td className='text-gray-500'>Gas fees</td>
                    <td className="text-right">~ {gasPrice}</td>
                </tr>
                </tbody>
            </table>
        </div>);
};

export function ReviewData({eth, modules, chainId}: { eth: bigint, modules: Module[], chainId?: number }) {
    return <>
        <ContentCard className="self-stretch">
            <div className="flex justify-between">
                <span className="text-card-title">ETH</span>
            </div>
            <input className="text-right w-full " disabled={true}
                   value={formatEther(eth ?? 0)}/>
        </ContentCard>
        <Modules modules={modules} chainId={chainId}  />
    </>
}
