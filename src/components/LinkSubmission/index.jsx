import { submitLink } from '@/firebase'
import { setAlert } from '@/mixins'
import React, { useState } from 'react'

export default function LinkSubmission({ eligible, user, onSubmit }) {

    const [link, setLink] = useState('')

    const linkSubmit = (e) => {
        e.preventDefault()
        if (/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/.test(link)) {
            submitLink({
                uuid: user.uuid,
                link
            })
            onSubmit()
            setAlert('', 'You have successfully submitted your entry. \r\n After 2 days of cooldown, you can submit again.')
        } else {
            setAlert('', 'Please enter a valid twitter link.')
        }
    }

    return (eligible &&
        <div className='text-white flex flex-row items-end justify-center space-x-2 w-full md:w-3/4 m-auto border border-dashed p-3 rounded-lg'>
            <div className='flex flex-col items-center justify-center space-y-1 w-fit'>
                <div className='w-full flex flex-row items-center justify-start space-x-3'>
                    <span className='text-base'>Submit a tweet link</span>
                </div>
                <input onChange={(e) => setLink(e.target.value)} type="text" placeholder="Tweet link" className="input text-base font-normal border-white focus:outline-none hover:outline-none bg-black w-full max-w-xs" />
            </div>
            <button onClick={(e) => linkSubmit(e)} className="btn outline-solid text-white text-base font-normal outline-white btn-outline md:btn-md w-fit rounded-none">Submit link</button>
        </div>
    )
}
