import React from 'react'
import { twitter } from 'react-icons-kit/icomoon/'
import { Icon } from 'react-icons-kit'
import { signOutUser } from '@/firebase'
import { useRouter } from 'next/router'
import { setAlert } from '@/mixins'

export default function Footer({ isLogin = false }) {
    const router = useRouter()
    const onLogout = () => {
        setAlert('Logging out...')
        signOutUser().then(() => {
            router.replace('/')
        })
    }
    return (
        <footer className="mx-auto bg-black bottom-0 w-full flex flex-row items-center justify-center space-x-10 py-5">
            <a className='no-underline decoration-auto text-white text-xs sticky bottom-0'
                href="https://twitter.com/dotseemple" target="_blank">
                <Icon icon={twitter} />
            </a>{
                !isLogin && <>
                    <span className="mx-10">|</span>
                    <span className='cursor-pointer' onClick={onLogout}>Log out</span></>
            }
        </footer >
    )
}
