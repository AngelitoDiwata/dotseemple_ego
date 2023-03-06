import CodeCard from '@/components/CodeCard'
import { React, useState, useEffect } from 'react'
import { db } from '@/firebase'
import { set, ref, onValue, remove } from "firebase/database";
import swal from 'sweetalert';

export default function DotSeempleCodes() {
    const [validCodes, setValidCodes] = useState([])
    const [desc, setDesc] = useState('')
    const [code, setCode] = useState('')
    const [endDate, setEndDate] = useState('')
    const changeHandler = (e, handler) => {
        handler(e.target.value)
    }
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
    useEffect(() => {
        onValue(ref(db), (snapshot) => {
            setValidCodes([]);
            const res = snapshot.val();
            if (res) {
                res.codes !== undefined ? Object.values(res.codes).forEach((code) => {
                    if (new Date(code.ttl) > new Date()) {
                        setValidCodes((oldArray) => [...oldArray, code]);
                    }
                }) : setValidCodes([])
            }
        });
    }, []);

    const submit = () => {
        if (new Date(endDate) < new Date() || endDate === '') {
            setAlert('', `Please select a present time.`)
        } else if (code.trim().length === 0 || desc.trim().length === 0) {
            setAlert('', `Please provide valid code values.`)
        }
        else if (validCodes.filter((item) => new Date(item.ttl) > new Date()).map((item) => item.code).includes(code)) {
            setAlert('', `Code already running...`)
        } else {
            const uuid = crypto.randomUUID()
            set(ref(db, `/codes/${uuid}`), {
                name: desc,
                code: code,
                ttl: endDate
            });
            setAlert('', `Code ${code} running...`)
            setCode('')
            setDesc('')
            setEndDate('')
        }
        
    }

    return (
        <div className='App w-full h-fit bg-black'>
            <div className="sticky z-50 bg-black top-0 w-full m-auto flex flex-col md:flex-row items-start md:items-center justify-end py-5 space-y-3 md:space-x-3 space-x-0 md:space-y-0 px-10">
                <input placeholder="Code description" className="w-1/2 md:w-40 border border-white bg-black rounded-lg outline-white px-3 py-1" value={desc} onChange={(e) => changeHandler(e, setDesc)} />
                <input placeholder="Actual Code" className="w-full md:w-1/4 border border-white bg-black rounded-lg outline-white px-3 py-1" value={code} onChange={(e) => changeHandler(e, setCode)} />
                <input type="datetime-local" className="w-full md:w-1/4 border border-white bg-black rounded-lg outline-white px-3 py-1" onChange={(e) => changeHandler(e, setEndDate)} defaultValue={endDate} />
                <button className="w-full md:w-20 hover:scale-110 transition-all font-semibold border hover:font-neutral-900 hover:border-2 border-white bg-black rounded-lg outline-white px-3 py-1 text-white" onClick={submit}>submit</button>
            </div>
            <div className='w-full h-screen bg-black flex flex-col items-center justify-center space-y-5'>
                {
                    validCodes.length > 0 ? validCodes.map((code) =>  <CodeCard key={code.code} name={code.name} code={code.code} date={code.ttl} />) : <span>Wow, O_o such empty.</span>
                }
            </div>
        </div>
    )
}
