import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { decryptHandle, setAlert } from '@/mixins';
import { auth, createUser, getUserByHandle, signIn, updateCredentials } from '@/firebase';
import ProfileForm from '@/components/ProfileForm';
import { useAuthState } from "react-firebase-hooks/auth";
import { isAddress } from 'ethereum-address';

export default function handler() {
    const router = useRouter()
    const [user, loading, error] = useAuthState(auth);
    const hash = router.query.hash
    const [currentUser, setCurrentUser] = useState('')

    const checkIfUserRegistered = (response) => {
        const resData = Object.values(response)[0]
        const conditions = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(resData.email) && isAddress(resData.wallet)
        if (conditions) {
            router.push('/')
        } else {
            setCurrentUser(resData.uuid)
        }
    }

    const submitForm = (data) => {
        createUser(data.email, data.password).then(() => {
            signIn(data.email, data.password)
            updateCredentials(data).then(() => {
                getUserByHandle(decryptHandle(hash).toUpperCase()).then((data) => {
                    const res = data.val()
                    if (res) {
                        setAlert('Successfully updated profile!')
                        window.location.href = "/connect"
                    } else {
                        router.push('/')
                    }
                })
            })
        })
    }
    

    useEffect(() => {
        if (user) {
            setAlert('Checking if you are part of the circle', `please wait...`)
            router.push('/connect')
        };
    }, [user, loading]);

    useEffect(() => {
        if (hash) {
            getUserByHandle(decryptHandle(hash).toUpperCase()).then((data) => {
                const res = data.val()
                if (res) {
                    checkIfUserRegistered(res)
                } else {
                    router.push('/')
                }
            })
        }
    }, [hash])

    return (
        <ProfileForm uuid={currentUser} submitData={submitForm} />
    )
}