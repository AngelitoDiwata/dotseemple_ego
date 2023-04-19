import { getParticipations, submitCampaignEntry } from '@/firebase'
import { setAlert, setConfAlert } from '@/mixins'
import React, { useEffect, useState } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

export default function LinkSub({ currentUser, id, title, okMsg, confMsg }) {

    const [link, setLink] = useState('')
    const [participated, setParticipated] = useState(false)
    const linkSubmit = () => {
        if (/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/.test(link)) {
            submitCampaignEntry({
                id,
                entry_id: currentUser.uuid,
                handle: currentUser.handle,
                wallet: currentUser.wallet,
                link
            }).then(() => {
                setParticipated(true)
                setAlert('', okMsg)
            })
        } else {
            setAlert('', 'Please submit a valid tweet link')
        }
    }

    useEffect(() => {
        checkParticipation(id)
    }, [currentUser])
    const checkParticipation = (id) => {
        getParticipations(id).then((snap) => {
            const data = snap.val()
            if (data) {
                if (Object.values(data).filter((participant) => participant.handle === currentUser.handle).length > 0) {
                    setParticipated(true)
                }
            }
        })
    }

    return (
        <div className="w-full md:w-96">
            <div className='text-white flex flex-col items-end justify-center space-y-5 w-full m-auto border border-dashed p-3 rounded-lg'>
                <div className='flex flex-col items-center justify-center space-y-1 w-full'>
                    <div className='w-full flex flex-row items-center text-center justify-start space-x-3'>
                        <span className='text-base text-center w-full'><ReactMarkdown>{title}</ReactMarkdown></span>
                    </div>
                    <input disabled={participated} onChange={(e) => setLink(e.target.value)} type="text" placeholder={participated ? 'You have submitted your entry' : 'https://twitter/com'} className="input text-base font-normal border-white focus:outline-none hover:outline-none bg-black w-full" />
                </div>
                <button disabled={participated} onClick={(e) => setConfAlert('', okMsg, confMsg, (succTitle) => linkSubmit(e, succTitle))} className="btn outline-solid text-white text-base font-normal outline-white btn-outline md:btn-md w-full rounded-none">{participated ? 'Already participated' : 'Submit link'}</button>
            </div>
        </div>
    )
}
