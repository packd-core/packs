'use client'
import useWindowSize from 'react-use/lib/useWindowSize'
import ReactConfetti from 'react-confetti'
import {useEffect, useState} from "react";
import {usePackClaimedListener, usePackCreatedListener} from "@/src/event/events";
import {useHydrated} from "@/src/hooks/useHydrated";


export const Confetti = () => {
    const [visible, setVisible] = useState(false)
    const isHydrated = useHydrated()
    useEffect(() => {
        if (!visible) {
            return;
        }
        setTimeout(() => {
            setVisible(false)
        }, 6000)
    }, [visible]);
    usePackClaimedListener(() => {
        setVisible(true);
    })
    usePackCreatedListener(() => {
        setVisible(true);
    })
    return (
        isHydrated && visible && <_Confetti/>
    )
}

const _Confetti = () => {
    const {width, height} = useWindowSize()
    return (
        <ReactConfetti
            className='absolute inset-0 z-[1000]'
            width={width}
            height={height}
            numberOfPieces={500}
            recycle={false}
            gravity={0.2}
        />
    )
}
