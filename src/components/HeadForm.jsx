import React, { useState, useEffect } from 'react'
import { set, ref, onValue, update } from "firebase/database";
import { db } from '@/firebase'
import swal from 'sweetalert';

export default function HeadForm({ onSearch, list, handle }) {
    const [searchVal, setSearchVal] = useState("")
    const [code, setCode] = useState("")

    useEffect(() => {
        validCodes()
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

    const validCodes = () => {
        let codes = []
            onValue(ref(db), (snapshot) => {
                const res = snapshot.val();
                try {
                    res.codes !== undefined ? Object.values(res.codes).map((code) => {
                        codes.push(code)
                    }) : codes = []
                } catch (_) {
                    codes = []
                }
            });
            return codes
    }

    const validateEntry = () => {
        const listItem = list.filter((item) => item.handle.toLowerCase() === handle.toLowerCase())[0]
        if (code.trim() === '') {
            setAlert('', 'Code cannot be empty!')
        } else if (!validCodes().filter((item) => new Date(item.ttl) > new Date()).map((item) => item.code).includes(code)) {
            setAlert('', 'Sorry. code is either invalid/expired.')
        } else if (listItem.hasOwnProperty('collections') && listItem.collections.includes(code)) {
            setAlert('', 'Code already claimed!')
        } else {
            handleCheck()
        }
    }

    const handleCheck = () => {
        const listCheck = list.filter((item) => item.handle.toLowerCase() === handle.toLowerCase())
        const updateModel = {
            collections: listCheck[0].hasOwnProperty('collections') ? [...listCheck[0].collections, code] : [code],
            uuid: getTempUUID()
        }
        updateDatabase(updateModel)
    }


    const getTempUUID = () => {
        const listCheck = list.filter((item) => item.handle.toLowerCase() === handle.toLowerCase())
        try {
            return listCheck[0].uuid
        } catch (_) {
            return ''
        }
    }

    const updateDatabase = (data) => {
        update(ref(db, `/data/${data.uuid}`), { connections: data.collections.length, collections: data.collections });
        setAlert('', 'Valid code. Dot has been credited. Thanks')
        setCode('')
    }


    const changeHandler = (e, handler) => {
        handler(() => e.target.value)
    }


    return (
        <div className="absolute z-30 bg-black top-0 w-full m-auto flex flex-col md:flex-row items-start md:items-end justify-between py-5 space-y-3 md:space-x-3 space-x-0 md:space-y-0 px-10">
            <div className='w-full md:w-fit flex flex-row items-center justify-start space-x-3'>
                <input placeholder="🔍 Search for a handle" className="text-white w-1/2 md:w-1/3 lg:w-96 self-start border border-white bg-black rounded-lg outline-white px-3 py-2" value={searchVal} onChange={(e) => changeHandler(e, setSearchVal)} />
                <button className="w-1/2 md:w-full lg:w-20 hover:scale-110 transition-all font-semibold border hover:font-neutral-900 hover:border-2 border-white bg-black rounded-lg outline-white px-3 py-1 text-white" onClick={() => onSearch(searchVal)}>Search</button>
            </div>
            <div className='w-full md:w-2/3 lg:w-1/3 flex flex-col md:flex-row items-center justify-end space-x-0 space-y-3 md:space-x-2 md:space-y-0'>
                <span className='w-1/2 text-xs text-white'>Active Codes: <span className='text-xl font-black'>{validCodes().filter((item) => new Date(item.ttl) > new Date()).map((item) => item.code).length} </span> </span>
                <input placeholder="CODE" className="text-white w-full md:w-2/3 border border-white bg-black rounded-lg outline-white px-3 py-2" value={code} onChange={(e) => changeHandler(e, setCode)} />
                <button className="w-full md:w-20 hover:scale-110 transition-all font-semibold border hover:font-neutral-900 hover:border-2 border-white bg-black rounded-lg outline-white px-3 py-1 text-white" onClick={validateEntry}>submit</button>
            </div>
        </div>
    )
}
