import React, { useEffect, useState } from 'react'
import { onValue, ref, get, orderByChild, query } from 'firebase/database'
import { db, incrementUserPoint } from '@/firebase'
import swal from 'sweetalert';

export default function ControlArea({ userData }) {
    const [activeCodes, setActiveCodes] = useState(0)
    const [code, setCode] = useState('')
    const [currentCodes, setCurrentCodes] = useState([])

    useEffect(() => {
        onValue(ref(db, `codes`), (_) => {
            get(query(ref(db, '/codes'), orderByChild('code'))).then((snapshot) => {
                setActiveCodes(Object.values(snapshot.val()).filter((code) => new Date(code.ttl) > new Date()).length)
            })
        });
        onValue(ref(db, `data/${userData.uuid}`), (snapshot) => {
            const res = snapshot.val()
            if (res !== null){
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

    const validateEntry = () => {
        get(query(ref(db, '/codes'), orderByChild('code'))).then((snapshot) => {
            const codes = Object.values(snapshot.val()).filter((code) => new Date(code.ttl) > new Date())
            if (code.trim() === '') {
                setAlert('', 'Code cannot be empty!')
            } else if (!codes.filter((item) => new Date(item.ttl) > new Date()).map((item) => item.code).includes(code)) {
                setAlert('', 'Sorry. code is either invalid/expired.')
            } else if (userData.hasOwnProperty('collections') && currentCodes.includes(code)) {
                setAlert('', 'Code already claimed!')
            } else {
                incrementUserPoint({
                    collections: userData.hasOwnProperty('collections') ? [...userData.collections, code] : [code],
                    uuid: userData.uuid
                })
                setAlert('', 'Valid code. Dot has been credited. Thanks!')
                setCode('')
            }
        })
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
                <input value={code} onChange={(e) => setCode(e.target.value)} type="text" placeholder="C O D E" className="input text-base font-normal border-white focus:outline-none hover:outline-none bg-neutral-900 w-full max-w-xs" />
            </div>
            <button onClick={validateEntry} className="btn outline-solid text-white text-base font-normal outline-white btn-outline md:btn-md w-fit rounded-none">Submit</button>
        </div>
    )
}