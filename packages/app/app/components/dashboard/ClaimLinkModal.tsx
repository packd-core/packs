import {useCallback, useEffect, useState} from 'react'
import {Card} from "@/app/components/Card";
import {BsArrowLeft, BsArrowRight, BsLink45Deg, BsX} from "react-icons/bs";
import Modal from "@/app/components/dialog/Modal";
import {HelpItem} from "@/app/components/content/HelpItem";
import Button from "@/app/components/button/Button";
import {IoIosCheckmark} from "react-icons/io";
import PackLinkDetails from "@/app/mint/pack/PackLinkDetails";
import {useUrlEncodeDecode} from "@/src/hooks/useUrlEncodeDecode";
import {useClaimKeys} from "@/src/hooks/useClaimKeys";
import {useAccount} from "wagmi";
import {packMainABI} from "@/app/abi/generated";
import usePackdAddresses from "@/src/hooks/usePackdAddresses";
import {readContract} from "@wagmi/core";

function LinkGenerated(props: { onClick: () => void, claimPrivateKey: string, tokenId: bigint}) {


    const { urlEncoded, urlDecoded, decodedTokenId } = useUrlEncodeDecode(
        props.claimPrivateKey!,
        props.tokenId
    );

    useEffect(() => {
        console.log('urlEncoded', urlEncoded);
    }, [urlEncoded]);


    return <Card
        className={"mx-auto w-full bg-green-800"}
        controls={
            <div className="w-full flex justify-between py-1 px-2">
                <div>Generated!</div>
                <Button
                    variant="navigation"
                    rightIcon={<BsX/>}
                    onClick={props.onClick}
                >
                    Close
                </Button>
            </div>
        }>
        <div className="flex flex-col items-center gap-8">
            <div className="p-4 rounded-full bg-primary-500/25 relative">
                <BsLink45Deg className={"h-10 w-10 text-primary-500"}/>
                <IoIosCheckmark
                    className="bg-green-800 w-5 h-5 rounded-full absolute bottom-0 right-0 translate-x-1/4"/>
            </div>
            <h1 className="text-xl">Link Generated!</h1>
            <PackLinkDetails claimKey={urlEncoded}/>
        </div>
    </Card>;
}

export default function ClaimLinkModal({tokenId, isOpen, setIsOpen}: { tokenId: bigint, isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {
    const {address} = useAccount();
    const addresses = usePackdAddresses()
    const [nonce, setNonce] = useState(0n);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        //fetch accountNonce when the dialog appears.
        async function getAccountNonce() {
            const creationBlock = await readContract({
                address: addresses.PackMain,
                abi: packMainABI,
                functionName: 'creationBlock',
                args: [tokenId]
            })
            const data = await readContract({
                address: addresses.PackMain,
                abi: packMainABI,
                functionName: 'accountNonce',
                args: [address!],
                blockNumber: creationBlock - 1n,
            })
            console.log({creationBlock, data});

            setNonce(data);

        }
        setIsLoading(true);
        getAccountNonce().then(() => setIsLoading(false));

    }, []);

    const {
        claimPublicKey,
        claimPrivateKey,
        handlePrepareAndSignMessage,
        isSignLoading,
        isSignSuccess,
        prepareMessage
    } = useClaimKeys(nonce);
    const generateClaimLink = useCallback(() => {
        prepareMessage()
    }, [prepareMessage]);

    const card = useCallback((closeModal: () => void) => {
        if (!claimPrivateKey) {
            return <Card
                controls={<div className="flex justify-between items-center">
                    <Button
                        variant="navigation"
                        leftIcon={<BsArrowLeft/>}
                        onClick={closeModal}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="navigation"
                        rightIcon={<BsArrowRight/>}
                        onClick={generateClaimLink}
                        isLoading={isLoading || isSignLoading}
                    >
                        Generate claim link
                    </Button>
                </div>
                }>
                <div className="flex flex-col gap-2">
                    <div className="p-1 rounded-full bg-gray-800 self-center">
                        <BsLink45Deg className={'h-10 w-10 text-primary-500'}/>
                    </div>
                    <div className='text-center pb-8'>
                        <h2 className="text-2xl font-bold ">Claim link</h2>
                    </div>
                    <p>Sign a message to regenerate the claim link.
                        This is gas-less! No transactions will be send.</p>
                    <HelpItem title={'What am I signing?'}>
                        The signature is used as a seed for creating a new claim key. The signature content is
                        determined by the pack information, so you can reconstruct a claim key in the future again.
                    </HelpItem>

                </div>
            </Card>
        }
        return <LinkGenerated onClick={closeModal} claimPrivateKey={claimPrivateKey} tokenId={tokenId}/>
    }, [claimPrivateKey,isLoading, isSignLoading]);
    return (
        <Modal render={closeModal => card(closeModal)} isOpen={isOpen} setIsOpen={setIsOpen}/>
    )
}
