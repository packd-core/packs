import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {BsChevronDown, BsSearch, BsX} from "react-icons/bs";
import {Address, useAccount, useBalance, useNetwork, useToken} from "wagmi";
import Modal from "@/app/components/dialog/Modal";
import {formatUnits, parseUnits} from "ethers";
import clsxm from "@/src/lib/clsxm";
import {TokenData, useFilteredTokenList, useTokenList} from "@/src/hooks/useTokenList";
import {isAddress} from "viem";
import Image from "next/image";

export default function TokenInput({token, value, onTokenSelected, onValueChanged, autoOpenModal, chainId}: {
    token?: Address,
    value?: bigint,
    onTokenSelected?: (address: Address) => void,
    onValueChanged?: (value: bigint, valid: boolean) => void,
    autoOpenModal?: boolean,
    chainId?: number
}) {
    const {address} = useAccount()
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        if (autoOpenModal && !token) {
            setIsOpen(true);
        }
    }, [autoOpenModal, token]);
    const {data: tokenData} = useToken({address: token, enabled: !!token, chainId: chainId})
    const {data: balance} = useBalance({
        address: address as Address,
        token: token as Address,
        chainId: chainId,
        enabled: !!token
    })

    const isValid = useCallback((value: bigint) => !!(value && value > 0 && (value <= (balance?.value ?? BigInt(0)))), [balance?.value])
    const isValidAmount = useMemo(() => {
        if (!onValueChanged) {
            return true;
        }
        return isValid(value ?? 0n);
    }, [isValid, onValueChanged, value]);

    const isEditable = useMemo(() => onValueChanged, [onValueChanged]);
    const inputRef = useRef<HTMLInputElement>(null)
    const {chain} = useNetwork();
    const {tokenList: availableTokens} = useTokenList({chainId: chainId ?? chain?.id ?? 1})
    const icon = useMemo(() => {
        if (!token || !availableTokens || !isAddress(token)) {
            return <Image width={24} height={24} src='/p.png' alt="Unknown token icon"
                          className=' mr-1 h-4 w-4 shrink-0'/>
        }
        const tokenData = availableTokens.find(t => t.address == token);
        if (!tokenData) {
            return <Image width={24} height={24} src='/p.png' alt="Unknown token icon"
                          className=' mr-1 h-4 w-4 shrink-0'/>
        }
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={tokenData.logoURI} alt={tokenData.name} className='h-4 mr-1 shrink-0'/>
    }, [availableTokens, token]);
    useEffect(() => {
        inputRef.current!.value = formatUnits(value ?? 0n, tokenData?.decimals ?? 18);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <div>
        <TokenSelectorDialog isOpen={isOpen} setIsOpen={setIsOpen} onAdd={(t) => {
            setIsOpen(false);
            onTokenSelected?.(t.address);
            if (t.address != token) {
                onValueChanged?.(0n, false);
            }
        }}/>
        <div className='relative w-full'>
            {isEditable && <div className="absolute -top-6 right-6 z-10 text-xs">
                Balance: {formatUnits(balance?.value ?? 0n, tokenData?.decimals ?? 18)}
                <button className=" underline px-2 ml-1 rounded bg-gray-200/20" onClick={() => {
                    inputRef.current!.value = formatUnits(balance?.value ?? 0n, tokenData?.decimals ?? 18);
                    onValueChanged!(balance?.value ?? 0n, !!balance?.value);
                }}>Max
                </button>
            </div>}

            <button onClick={() => onValueChanged && setIsOpen(true)}
                    className='absolute pl-2 left-0 bottom-0 top-0 flex items-center justify-center text-sm font-semibold'>
                {token ? <>{icon} {tokenData?.name}</> : 'Select token'}
                {onTokenSelected && <BsChevronDown
                    className='text-base ml-1 shrink-0'/>}
            </button>

            <input
                ref={inputRef}
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

    const [tokensWithoutBalance, setTokensWithoutBalance] = useState<TokenData[]>(filteredTokens);
    const [tokensWithBalance, setTokensWithBalance] = useState<TokenData[]>([]);
    useEffect(() => {
        setTokensWithoutBalance(filteredTokens);
        setTokensWithBalance([]);
    }, [filteredTokens])
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
                {tokensWithBalance.map((item) => (
                    <TokenSearchItem onClick={() => onAdd(item)}
                                     key={item.address}
                                     token={item}
                    />
                ))}
                {tokensWithoutBalance.map((item) => (
                    <TokenSearchItem onClick={() => onAdd(item)}
                                     key={item.address}
                                     token={item}
                                     onBalanceLoaded={(balance) => {
                                         if (tokensWithBalance.includes(item) || balance === 0n) {
                                             return;
                                         }
                                         setTokensWithBalance([...tokensWithBalance, item])
                                         setTokensWithoutBalance(tokensWithoutBalance.filter(t => t.address != item.address));
                                     }
                                     }
                    />
                ))}
            </div>

        </div>
    )
}

function TokenSearchItem({token, onClick, onBalanceLoaded}: {
    token: TokenData
    onClick: () => void
    onBalanceLoaded?: (balance: bigint) => void
}) {
    const {address} = useAccount()
    const {data: balance, isLoading: isBalanceLoading} = useBalance({
        address: address,
        token: token.address,
        cacheTime: 20000,
        enabled: !!address
    })
    useEffect(() => {
        if (balance && !isBalanceLoading) {
            onBalanceLoaded?.(balance.value);
        }
    }, [balance, isBalanceLoading, onBalanceLoaded]);


    const {data, isLoading, isError} = useToken({address: token.address, cacheTime: 20000})
    const name = useMemo(() => {
        return token?.name ?? data?.name ?? (isError ? 'Error: The provided address is not a token' : undefined) ?? 'Loading...';
    }, [token.name, data?.name, isError]);
    return <button
        onClick={onClick}
        disabled={isLoading || isError}
        className=" text-left flex items-center p-1 hover:border-gray-500 p rounded-lg border border-transparent">
        {token.logoURI ? <img src={token.logoURI} alt={name} className='h-6 mr-2'/> :
            <Image width={24} height={24} src='/p.png' alt="Unknown token icon" className='h-6 mr-2'/>}

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
