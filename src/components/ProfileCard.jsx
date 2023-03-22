import React, { useEffect, useState } from 'react'
import ContentLoader from "react-content-loader"
export default function ProfileCard({ profileDetails, profileMode = false }) {
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(() => {
        if (profileDetails.uuid) {
            setIsLoaded(true)
        }
    }, [[profileDetails]])

    return (
        isLoaded ? <div className="flip-card md:hover:scale-110 transition-all pt-0">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <div className='w-11/12 h-56 md:w-96 md:h-60 m-auto bg-stone-900 shadow-white rounded-xl'>
                        <div className='flex flex-col w-full'>
                            <span className='w-full text-neutral-300 flex flex-row items-center justify-between py-5 px-6 md:py-6 md:px-8 text-lg font-bold tracking-widest'>
                                {profileDetails.handle}
                                <span className='text-xl md:text-5xl font-thin flex flex-row items-start justify-start tracking-tighter text-white'>⦿<sup className='text-xs tracking-normal font-light'>{profileDetails.connections}</sup></span>
                            </span>
                            <span className='w-full text-neutral-300 font-thin flex flex-row items-start justify-center px-4 pt-10 md:px-8 text-xs'>
                                {profileMode ? profileDetails.wallet : profileDetails.uuid}
                            </span>
                            <span className='w-full text-neutral-300 flex flex-row items-start justify-end pt-3 px-8 text-xs font-bold tracking-widest'>
                                {profileDetails.role}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flip-card-back">
                    <div className='w-11/12 h-56 md:w-96 md:h-60 m-auto bg-stone-900 rounded-xl'>
                        <div className='flex flex-col items-center justify-between w-full h-full'>
                            <div className='w-full h-10 bg-stone-700 flex flex-row items-center font-thin text-white justify-center mt-10 px-8 text-xs tracking-widest'>
                                About you:
                            </div>
                            <span className='italic text-xs font-extralight mx-10 mt-3 text-white'>{profileDetails.bio}</span>
                            <span className='text-xs font-semibold mx-10 mt-5 text-white self-end mb-10'>{profileDetails.email}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div> : <div className='w-full flex flex-row items-center justify-center'>
            <ContentLoader
                className=''
                speed={2}
                width={400}
                height={150}
                viewBox="0 0 400 150"
                backgroundColor="#1c1c1c"
                foregroundColor="#9a9898"
            >
                <circle cx="341" cy="35" r="23" />
                <rect x="38" y="25" rx="5" ry="5" width="234" height="17" />
                <rect x="39" y="83" rx="5" ry="5" width="337" height="15" />
                <rect x="254" y="135" rx="5" ry="5" width="123" height="12" />
            </ContentLoader>
        </div>
    )
}
