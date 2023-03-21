import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { decryptHandle, setAlert } from '@/mixins';
import { getUserByHandle } from '@/firebase';
import ProfileForm from '@/components/ProfileForm';
import ProfileCard from '@/components/ProfileCard';
import Footer from '@/components/Footer/Footer';

export default function register() {
    const router = useRouter()
    const { hash } = router.query
    const [user, setUser] = useState('')
    const [userData, setUserData] = useState({})
    const sendCardData = (data) => {
        return setUserData(data)
    }
    useEffect(() => {
        if (hash) {
            getUserByHandle(decryptHandle(hash).toUpperCase()).then((data) => {
                const res = data.val()
                if (res) {
                    const resData = Object.values(res)[0]
                    setUser(resData.uuid)
                } else {
                    router.push('/')
                }
            })
        }
    }, [hash])

    const submitForm = () => {
        setAlert('Successfully updated profile!',  JSON.stringify(userData))
    }
    return (
        <div className='h-screen w-full flex flex-col items-center justify-between space-y-5 bg-black'>
        <div className='flex flex-col md:flex-row items-center md:mt-32 justify-center space-y-3 space-x-0 md:space-y-0 md:space-x-10 px-3 bg-black h-screen'>
            <ProfileCard profileMode={true} profileDetails={userData} />
            <ProfileForm uuid={user} setData={sendCardData} submitData={submitForm} />
        </div>
        <Footer />
    </div>
    )
}