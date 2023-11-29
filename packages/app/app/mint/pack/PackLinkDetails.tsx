import {CopyTextButton} from "@/app/components/button/CopyTextButton";
import {HelpItem} from "@/app/components/content/HelpItem";
import {BiLogoTwitter} from "react-icons/bi";
import {ReviewData} from "@/app/mint/pack/ReviewForm";
import {useMintStore} from "@/src/stores/useMintStore";
import {useState} from "react";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";

export default function PackLinkDetails({claimKey, showContentButton, showContent}: { claimKey: string, showContentButton?: boolean, showContent?: boolean }) {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const link = origin + '/claim/' + claimKey;
    const modules = useMintStore(state => state.modules)
    const amountEth = useMintStore(state => state.eth)
    const [showData, setShowData] = useState(showContent ?? false);
    return <div className='flex flex-col gap-8 items-center max-w-full'>
        <p>Copy and share the Claim Link:</p>
        <div
            className="bg-[#099276] px-2 py-1 rounded-lg font-semibold text-white text-sm flex items-center max-w-full ">
            <div className="shrink grow break-all ">{link}</div>
            <CopyTextButton classNames="pl-2" text={link}/>
        </div>
        <HelpItem title="Careful with the claim Link">
            Anyone that knows the link can claim the pack contents. Be careful only to share it privately with the
            person you want to gift this pack.
        </HelpItem>
        {showContentButton && <div className='w-full'>
            <button className='text-sm self-start' onClick={() => setShowData(!showData)}>Contents {showData ? <FaChevronDown className='inline'/> : <FaChevronUp className='inline'/>}</button>
            <div className="border-gray-500 border-b-[1px] w-full mt-2">{''}</div>
        </div>}
        {showData && <ReviewData eth={amountEth} modules={modules}/>}


    </div>
}
