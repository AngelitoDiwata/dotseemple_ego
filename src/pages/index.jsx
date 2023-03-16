import React from 'react'
import { twitter } from 'react-icons-kit/icomoon/'
import { Icon } from 'react-icons-kit'
import Footer from '@/components/Footer/Footer'

export default function index() {
    return (
        <div className='h-screen w-full flex flex-col items-center justify-between bg-black'>
            <div className="card transition-all w-11/12 md:w-80 mt-10 bg-neutral-800 shadow-xl shadow-neutral-900">
                <figure><img className='w-full' src="/breakfast.jpg" alt="breakfast" /></figure>
                <div className="card-body">
                    <span className="card-title text-white font-thin flex flex-col items-center justify-center tracking-widest leading-6 text-justify">
                        <span className='tracking-widest text-neutral-200 font-light text-sm text-center indent-5'>Seemple-site is under scheduled maintainance. dot be back shortly.</span>
                        <span className='tracking-widest text-neutral-400 font-light text-center text-xs'> ᴍᴇᴀɴᴡʜɪʟᴇ, ʜᴇʀᴇ'ꜱ ꜰᴏʀ ʙʀᴇᴀᴋꜰᴀꜱᴛ:</span>
                    </span>
                    <a className="text-center font-thin hover:scale-110 transition-all text-sm text-white hover:underline" href="https://bit.ly/scratch-paper" target="_blank">bit.ly/scratch-paper</a>
                </div>
            </div>
           <Footer />
        </div>
    )
}
