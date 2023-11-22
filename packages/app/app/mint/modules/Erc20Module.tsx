import {Module} from "@/src/stores/useMintStore";
import {ContentCard} from "@/app/components/content/ContentCard";
import {BsX} from "react-icons/bs";
import TokenInput from "@/app/components/web3/TokenSelectorDialog";

export default function Erc20Card({onClick, module}: { onClick?: () => void, module: Module }) {
    return <ContentCard className="self-stretch">
        <div className="flex justify-between">
            <span className="text-card-title">Token</span>
            {onClick && <button className="hover:text-primary-500 pl-2" onClick={onClick}><BsX/></button>}
        </div>
        <TokenInput
            token={module.address}
            value={module.value}
        />
    </ContentCard>;
}
