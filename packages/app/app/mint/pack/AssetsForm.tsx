import {ContentCard} from "@/app/components/content/ContentCard";
import Button from "@/app/components/button/Button";
import {AiOutlinePlus} from "react-icons/ai";
import {ContentTitle} from "@/app/components/content/ContentRow";
import {useAccount, useBalance} from "wagmi";
import {useEffect, useMemo, useState} from "react";
import {parseEther} from "ethers";
import clsxm from "@/src/lib/clsxm";
import {useMintStore} from "@/src/stores/useMintStore";
import usePackdAddresses from "@/src/hooks/usePackdAddresses";
import AddTokenModal from "@/app/mint/pack/AddTokenModal";
import AddNftModal from "@/app/mint/pack/AddNftModal";
import {usePackState} from "@/app/mint/usePackState";
import {FiArrowLeft, FiArrowRight} from "react-icons/fi";
import {Modules} from "@/app/mint/modules/Modules";
import Erc721Card from "@/app/mint/modules/Erc721Module";
import Erc20Card from "@/app/mint/modules/Erc20Module";
import {BsX} from "react-icons/bs";
import TokenInput, {TokenSelectorDialog} from "@/app/components/web3/TokenSelectorDialog";


export const AssetsForm = () => {
    const ethAmount = useMintStore(state => state.eth)
    const mintStore = useMintStore();
    const {ethBalance} = useOwnEthBalance();
    const isEthAmountValid = useMemo(() => ethAmount > 0 && ethAmount < (ethBalance?.value ?? BigInt(0)), [ethAmount, ethBalance])
    const addresses = usePackdAddresses();
    const modules = useMintStore(state => state.modules);
    const isAllModulesValid = useMemo(() => modules.every(m => m.isValid), [modules]);
    useAssetsControls({isEthAmountValid, isAllModulesValid});

    return (
        <>
            <ContentTitle>Contents</ContentTitle>
            <div className="flex flex-col w-full gap-2">
                <ContentCard className='self-stretch'>
                    <div className="flex justify-between">
                        <span className='text-card-title'>ETH</span>
                        <span className='text-card-title'>Available: {ethBalance?.formatted}</span>
                    </div>
                    <input
                        className={clsxm('text-right', !isEthAmountValid && 'text-red-500')}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (!isNaN(Number(value))) {
                                const val = parseEther(value == '' ? '0' : value as `${number}`)
                                mintStore.setEth(val);
                            }
                        }}
                    />
                </ContentCard>
                {modules.map((module) => {
                    if (module.moduleAddress === addresses.ERC721Module) {
                        return <Erc721Card key={module.id}
                                           onClick={() => mintStore.removeModule(module)}
                                           module={module}/>
                    }
                    if (module.moduleAddress === addresses.ERC20Module) {
                        console.log(module)
                        return <ContentCard className="self-stretch" key={module.id}>
                            <div className="flex justify-between">
                                <span className="text-card-title">Token</span>
                                <button className="hover:text-primary-500 pl-2" onClick={() => mintStore.removeModule(module) }><BsX/></button>
                            </div>
                            <TokenInput
                                token={module.address}
                                value={module.value}
                                onValueChanged={
                                    (value, isValid) => {
                                        console.log(value, isValid)
                                        mintStore.updateModule({
                                            ...module,
                                            value,
                                            isValid
                                        })
                                    }
                                }
                            />
                        </ContentCard>
                    }

                    return <ContentCard key={module.id}>
                        <ContentTitle>Unknown module</ContentTitle>
                    </ContentCard>;
                })
                }

                <AddAssetSelector/>
            </div>
        </>);
}

const AddAssetSelector = () => {
    const [isAddTokenModalOpen, setIsAddTokenModalOpen] = useState(false);
    const [isAddNftModalOpen, setIsAddNftModalOpen] = useState(false);
    const addresses = usePackdAddresses();
    const addModule = useMintStore(state => state.addModule);

    return <>
        {isAddTokenModalOpen &&  <TokenSelectorDialog isOpen={isAddTokenModalOpen} setIsOpen={setIsAddTokenModalOpen} onAdd={(t) => {
            setIsAddTokenModalOpen(false);
            addModule({
                address: t.address,
                moduleAddress: addresses.ERC20Module,
                isValid: false,
                type: 'ERC20'
            })
        }}/>}
        {isAddNftModalOpen && <AddNftModal
            isOpen={isAddNftModalOpen}
            setIsOpen={setIsAddNftModalOpen}
            onAdd={(address, tokenId) => {
                addModule({
                    address,
                    value: tokenId,
                    moduleAddress: addresses.ERC721Module,
                    isValid: true,
                    type: 'ERC721'
                })
            }}/>}
        <ContentCard className='self-stretch'>
            <span className='text-card-title'>Add assets</span>
            <div className='flex gap-2'>
                <Button
                    variant='flat' isDarkBg={true}
                    className='flex-1 justify-center bg-gray-600 text-white rounded-lg'
                    onClick={() => setIsAddTokenModalOpen(true)}
                    leftIcon={<AiOutlinePlus/>}>Token</Button>
                <Button
                    variant='flat' isDarkBg={true}
                    className='flex-1 justify-center bg-gray-600 text-white rounded-lg'
                    onClick={() => setIsAddNftModalOpen(true)}
                    leftIcon={<AiOutlinePlus/>}>NFT</Button>
            </div>
        </ContentCard></>
}


const useAssetsControls = ({isEthAmountValid, isAllModulesValid}: { isEthAmountValid: boolean, isAllModulesValid: boolean}) => {
    const nextStep = usePackState(state => state.nextStep)
    const setControls = usePackState(state => state.setControls)
    useEffect(() => {
        setControls(<div className='w-full flex justify-between py-1'>
            <Button
                variant="navigation" disabled={true}
                leftIcon={<FiArrowLeft className='text-inherit inline'/>}>
                Back
            </Button>
            {isEthAmountValid ? '✅' : '❌'}
            {isAllModulesValid ? '✅' : '❌'}
            <Button
                onClick={nextStep}
                disabled={!isEthAmountValid || !isAllModulesValid}
                className={clsxm(!isEthAmountValid && 'text-red-600')}
                variant="navigation" rightIcon={<FiArrowRight className='text-inherit inline'/>}>
                {'Next'}
            </Button>
        </div>)
    }, [nextStep, setControls, isEthAmountValid, isAllModulesValid]);

}

const useOwnEthBalance = () => {
    const {address} = useAccount();
    const {data: ethBalance, fetchStatus} = useBalance({address});
    return {ethBalance, fetchStatus}
}
