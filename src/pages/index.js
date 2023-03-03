import { React, useState, useEffect } from 'react'
import { db } from '@/firebase'
import { set, ref, onValue, update } from "firebase/database";
import swal from 'sweetalert';
import { Icon } from 'react-icons-kit'
import { fileText, twitter } from 'react-icons-kit/icomoon/'
import Cookies from 'js-cookie';

export default function Home() {
    const [list, setList] = useState([])
    const [handle, setHandle] = useState("")
    const [code, setCode] = useState("")
    const [connections, setConnections] = useState(1)
    const [validCodes, setValidCodes] = useState([])
    const [loginState, setLoginState] = useState(true)
    const [searchVal, setSearchVal] = useState('')
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

    const onLogin = (cond = true) => {
        if (cond && list.map((item) => item.handle).includes(handle)) {
            Cookies.set('handle', handle)
            setLoginState(true)
        } else {
            setAlert('', 'ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴘᴀʀᴛ ᴏꜰ ᴛʜᴇ ᴄɪʀᴄʟᴇ -- ʏᴇᴛ.')
        }
    }

    useEffect(() => {
        onValue(ref(db), (snapshot) => {
            setList([]);
            const res = snapshot.val();
            setLoginState(Object.values(res.data).map((item) => item.handle).includes(Cookies.get('handle')))
            setHandle(Cookies.get('handle'))
            res.data !== undefined ? Object.values(res.data).map((entry) => {
                setList((oldArray) => [...oldArray, entry]);
            }) : setList([])
            res.codes !== undefined ? Object.values(res.codes).map((code) => {
                if (new Date(code.ttl) > new Date()) {
                    setValidCodes((oldArray) => [...oldArray, code]);
                }
            }) : setValidCodes([])
        });
    }, []);

    const handleCheck = () => {
        const uuid = window.crypto.randomUUID()
        const itemModel = {
            handle,
            connections,
            collections: [code],
            uuid
        }
        if (editMode()) {
            const listCheck = list.filter((item) => item.handle === handle)
            let updateModel
            try {
                updateModel = {
                    handle: listCheck[0].handle,
                    connections: listCheck[0].connections + 1,
                    collections: [...listCheck[0].collections, code],
                    uuid: getTempUUID()
                }
            } catch (_) {
                updateModel = {
                    handle: listCheck[0].handle,
                    connections: listCheck[0].connections + 1,
                    collections: [code],
                    uuid: getTempUUID()
                }
            }
            updateDatabase(updateModel)
        }
    }

    const editMode = () => {
        const listCheck = list.filter((item) => item.handle === handle)
        return listCheck.length > 0
    }

    const getTempUUID = () => {
        const listCheck = list.filter((item) => item.handle === handle)
        try {
            return listCheck[0].uuid
        } catch (_) {
            return ''
        }
    }

    const updateDatabase = (data) => {
        update(ref(db, `/data/${getTempUUID()}`), data);
        setAlert('', `Thanks for being there, ${handle}`)
        setHandle('')
        setCode('')
    }

    const writeToDatabase = (data) => {
        set(ref(db, `/data/${data.uuid}`), data);
        setAlert('', `Thanks for being there, ${handle}`)
        setHandle('')
        setCode('')
    };

    const changeHandler = (e, handler) => {
        handler(e.target.value)
    }

    const validateEntry = () => {
        try {
            if (handle.split('')[0] !== '@') {
                setAlert('Error', 'Invalid user handle!')
            }
            else if (handle.trim() === '' || code.trim() === '') {
                setAlert('Error', 'Handle or code cannot be empty!')
            } else if (!validCodes.map((item) => item.code).includes(code)) {
                setAlert('Error', 'Invalid code!')
            } else if (list.filter((item) => item.handle === handle)[0].collections.includes(code)) {
                setAlert('Error', 'Code already claimed!')
            } else {
                handleCheck()
            }
        } catch (_) {
            handleCheck()
        }
    }

    return (
        <div className='App w-full h-screen bg-black'>
            {
                !loginState && <div className='absolute w-full h-screen m-auto bg-black z-50 flex flex-row items-center justify-center space-x-5'>
                    <input placeholder="Who are you?" className="w-1/2 md:w-80 transition-all border border-white bg-black rounded-lg hover:outline-white p-2" value={handle} onChange={(e) => changeHandler(e, setHandle)} />
                    <button onClick={onLogin} className='text-5xl mb-2 hover:scale-110 transition-all'>
                        ⦿
                    </button>
                </div>
            }
            {
                loginState && <div className="sticky z-30 bg-black top-0 w-full m-auto flex flex-col md:flex-row items-start md:items-end justify-between py-5 space-y-3 md:space-x-3 space-x-0 md:space-y-0 px-10">
                    <input placeholder="Search for a handle" className="w-full md:w-1/6 self-start border border-white bg-black rounded-lg outline-white px-3 py-1" value={searchVal} onChange={(e) => changeHandler(e, setSearchVal)} />
                    <div className='w-full md:w-1/4 flex flex-row items-center justify-center space-x-3'>
                        <input placeholder="CODE" className="w-full md:w-2/3 border border-white bg-black rounded-lg outline-white px-3 py-1" value={code} onChange={(e) => changeHandler(e, setCode)} />
                        <button className="w-full md:w-20 hover:scale-110 transition-all font-semibold border hover:font-neutral-900 hover:border-2 border-white bg-black rounded-lg outline-white px-3 py-1 text-white" onClick={validateEntry}>submit</button>

                    </div>
                </div>
            }
            {
                loginState && <div className='bg-black w-full px-2 md:px-20 my-10 mx-auto grid grid-cols-2 md:grid-cols-4 gap-1 h-fit'>
                    {
                        list.filter((item) => item.handle.includes(searchVal)).map((data, ind) => {
                            return <div key={ind} className='w-full px-10 py-5 m-auto flex flex-col h-fit space-x-5 items-center justify-center text-white my-5 bg-black rounded-lg'>
                                <div className="w-full flex flex-row items-center justify-around space-x-2">
                                    <a className='no-underline decoration-auto text-white text-xs font-semibold'
                                        href={`https://twitter.com/${data.handle.replaceAll('@', '')}`}>{data.handle}</a>
                                    <span className='text-xl md:text-5xl font-black flex flex-row items-start justify-start tracking-tighter'>⦿<sup className='text-xs tracking-normal font-light'>{data.connections}</sup></span>
                                </div>
                                <span style={{
                                    'overflowWrap': 'break-word',
                                    'wordWrap': 'break-word',
                                    'hyphens': 'auto'
                                }} className='text-3xl break-all w-full leading-3 text-left mb-5 font-black tracking-widest'>{
                                        (<div>
                                            {[...Array(data.connections).keys()].map(() => {
                                                return '.'
                                            }).join('')}
                                        </div>)
                                    }</span>
                            </div>
                        })
                    }
                </div>
            }

            <footer className="absolute bg-black bottom-0 w-full flex flex-row items-center justify-center space-x-10 py-5">
                <a className='no-underline decoration-auto text-white text-2xl sticky bottom-0'
                    href="/">
                    ⦿
                </a>
                <a className='no-underline decoration-auto text-white text-xs sticky bottom-0'
                    href="/null">
                    <Icon icon={fileText} />
                </a>
                <a className='no-underline decoration-auto text-white text-xs sticky bottom-0'
                    href="https://twitter.com/dotseemple">
                    <Icon icon={twitter} />
                </a>
                <a className='no-underline decoration-auto text-white text-2xl sticky bottom-0'
                    href="/feed">
                    ⦾
                </a>
            </footer >
        </div>
    )
}
