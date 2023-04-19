import React, { useEffect, useState } from 'react'
import LinkSub from '../LinkSub'
export default function LinkCarousel({ linkList }) {

    return <div className='w-full md:w-96'>
        <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-black rounded-box w-full py-2">
            {
                linkList.map((item, index) => {
                    return <div id={`item${index + 1}`} className="carousel-item w-full">
                        {
                            item.component()
                        }
                    </div>
                })
            }
        </div>
        <div className="flex justify-center w-full py-2 gap-2">
            {
                linkList.map((_, index) => {
                    return <a href={`#item${index + 1}`} className="btn btn-outline text-white btn-xs">{index + 1}</a>
                })
            }
        </div>
    </div>
}