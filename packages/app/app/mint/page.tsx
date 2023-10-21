'use client'
import {Card} from "@/app/components/Card";
import {FiArrowLeft, FiArrowRight} from "react-icons/fi";
import Button from "@/app/components/button/Button";
import Present from "~/present.svg";
import CurrentChain from "@/app/components/web3/CurrentChain";
import {AssetsForm} from "@/app/mint/pack/AssetsForm";
import {useCallback, useEffect, useState} from "react";
import {ApproveForm} from "@/app/mint/pack/ApproveForm";
import {SignForm} from "@/app/mint/pack/SignForm";
import {ReviewForm} from "@/app/mint/pack/ReviewForm";
import {LoadingCard} from "@/app/components/content/LoadingCard";
import {PackCreatedCard} from "@/app/mint/pack/PackCreatedCard";

const MintPage = () => {
    const [step, setStep] = useState(0)
    const signMessage = useCallback(() => {
    }, []);
    const next = useCallback(() => {
        if (step === 2) {
            signMessage()
        }
        setStep(step + 1)
    }, [step, signMessage]);
    const back = useCallback(() => {
        setStep(step - 1)
    }, [step]);

    useEffect(() => {
        if (step === 4) {
            setTimeout(() => {
                setStep(5)
            }, 3000)
        }
    }, [step]);

    if (step === 4) return (
        <LoadingCard
            title="Your pack is being created..."
            text='Waiting for Comfirmation...'
            transactionHash="askkhn"/>

    )
    if (step === 5) return (
        <PackCreatedCard/>
    )
    return (
        <Card
            className={'mx-auto w-full'}
            containerClassName=' overflow-y-auto'
            controls={
                <div className='w-full flex justify-between py-1'>
                    <Button
                        onClick={back}
                        variant="navigation" disabled={step == 0}
                        leftIcon={<FiArrowLeft className='text-inherit inline'/>}>
                        Back
                    </Button>
                    <Button
                        onClick={next}
                        variant="navigation" rightIcon={<FiArrowRight className='text-inherit inline'/>}>
                        {step === 2 ? 'Sign Message' : 'Next'}
                    </Button>
                </div>
            }>
            <div className="flex flex-col items-center gap-2">
                <div className="p-2 rounded-full bg-gray-800">
                    <Present className={'h-6 w-6'}/>
                </div>
                <h1 className="text-lg">Create new Pack</h1>
                <CurrentChain className='my-4'/>
                {step === 0 && <AssetsForm/>}
                {step === 1 && <ApproveForm/>}
                {step === 2 && <SignForm/>}
                {step === 3 && <ReviewForm/>}
            </div>
        </Card>
    );
};

export default MintPage;