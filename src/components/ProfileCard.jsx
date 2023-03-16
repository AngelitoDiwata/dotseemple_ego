import React from 'react'
export default function ProfileCard({ profileDetails, profileMode = false }) {
    return (
        <div className="flip-card md:hover:scale-110 transition-all pt-10">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <div className='w-11/12 h-56 md:w-96 md:h-60 m-auto bg-zinc-900 shadow-white rounded-xl'>
                        <div className='flex flex-col w-full'>
                            <span className='w-full text-neutral-300 flex flex-row items-center justify-between py-5 px-6 md:py-6 md:px-8 text-lg font-bold tracking-widest'>
                                {profileDetails.handle}
                                <span className='text-xl md:text-5xl font-black flex flex-row items-start justify-start tracking-tighter'>⦿<sup className='text-xs tracking-normal font-light'>{profileDetails.connections}</sup></span>
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
                    <div className='w-11/12 h-56 md:w-96 md:h-60 m-auto bg-zinc-900 rounded-xl'>
                        <div className='flex flex-col items-center justify-center w-full h-full'>
                            <div className='w-full h-10 bg-stone-700 flex flex-row items-center font-thin justify-center mt-10 px-8 text-xs tracking-widest'>
                                current points
                            </div>
                            <span style={{
                                'overflowWrap': 'break-word',
                                'wordWrap': 'break-word',
                                'hyphens': 'auto'
                            }} className='px-5 text-3xl mx-auto h-full overflow-auto break-all w-full leading-3 text-left mb-5 font-black tracking-widest'>{
                                    (<div>
                                        {
                                            profileDetails.collections ? profileDetails.collections.map(() => {
                                                return '.'
                                            }).join('') : ''
                                        }
                                    </div>)
                                }</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
