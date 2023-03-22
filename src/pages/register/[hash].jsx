import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { decryptHandle, setAlert } from '@/mixins';
import { auth, createUser, getUserByHandle, updateCredentials } from '@/firebase';
import ProfileForm from '@/components/ProfileForm';
import ProfileCard from '@/components/ProfileCard';
import Footer from '@/components/Footer/Footer';
import { useAuthState } from "react-firebase-hooks/auth";

export default function register() {
    const router = useRouter()
    const [user, loading, error] = useAuthState(auth);
    const { hash } = router.query
    const [currentUser, setCurrentUser] = useState('')
    const [userData, setUserData] = useState({})
    const sendCardData = (data) => {
        return setUserData(data)
    }

    useEffect(() => {
        if (user) {
            setAlert('Checking if you are part of the circle', `please wait...`)
            router.replace('/connect')
        };
    }, [user, loading]);

    useEffect(() => {
        if (hash) {
            getUserByHandle(decryptHandle(hash).toUpperCase()).then((data) => {
                const res = data.val()
                if (res) {
                    const resData = Object.values(res)[0]
                    setCurrentUser(resData.uuid)
                } else {
                    router.push('/')
                }
            })
        }
    }, [hash])

    const submitForm = (data) => {
        createUser(data.email, data.password).then(() => {
            updateCredentials(data).then(() => {
                setAlert('Successfully updated profile!')
            })
        })
    }
    return (
        <div className='h-screen w-full flex flex-col items-center justify-between space-y-5 bg-black'>
            <div className='flex flex-col md:flex-row items-center md:mt-32 justify-center space-y-3 space-x-0 md:space-y-0 md:space-x-10 px-3 bg-black h-screen'>
                <ProfileCard profileMode={true} profileDetails={userData} />
                <ProfileForm uuid={currentUser} setData={sendCardData} submitData={submitForm} />
            </div>
            <Footer isLogin={true} />
        </div>
    )
}