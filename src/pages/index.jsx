import React, { useState, useEffect } from 'react'
import Footer from '@/components/Footer/Footer'
import TextBlock from '@/components/TextBlock'
import PassBlock from '@/components/PassBlock'
import useUserAuth from '@/hooks/useUserAuth'
import { getUserByEmail, signIn } from '@/firebase'
import { useRouter } from 'next/router'
import { setAlert } from '@/mixins'

function index({ currentUser }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    if (router.isFallback) {
        return <div>Loading...</div>
      }
    useEffect(() => {
        async () => { 
            if (await currentUser) {
                router.push('/connect')
            }
        }
    }, [currentUser])

    const getUserData = (email) => {
        getUserByEmail(email).then((snapshot) => {
            const res = snapshot.val()
            if (res) {
                router.push('/connect')
            } else {
                setAlert('You are not part of the circle yet')
            }
        })
    }



    const onLogin = () => {
        setAlert('Logging in...')
        signIn(email, password).then(
            () => {
                getUserData(email)
            }
        ).catch((_) => {
            setAlert('Incorrect Credentials.')
        })
    }

    return (
        <div className='h-screen w-full flex flex-col items-center justify-between bg-black'>
            <div className="card transition-all flex flex-row items-center justify-center h-screen w-11/12 md:w-80 mt-10">
                <div className='w-fit h-fit m-auto flex flex-col items-center justify-center space-y-2'>
                    <TextBlock label="email" onChange={value => setEmail(value)} />
                    <PassBlock label="password" onChange={value => setPassword(value)} />
                    <button onClick={onLogin} className='w-full flex flex-row items-center justify-end space-x-2 mr-2 self-end text-white outline-none'>
                        <span className='text-5xl'>⦿</span> <span className='text-xs'>Login</span>
                    </button>
                </div>
            </div>
            <Footer isLogin={true} />
        </div>
    )
}

export default useUserAuth(index)


