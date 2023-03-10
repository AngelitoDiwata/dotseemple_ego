import React from 'react'
import { twitter } from 'react-icons-kit/icomoon/'
import { Icon } from 'react-icons-kit'

export default function index() {
    return (
        <div className='h-screen w-full flex flex-row items-center justify-center bg-black'>
            <div className="card hover:scale-110 transition-all w-96 bg-neutral-800 shadow-xl shadow-neutral-900">
                <figure><img className='w-full' src="/breakfast.jpg" alt="breakfast" /></figure>
                <div className="card-body">
                    <span className="card-title text-white font-thin flex flex-col items-center justify-center tracking-widest leading-6 text-justify">
                    Testing is completed and we are temporarily placing the site under improvement. <br /><br/>
                        <span className='tracking-widest text-neutral-200 font-light text-sm text-justify indent-5'>πΈπ π’ππ πππ π ππππ ππ πππ πππππ ππππππ, ππππ πππππππ ππππ π’πππ ππππππ π πππ ππ ππππππππ ππππ π’ππ ππ ππππ.</span>
                        <span className='tracking-widest text-neutral-400 font-light text-xs'> α΄α΄α΄Ι΄α΄‘ΚΙͺΚα΄, Κα΄Κα΄'κ± κ°α΄Κ ΚΚα΄α΄α΄κ°α΄κ±α΄:</span>
                    </span>
                    <a className="text-center font-thin hover:scale-110 transition-all text-sm text-white hover:underline" href="https://bit.ly/seemple-whitepaper" target="_blank">πππ.ππ’/πππππππ-π πππππππππ</a>
                </div>
            </div>
            <footer className="absolute bg-black bottom-0 w-full flex flex-row items-center justify-center space-x-10 py-5">
                <a className='no-underline decoration-auto text-white text-xs sticky bottom-0'
                    href="https://twitter.com/dotseemple" target="_blank">
                    <Icon icon={twitter} />
                </a>
            </footer >
        </div>
    )
}
