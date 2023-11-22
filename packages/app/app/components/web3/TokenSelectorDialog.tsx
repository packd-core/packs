import {useCallback, useEffect, useMemo, useState} from 'react'
import {BsChevronDown, BsSearch, BsX} from "react-icons/bs";
import {Address, useAccount, useBalance, useToken} from "wagmi";
import Modal from "@/app/components/dialog/Modal";
import Icon from '~/chain.svg'
import {formatUnits, parseUnits} from "ethers";
import clsxm from "@/src/lib/clsxm";
import {TokenData, useFilteredTokenList} from "@/src/hooks/useTokenList";

export default function TokenInput({token, value, onTokenSelected, onValueChanged, autoOpenModal}: {
    token?: Address,
    value?: bigint,
    onTokenSelected?: (address: Address) => void,
    onValueChanged?: (value: bigint, valid: boolean) => void,
    autoOpenModal?: boolean
}) {
    const {address} = useAccount()
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        if (autoOpenModal && !token) {
            setIsOpen(true);
        }
    }, [autoOpenModal, token]);
    const {data: tokenData} = useToken({address: token, enabled: !!token})
    const {data: balance} = useBalance({
        address: address as Address,
        token: token as Address,
        enabled: !!token
    })

    const isValid = useCallback((value: bigint) => !!(value && value > 0 && (value <= (balance?.value ?? BigInt(0)))),[balance?.value])
    const isValidAmount = useMemo(() => {
        if (!onValueChanged) {
            return true;
        }
        return isValid(value ?? 0n);
    }, [isValid, onValueChanged, value]);

    return <div>
        <TokenSelectorDialog isOpen={isOpen} setIsOpen={setIsOpen} onAdd={(t) => {
            setIsOpen(false);
            onTokenSelected?.(t.address);
            if (t.address != token) {
                onValueChanged?.(0n, false);
            }
        }}/>
        <div className='relative w-full'>
            <button onClick={() => onValueChanged && setIsOpen(true)}
                    className='absolute pl-2 left-0 bottom-0 top-0 flex items-center justify-center text-sm font-semibold'>
                {token ? <><Icon className="mr-1 h-4 shrink-0"/> {tokenData?.name}</> : 'Select token'}
                {onTokenSelected && <BsChevronDown
                    className='text-base ml-1 shrink-0'/>}
            </button>

            <input
                placeholder="amount"
                disabled={!token || !onValueChanged}
                value={onValueChanged == undefined ? formatUnits(value ?? 0n, tokenData?.decimals ?? 18) : undefined}
                className={clsxm('text-right w-full pl-12 text-xs py-2', !isValidAmount && 'text-red-500')}
                onChange={(e) => {
                    const value = e.target.value;
                    if (!isNaN(Number(value))) {
                        const val = parseUnits(value == '' ? '0' : value as `${number}`, tokenData?.decimals ?? 18);
                        onValueChanged?.(val, isValid(val));
                    } else {
                        onValueChanged?.(BigInt(-1), false);
                    }
                }}/>
        </div>


    </div>
}

export function TokenSelectorDialog({isOpen, setIsOpen, onAdd}: {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    onAdd: (token: TokenData) => void
}) {
    return <Modal render={closeModal => <TokenSelectorFrom onAdd={onAdd} closeModal={closeModal}/>} isOpen={isOpen}
                  setIsOpen={setIsOpen}/>
}


export function TokenSelectorFrom({closeModal, onAdd}: {
    closeModal: () => void,
    onAdd: (token: TokenData) => void
}) {

    const {filteredTokens, setQuery} = useFilteredTokenList();

    return (
        <div className='flex flex-col bg-[#202020] rounded-3xl gap-2 text-white p-4'>
            <div className="flex justify-between">
                <span className='text-card-title'>Select token</span>
                <button className="hover:text-primary-500 pl-2" onClick={closeModal}><BsX/></button>
            </div>
            <div className="border-gray-500 border-b-[1px]">{''}</div>
            <div className='relative'>
                <input
                    placeholder="Search name or paste address  "
                    className="w-full pl-8 text-xs py-2"
                    onChange={(event) => setQuery(event.target.value)}
                />
                <BsSearch className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400'/>
            </div>
            <div className="border-gray-500 border-b-[1px]">{''}</div>
            <div className="flex flex-col gap-2 h-60 overflow-y-auto">
                {filteredTokens.map((item) => (
                    <TokenSearchItem onClick={() => onAdd(item)}
                                     key={item.address}
                                     token={item}
                    />
                ))}
            </div>

        </div>
    )
}

function TokenSearchItem({token, onClick}: {
    token: TokenData
    onClick: () => void
}) {
    const {address} = useAccount()
    const {data: balance} = useBalance({
        address: address,
        token: token.address,
        cacheTime: 20000,
        enabled: !!address
    })

    const {data, isLoading, isError} = useToken({address: token.address, cacheTime: 20000})
    const name = useMemo(() => {
        return token?.name ?? data?.name ?? (isError ? 'Error: The provided address is not a token' : undefined) ?? 'Loading...';
    }, [token.name, data?.name, isError]);
    return <button
        onClick={onClick}
        disabled={isLoading || isError}
        className=" text-left flex items-center p-1 hover:border-gray-500 p rounded-lg border border-transparent">
        {token.logoURI ? <img src={token.logoURI} alt={name} className='h-6 mr-2'/> : <Icon className='h-6 mr-2'/>}

        <>
            <div className='flex flex-col grow'>
                <span
                    className={clsxm('text-card-title', isError && 'text-red-500 text-xs')}>{name} {data?.symbol ? `: ${data?.symbol}` : ''}</span>
                {!token.name && <span className='text-xs text-gray-400'>{token.address}</span>}
            </div>
        </>

        {isLoading && <span className='text-xs text-gray-400'>Loading...</span>}
        {!isLoading && !isError && <span className='text-card-title'>{balance?.formatted}</span>}
    </button>
}
