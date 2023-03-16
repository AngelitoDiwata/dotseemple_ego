import React, { useEffect, useState } from 'react'

export default function DotGrid({ list, handle }) {
    const [prioList, setPrioList] = useState([])
    useEffect(() => {
        setPrioList([
            ...list.filter((item) => item.handle.toLowerCase() === handle.toLowerCase()),
            ...list.filter((item) => item.handle.toLowerCase() !== handle.toLowerCase())
        ])
    }, [list])
    return (
        <div className='bg-black w-full px-2 md:px-20 mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5 h-fit pb-32 pt-44 md:pt-16'>
            {
                prioList.map((data, ind) => {
                    return <a key={ind} href={`https://twitter.com/${data.handle.replaceAll('@', '')}`} className={`hover:scale-110 transition-all h-full w-full px-5 py-3 m-auto flex flex-col space-x-5 items-center justify-center text-white my-5 bg-black rounded-full`}>
                        <div className="w-full flex flex-row items-center justify-center space-x-2">
                            <span className={`no-underline decoration-auto text-white tracking-widest ${data.handle === handle ? 'font-black' : 'text-xs'}`}
                            >{data.handle}</span>
                            <span className='text-xl md:text-5xl font-black flex flex-row items-start justify-start tracking-tighter'>⦿<sup className='text-xs tracking-normal font-light'>{data.connections}</sup></span>
                        </div>
                        <span style={{
                            'overflowWrap': 'break-word',
                            'wordWrap': 'break-word',
                            'hyphens': 'auto'
                        }} className='text-3xl mx-auto h-16 overflow-auto break-all w-full leading-3 text-left mb-5 font-black tracking-widest'>{
                                (<div>
                                    {
                                    data.collections ? data.collections.map(() => {
                                        return '.'
                                    }).join('') : ''
                                    }
                                </div>)
                            }</span>
                    </a>
                })
            }
        </div>
    )
}
