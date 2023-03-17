import React from 'react'
export default function NameCard({ profileDetails, profileMode = false }) {
    return (
        <div className="flip-card md:hover:scale-110 transition-all pt-3 md:pt-10">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <div className='w-11/12 h-56 md:w-96 md:h-60 m-auto bg-black shadow-white'>
                        <div className='flex flex-col w-full'>
                            <span className='w-full text-neutral-300 flex flex-row items-center justify-between py-5 px-6 md:py-6 md:px-8 text-base tracking-widest'>
                                {profileDetails.handle}
                                <span className='text-xl md:text-5xl font-thin flex flex-row items-start justify-start tracking-tighter text-white'>⦿<sup className='text-base tracking-normal'>{profileDetails.connections}</sup></span>
                            </span>
                            <span style={{
                                'overflowWrap': 'break-word',
                                'wordWrap': 'break-word',
                                'hyphens': 'auto'
                            }} className='px-5 z-10 text-3xl text-white mx-auto h-full overflow-y-scroll break-all w-11/12 leading-3 text-left mb-5 font-black tracking-widest'>{
                                    (<div className='w-full flex flex-wrap flex-row items-start justify-start'>
                                        {
                                            profileDetails.collections ? profileDetails.collections.map((_, index) => {
                                                return <span key={index} className='font-black text-3xl -my-2'>.</span>
                                            }) : ''
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
