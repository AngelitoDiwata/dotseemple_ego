import React from 'react'
import { Icon } from 'react-icons-kit'
import { fileText, twitter } from 'react-icons-kit/icomoon/'

export default function feed() {
    return (
        <div className='App w-full h-screen bg-black'>
            <div className='w-1/2 m-auto'>
                <a
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
                <a className='no-underline decoration-auto text-white text-xs sticky bottom-0'
                    href="/null">
                    <Icon icon={fileText} />
                </a>
                <a className='no-underline decoration-auto text-white text-xs sticky bottom-0'
                    href="https://twitter.com/dotseemple">
                    <Icon icon={twitter} />
                </a>
                <a className='no-underline decoration-auto text-white text-2xl sticky bottom-0'
                    href="/feed">
                    ⦾
                </a>
            </footer >
        </div>
    )
}
