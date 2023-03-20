import React, { useEffect, useState } from 'react'
import { onValue, ref, get, orderByChild, query } from 'firebase/database'
import { db, incrementUserPoint } from '@/firebase'
import swal from 'sweetalert';

export default function ControlArea({ userData, onSubmit }) {
    const [activeCodes, setActiveCodes] = useState(0)
    const [code, setCode] = useState('')
    const [currentCodes, setCurrentCodes] = useState([])
    const [btnActive, setBtnActive] = useState(true)

    useEffect(() => {
        onValue(ref(db, `codes`), (_) => {
            get(query(ref(db, '/codes'), orderByChild('code'))).then((snapshot) => {
                setActiveCodes(Object.values(snapshot.val()).filter((code) => new Date(code.ttl) > new Date()).length)
            })
        });
        onValue(ref(db, `data/${userData.uuid}`), (snapshot) => {
            const res = snapshot.val()
            if (res !== null) {
                setCurrentCodes(res.collections)
            }
        });
    }, [])

    const setAlert = (title, message) => {
        swal({
            title: title,
            text: message,
            timer: 2500,
            showCancelButton: false,
            button: false
        }).then(
            function () { },
            function (dismiss) {
                if (dismiss === 'timer') {
                }
            });
    }

    const validateEntry = (e) => {
        e.preventDefault()
        setBtnActive(false)
        const userCode = code.trim()
        get(query(ref(db, '/codes'), orderByChild('code'))).then((snapshot) => {
            const codes = Object.values(snapshot.val()).filter((code) => new Date(code.ttl) > new Date())
            if (userCode === '') {
                setAlert('', 'Code cannot be empty!')
            } else if (!codes.filter((item) => new Date(item.ttl) > new Date()).map((item) => item.code.trim()).includes(userCode)) {
                setAlert('', 'Sorry. code is either invalid/expired.')
            } else if (userData.hasOwnProperty('collections') && currentCodes.includes(userCode)) {
                setAlert('', 'Code already claimed!')
            } else {
                incrementUserPoint({
                    collections: userData.hasOwnProperty('collections') ? [...userData.collections, userCode] : [userCode],
                    uuid: userData.uuid
                })
                onSubmit()
                setAlert('', 'Valid code. Dot has been credited. Thanks!')
                setCode('')
            }
        })
        setBtnActive(true)
    }

    return (
        <div className='text-white flex flex-row items-end justify-center space-x-2 w-full md:w-3/4 m-auto'>
            <div className='flex flex-col items-center justify-center space-y-1 w-fit'>
                <div className='w-full flex flex-row items-center justify-end py-3 space-x-3'>
                    <span className='text-white'>
                        {activeCodes}
                    </span>
                    <span className='text-base'>active code{activeCodes > 1 && 's'}</span>
                </div>
                <input value={code} onChange={(e) => setCode(e.target.value)} type="text" placeholder="C O D E" className="input text-base font-normal border-white focus:outline-none hover:outline-none bg-black w-full max-w-xs" />
            </div>
            <button disabled={!btnActive} onClick={(e) => validateEntry(e)} className="btn outline-solid text-white text-base font-normal outline-white btn-outline md:btn-md w-fit rounded-none">Submit</button>
        </div>
    )
}
