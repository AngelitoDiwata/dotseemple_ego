import { deductPoints, getLinkSubContent, submitLink } from '@/firebase'
import { setAlert, setConfAlert } from '@/mixins'
import React, { useEffect, useState } from 'react'

export default function LinkSubmission({ eligible, user, onSubmit }) {

    const [link, setLink] = useState('')
    const [title, setTitle] = useState('')
    const [confMsg, setConfMsg] = useState('')
    const [okMsg, setOkMsg] = useState('')
    const [deductPts, setDeductPts] = useState(0)

    useEffect(() => {
        getLinkSubContent().then((snap) => {
            const ref = snap.val()
            if (ref) {
                setTitle(ref.title)
                setConfMsg(ref.confMsg)
                setOkMsg(ref.okMsg)
                setDeductPts(ref.deductPts)
            }
        })
    }, [])

    const linkSubmit = (e, title) => {
        e.preventDefault()
        if (/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/.test(link)) {
            submitLink({
                uuid: user.uuid,
                link
            })
            onSubmit()
            setAlert('', title)
        } else {
            setAlert('', 'Please enter a valid twitter link.')
        }
    }

    const deduct = (e, title) => {
        if (user.collections && deductPts <= user.collections.length) {
            deductPoints({
                uuid: user.uuid,
                collections: user.collections.slice(deductPts, user.collections.length)
            }).then(() => {
                linkSubmit(e, title)
            })
        } else {
            setAlert('', 'insufficient points to submit a link entry')
        }
    }

    return (eligible &&

        <div className="indicator w-11/12 md:w-96">
            <div className='text-white flex flex-col items-end justify-center space-y-5 w-full m-auto border border-dashed p-3 rounded-lg'>
                <div className='flex flex-col items-center justify-center space-y-1 w-full'>
                    <div className='w-full flex flex-row items-center text-center justify-start space-x-3'>
                        <span className='text-base text-center w-full'>{title}</span>
                    </div>
                    <input onChange={(e) => setLink(e.target.value)} type="text" placeholder="https://twitter/com" className="input text-base font-normal border-white focus:outline-none hover:outline-none bg-black w-full" />
                </div>
                <button onClick={(e) => setConfAlert('', okMsg, confMsg, (succTitle) => deduct(e, succTitle))} className="btn outline-solid text-white text-base font-normal outline-white btn-outline md:btn-md w-full rounded-none">Submit link</button>
            </div>
        </div>
    )
}
