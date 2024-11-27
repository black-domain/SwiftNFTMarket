import { ReactNode, useEffect } from 'react'
import { ScrollTop } from '../utils/scrollTop'
import { useWallet } from '@suiet/wallet-kit';

interface Props {
    children: ReactNode
}

function AuthWallet(props: Props) {
    const { children } = props
    const { address, connected } = useWallet();
    useEffect(() => {
        ScrollTop()
        if (!connected) { (document.querySelector('#connectWalletButton') as any)?.click() }
        console.log(connected);
    }, [connected])

    return (
        <>
            {children}
        </>
    )
}

export default AuthWallet
