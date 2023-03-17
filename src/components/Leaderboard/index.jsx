import { db, getTop40 } from '@/firebase'
import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'

export default function LeaderBoard({ isLoaded }) {
    const [top40, setTop40] = useState([{}])
    useEffect(() => {
        onValue(ref(db, 'data'), (_) => {
            getTop40().then((snapshot) => {
                setTop40(Object.values(snapshot.val()).sort((a, b) => (a.connections > b.connections ? -1 : 1)))
                isLoaded('leaderboard')
            })
        });
    }, [])

    return (
        <div className='text-white py-5 flex flex-col items-center justify-center space-x-2 w-11/12 md:w-4/5 m-auto mt-10 h-fit overflow-auto border border-gray-600'>
            <h3 className='text-base tracking-widest font-normal py-5'>LEADERBOARD</h3>
            <div className='flex flex-row items-start justify-center space-x-5'>
                <div className='flex flex-col space-y-3 items-start justify-center'>
                    {
                        top40.filter((_, index) => {
                            return index < 20
                        }).map((user, index) => <a href={`https://twitter.com/${user.handle && user.handle.replaceAll('@', '')}`} className='text-xs md:text-base' key={index}>{user.handle} - {user.connections}</a>)
                    }
                </div>
                <div className='flex flex-col space-y-3 items-end justify-center'>
                    {
                        top40.filter((_, index) => {
                            return index >= 20
                        }).map((user, index) => <a href={`https://twitter.com/${user.handle && user.handle.replaceAll('@', '')}`} className='text-xs md:text-base' key={index}>{user.handle} - {user.connections}</a>)
                    }
                </div>
            </div>
        </div>
    )
}