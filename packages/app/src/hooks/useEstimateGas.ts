import {useEffect, useMemo, useState} from "react";
import {getPublicClient} from "@wagmi/core";

export const useEstimateGas = ({config, isEnabled = true}:{config: any, isEnabled?: boolean}) => {
    const [estimatedGas, setEstimatedGas] = useState<bigint>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const pc = useMemo(() => getPublicClient(), [])

    useEffect(() => {
        console.log(config, isEnabled)
        if (!config || !config.abi || !isEnabled) return;
        setIsLoading(true)
        setIsError(false)
        pc.estimateContractGas(config).then((gas) => {
            pc.getGasPrice().then((price) => {
                setEstimatedGas(gas * price);
            });
        }).catch(reason => {
            setIsError(true)
            console.error(reason);
        }).finally(() => {
            setIsLoading(false)
        })
    }, [pc, config, isEnabled])

    return {estimatedGas, isLoading, isError};
}
