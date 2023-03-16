import { db, getTop40 } from '@/firebase'
import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'

export default function LeaderBoard() {
    const [top40, setTop40] = useState([{}])
    useEffect(() => {
        onValue(ref(db, 'data'), (_) => {
            getTop40().then((snapshot) => {
                setTop40(Object.values(snapshot.val()).sort((a, b) => (a.connections > b.connections ? -1 : 1)))
            })
        });
    }, [])
    return (
        <div className='text-white py-5 flex flex-col items-center justify-center space-x-2 w-11/12 md:w-3/4 m-auto mt-10 h-fit overflow-auto border rounded-xl border-gray-600'>
            <h3 className='text-3xl tracking-widest font-semibold py-5'>THE TOP 40</h3>
            <div className='flex flex-row items-start justify-center space-x-5'>
                <div className='flex flex-col space-y-3 items-start justify-center'>
                    {
                        top40.filter((_, index) => {
                            return index < 20
                        }).map((user, index) => <a href={`https://twitter.com/${user.handle && user.handle.replaceAll('@', '')}`} className='text-xs md:text-sm' key={index}>{user.handle} - {user.connections}</a>)
                    }
                </div>
                <div className='flex flex-col space-y-3 items-start justify-center'>
                    {
                         top40.filter((_, index) => {
                            return index >= 20
                        }).map((user, index) => <a href={`https://twitter.com/${user.handle && user.handle.replaceAll('@', '')}`}  className='text-xs md:text-sm' key={index}>{user.handle} - {user.connections}</a>)
                    }
                </div>
            </div>
        </div>
    )
}