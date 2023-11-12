import Erc721Card from "@/app/mint/modules/Erc721Module";
import Erc20Card from "@/app/mint/modules/Erc20Module";
import {ContentCard} from "@/app/components/content/ContentCard";
import {ContentTitle} from "@/app/components/content/ContentRow";
import {Module} from "@/src/stores/useMintStore";
import usePackdAddresses from "@/src/hooks/usePackdAddresses";
import {useMemo} from "react";

export const Modules = ({modules, onRemoveModule}: { modules: Module[], onRemoveModule?: (module: Module) => void }) => {
    const addresses = usePackdAddresses()

    return useMemo(() => modules.map((module) => {
        if (module.moduleAddress === addresses.ERC721Module) {
            return <Erc721Card key={module.address + module.value}
                               onClick={onRemoveModule ? () => onRemoveModule(module) : undefined}
                               module={module}/>
        }
        if (module.moduleAddress === addresses.ERC20Module) {
            return <Erc20Card key={module.address + module.value}
                              onClick={onRemoveModule ? () => onRemoveModule(module) : undefined}
                              module={module}/>
        }

        return <ContentCard key={module.address + module.value}>
            <ContentTitle>Unknown module</ContentTitle>
        </ContentCard>;
    }), [addresses, modules, onRemoveModule]);
}
