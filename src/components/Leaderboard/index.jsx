import { db, getTop40 } from '@/firebase'
import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import ContentLoader from 'react-content-loader'

export default function LeaderBoard({ isLoaded }) {
    const [top40, setTop40] = useState([{}])
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        getTop40().then((snapshot) => {
            setTop40(Object.values(snapshot.val()).sort((a, b) => (a.connections > b.connections ? -1 : 1)).map((user) => { return { handle: user.handle, connections: user.connections } }))
            setLoaded(true)
            isLoaded()
        })
    }, [])

    return (loaded ?
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
        </div> : <div className='w-1/4 -ml-9 md:ml-20 m-auto flex flex-col items-center justify-center'> <ContentLoader
        className='self-center m-auto'
            speed={2}
            width={812}
            height={830}
            viewBox="0 0 812 830"
            backgroundColor="#1c1c1c"
            foregroundColor="#9a9898"
        >
            <rect x="169" y="19" rx="5" ry="5" width="234" height="17" />
            <rect x="169" y="19" rx="5" ry="5" width="234" height="17" />
            <rect x="35" y="84" rx="5" ry="5" width="239" height="15" />
            <rect x="296" y="83" rx="5" ry="5" width="239" height="15" />
            <rect x="35" y="134" rx="5" ry="5" width="239" height="15" />
            <rect x="297" y="133" rx="5" ry="5" width="239" height="15" />
            <rect x="35" y="181" rx="5" ry="5" width="239" height="15" />
            <rect x="296" y="180" rx="5" ry="5" width="239" height="15" />
            <rect x="34" y="226" rx="5" ry="5" width="239" height="15" />
            <rect x="296" y="225" rx="5" ry="5" width="239" height="15" />
            <rect x="36" y="270" rx="5" ry="5" width="239" height="15" />
            <rect x="297" y="269" rx="5" ry="5" width="239" height="15" />
            <rect x="37" y="320" rx="5" ry="5" width="239" height="15" />
            <rect x="299" y="319" rx="5" ry="5" width="239" height="15" />
            <rect x="39" y="362" rx="5" ry="5" width="239" height="15" />
            <rect x="300" y="361" rx="5" ry="5" width="239" height="15" />
            <rect x="42" y="416" rx="5" ry="5" width="239" height="15" />
            <rect x="304" y="415" rx="5" ry="5" width="239" height="15" />
            <rect x="39" y="457" rx="5" ry="5" width="239" height="15" />
            <rect x="300" y="456" rx="5" ry="5" width="239" height="15" />
            <rect x="39" y="507" rx="5" ry="5" width="239" height="15" />
            <rect x="301" y="506" rx="5" ry="5" width="239" height="15" />
            <rect x="39" y="554" rx="5" ry="5" width="239" height="15" />
            <rect x="300" y="553" rx="5" ry="5" width="239" height="15" />
            <rect x="38" y="599" rx="5" ry="5" width="239" height="15" />
            <rect x="300" y="598" rx="5" ry="5" width="239" height="15" />
            <rect x="40" y="643" rx="5" ry="5" width="239" height="15" />
            <rect x="301" y="642" rx="5" ry="5" width="239" height="15" />
            <rect x="41" y="693" rx="5" ry="5" width="239" height="15" />
            <rect x="303" y="692" rx="5" ry="5" width="239" height="15" />
            <rect x="43" y="735" rx="5" ry="5" width="239" height="15" />
            <rect x="304" y="734" rx="5" ry="5" width="239" height="15" />
            <rect x="43" y="787" rx="5" ry="5" width="239" height="15" />
            <rect x="305" y="786" rx="5" ry="5" width="239" height="15" />
        </ContentLoader></div>
    )
}