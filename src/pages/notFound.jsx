import React from 'react'
import { Icon } from 'react-icons-kit'
import Head from 'next/head';
import { fileText, twitter } from 'react-icons-kit/icomoon/'

export default function notFound() {
  return (
    <>
      <Head>
        <title>ᴅ ᴏ ᴛ ꜱ ᴇ ᴇ ᴍ ᴘ ʟ ᴇ</title>
      </Head>
      <div className='h-screen w-full flex flex-row items-center justify-center'>Coming this week...
        <footer className="absolute bg-black bottom-0 w-full flex flex-row items-center justify-center space-x-10 py-5">
          <a className='no-underline decoration-auto text-white text-2xl sticky bottom-0'
            href="/connect">
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
        </footer ></div>
    </>

  )
}
