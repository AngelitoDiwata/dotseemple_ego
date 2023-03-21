import React, { useState } from 'react'
import { twitter } from 'react-icons-kit/icomoon/'
import { Icon } from 'react-icons-kit'
import Footer from '@/components/Footer/Footer'
import TextBlock from '@/components/TextBlock'
import PassBlock from '@/components/PassBlock'

export default function index() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const onLogin = () => {

    }
    
    return (
        <div className='h-screen w-full flex flex-col items-center justify-between bg-black'>
            <div className="card transition-all flex flex-row items-center justify-center h-screen w-11/12 md:w-80 mt-10 shadow-xl shadow-neutral-900">
                <div className='w-fit h-fit m-auto flex flex-col items-center justify-center space-y-2'>
                    <TextBlock label="email" onChange={value => setEmail(value)} />
                    <PassBlock label="password" onChange={value => setPassword(value)} />
                    <button className='w-full flex flex-row items-center justify-end space-x-2 mr-2 self-end text-white outline-none'>
                        <span className='text-5xl'>⦿</span> <span className='text-xs'>Login</span>
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    )
}
