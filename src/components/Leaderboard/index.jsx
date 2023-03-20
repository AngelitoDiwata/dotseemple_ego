import { db, getTop40 } from '@/firebase'
import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'

export default function LeaderBoard({ isLoaded }) {
    const [top40, setTop40] = useState([{}])
    useEffect(() => {
        getTop40().then((snapshot) => {
            setTop40(Object.values(snapshot.val()).sort((a, b) => (a.connections > b.connections ? -1 : 1)).map((user) => { return { handle: user.handle, connections:user.connections}}))
            isLoaded('leaderboard')
        })
    }, [])

    return (
        <div className='text-white pb-10 flex flex-col items-center justify-center space-x-2 w-96 md:w-5/6 lg:w-3/4 m-auto mt-5 h-fit overflow-auto'>
            <h3 className='text-base tracking-widest font-normal py-5'>LEADERBOARD</h3>
            <div className='w-11/12 md:w-2/3 lg:w-11/12 flex flex-row items-start justify-center'>
                <div className='w-1/2 flex flex-col space-y-3 items-start justify-center'>
                    {
                        top40.filter((_, index) => {
                            return index < 20
                        }).map((user, index) => <a href={`https://twitter.com/${user.handle && user.handle.replaceAll('@', '')}`} className='text-xs md:text-base' key={index}>{user.handle} - {user.connections}</a>)
                    }
                </div>
                <div className='w-1/2 flex flex-col space-y-3 items-end justify-center'>
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