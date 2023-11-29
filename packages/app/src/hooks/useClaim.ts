
import {usePackMainOpen, usePreparePackMainOpen} from "@/app/abi/generated";
import usePackdAddresses from "@/src/hooks/usePackdAddresses";

export const useClaim = (claimData: any) => {
    const addresses = usePackdAddresses();
    const {
        config,
        error: prepareError,
        isError: isPrepareError,
    } = usePreparePackMainOpen({
        address: addresses.PackMain,
        args: [claimData],
        enabled: !!claimData.sigOwner

    });

    const {write, data, error, isLoading, isError}
        = usePackMainOpen(config);

    return {
        write,
        data,
        error,
        isLoading,
        isError,
        prepareError,
        isPrepareError,
    };
};
