import React from 'react'

export default function ProfileCard({ profileDetails }) {
    return (
        <div className="flip-card md:hover:scale-110 transition-all pt-10">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <div className='w-11/12 h-56 md:w-96 md:h-60 m-auto bg-zinc-900 shadow-white rounded-xl'>
                        <div className='flex flex-col w-full'>
                            <span className='w-full text-neutral-300 flex flex-row items-center justify-between py-5 px-6 md:py-6 md:px-8 text-lg font-bold tracking-widest'>
                                {profileDetails.handle}
                                <span className='text-6xl'>⦿</span>
                            </span>
                            <span className='w-full text-neutral-300 font-thin flex flex-row items-start justify-center px-4 pt-10 md:px-8 text-xs'>
                            {profileDetails.wallet}
                            </span>
                            <span className='w-full text-neutral-300 flex flex-row items-start justify-end pt-3 px-8 text-xs font-bold tracking-widest'>
                            {profileDetails.role}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flip-card-back">
                    <div className='w-11/12 h-56 md:w-96 md:h-60 m-auto bg-zinc-900 rounded-xl'>
                        <div className='flex flex-col items-center justify-center w-full'>
                            <div className='w-full h-10 bg-black flex flex-row items-start justify-center mt-10 px-8 text-xs font-bold tracking-widest'>

                            </div>
                            <span className='w-full text-neutral-300 flex flex-row items-start justify-end pt-3 px-8 text-xs font-bold tracking-widest'>
                            {profileDetails.bio}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
