import Present from "~/present.svg";
import {IoIosCheckmark} from "react-icons/io";
import {Card} from "@/app/components/Card";
import {BiLogoTwitter} from "react-icons/bi";
import {CheckMyWalletButton} from "@/app/components/web3/CheckMyWalletButton";
import {useEffect} from "react";
import {emitPackClaimed} from "@/src/event/events";
import {ReviewData} from "@/app/mint/pack/ReviewForm";
import {useClaimState} from "@/app/claim/[key]/useClaimState";

export function PackClaimedCard() {
    useEffect(() => {
        emitPackClaimed();
    }, []);
    const packData = useClaimState((state) => state.packData);

    return <Card
        className={'mx-auto w-full bg-green-800'}
        controls={
            <div className='w-full flex justify-between py-1 px-2'>
                <div>Claimed!</div>
                <CheckMyWalletButton/>
            </div>
        }>
        <div className="flex flex-col items-center gap-8">
            <div className="p-4 rounded-full bg-primary-500/25 relative">
                <Present className={'h-6 w-6'}/>
                <IoIosCheckmark className='bg-green-800 w-5 h-5 rounded-full absolute bottom-0 right-0 translate-x-1/4'/>
            </div>
            <h1 className="text-xl">You have been packed!</h1>
            <p className='my-4 text-gray-400 text-sm'>The contents of the pack are now in your wallet.</p>
            <ReviewData
                eth={packData?.ethValue ?? BigInt(0)}
                modules={packData?.fullModuleData ?? []}
            />
        </div>
    </Card>
}
