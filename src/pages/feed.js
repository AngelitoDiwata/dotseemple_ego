import { React, useEffect, useState } from 'react'
import { Icon } from 'react-icons-kit'
import { fileText, twitter } from 'react-icons-kit/icomoon/'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';
import Head from 'next/head';

export default function feed() {
    const router = useRouter()
    useEffect(() => {
        if (!Cookies.get('handle')) {
            router.push('/')
        }
    })
    return (
        <>
            <Head>
                <title>ᴅ ᴏ ᴛ ꜱ ᴇ ᴇ ᴍ ᴘ ʟ ᴇ</title>
            </Head>
            <div className='App w-full h-screen bg-black'>
                <div className='w-full md:w-1/2 m-auto pb-20'>
                    <a
                        async
                        className="twitter-timeline"
                        href="https://twitter.com/dotseemple"
                        target="_blank"
                        rel="noreferrer"
                        data-theme="dark"
                        data-chrome="noborders noheaders"
                    >
                    </a>
                </div>
                <footer className="absolute bg-black bottom-0 w-full flex flex-row items-center justify-center space-x-10 py-5">
                    <a className='no-underline decoration-auto text-white text-2xl sticky bottom-0'
                        href="/">
                        ⦿
                    </a>
                    <a className='no-underline decoration-auto text-white text-2xl sticky bottom-0'
                        href="/feed">
                        ⦾
                    </a>
                    <a className='no-underline decoration-auto text-white text-xs sticky bottom-0'
                        href="/notFound">
                        <Icon icon={fileText} />
                    </a>
                    <a className='no-underline decoration-auto text-white text-xs sticky bottom-0'
                        href="https://twitter.com/dotseemple" target="_blank">
                        <Icon icon={twitter} />
                    </a>
                </footer >

            </div>
        </>

    )
}
