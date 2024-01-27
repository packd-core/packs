import {useEffect, useMemo} from "react";
import Button from "@/app/components/button/Button";
import {FiArrowRight} from "react-icons/fi";
import {useClaimState} from "@/app/claim/[key]/useClaimState";
import {usePackDataByTokenId} from "@/src/hooks/usePackDataByTokenId";
import {ReviewData} from "@/app/mint/pack/ReviewForm";
import {usePackMainPackState} from "@/app/abi/generated";
import usePackdAddresses from "@/src/hooks/usePackdAddresses";
import clsxm from "@/src/lib/clsxm";
import {useNetwork} from "wagmi";

export default function InitialForm() {
    const nextStep = useClaimState((state) => state.nextStep);
    const previousStep = useClaimState((state) => state.previousStep);
    const setControls = useClaimState((state) => state.setControls);
    const tokenId = useClaimState((state) => state.mintedTokenId);
    const rawState = useClaimState((state) => state.tokenState);
    const packData = useClaimState((state) => state.packData);
    const chainId = useClaimState((state) => state.chainId);
    const {chain} = useNetwork();
    const isCorrectChain = useMemo(() => chain?.id === chainId, [chain?.id, chainId]);
    useEffect(() => {
        const isClaimed = rawState == BigInt(2);
        setControls(
            <div className={clsxm("w-full flex justify-end py-1", isClaimed && 'justify-center')}>
                {isClaimed && (
                    <div className="text-center">This pack has already been claimed!</div>
                )}

                {rawState === BigInt(1) && packData && (
                    isCorrectChain ? <Button
                            onClick={nextStep}
                            variant="navigation"
                            rightIcon={<FiArrowRight className="text-inherit inline"/>}
                        >
                            Claim
                        </Button> :
                        <div className="w-full flex-1 text-center"> The pack is available</div>
                )}
            </div>,
        );
    }, [nextStep, setControls, previousStep, rawState, packData, isCorrectChain]);
    return (
        <div className="flex flex-col w-full gap-2">
            {
                <ReviewData
                    eth={packData?.ethValue ?? BigInt(0)}
                    modules={packData?.fullModuleData ?? []}
                    chainId={chainId}
                />
            }
        </div>
    );
}
