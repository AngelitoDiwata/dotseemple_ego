import React, { useEffect, useState } from 'react'
import ProfileCard from '../ProfileCard'
import { getUserByHandle } from '@/firebase'
import { db } from '@/firebase'
import { ref, onValue } from 'firebase/database'


export default function ProfileArea({ handle, id, isLoaded }) {
    const [user, setUser] = useState({})

    useEffect(() => {
        onValue(ref(db, `data/${id}`), (_) => {
            getUserData()
        });
    }, [handle])


    const getUserData = () => {
        if (handle) {
            getUserByHandle(handle).then((snapshot) => {
                setUser(Object.values(snapshot.val())[0])
                isLoaded()
            })
        }
    }
    return (
        <div className='w-full flex flex-row items-center justify-center'>
            <ProfileCard profileMode={true} profileDetails={user} />
        </div>
    )
}
