import { React, useState, useEffect } from 'react'
import { set, ref, onValue, update } from "firebase/database";
import { fileText, twitter } from 'react-icons-kit/icomoon/'
import { Icon } from 'react-icons-kit'
import { db } from '@/firebase'
import swal from 'sweetalert';
import Head from 'next/head';
import HeadForm from '@/components/HeadForm';

export default function Home() {
    const [list, setList] = useState([])
    const [handle, setHandle] = useState("")
    const [code, setCode] = useState("")
    const [validCodes, setValidCodes] = useState([])
    const [loginState, setLoginState] = useState(false)
    const [searchVal, setSearchVal] = useState("")

    useEffect(() => {
        fetchDB()
    }, []);

    const fetchDB = (searchValue = '') => {
        onValue(ref(db), (snapshot) => {
            setList([]);
            setValidCodes([])
            const res = snapshot.val();
            try {
                res.data !== undefined ? Object.values(res.data).filter((entry) => {
                    return entry.handle.toLowerCase().includes(searchValue.toLowerCase())
                }).map((entry) => {
                    setList((oldArray) => [...oldArray, entry]);
                }) : setList([])
                res.codes !== undefined ? Object.values(res.codes).map((code) => {
                    setValidCodes((oldArray) => [...oldArray, code]);
                }) : setValidCodes([])
            } catch (_) {

            }
        });
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

    const onLogin = (cond = true) => {
        if (handle === undefined || handle.trim().length === 0) {
            setAlert('', 'Oh, come on...')
        } else if (cond && list.map((item) => item.handle.toLowerCase()).includes(handle.toLowerCase())) {
            setLoginState(true)
            setHandle(handle)
            setAlert('', `Welcome, ${handle}`)
        } else {
            setAlert('', 'ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴘᴀʀᴛ ᴏꜰ ᴛʜᴇ ᴄɪʀᴄʟᴇ -- ʏᴇᴛ.')
        }
    }


    const proritizedUserList = () => {
        return [
            ...list.filter((item) => item.handle.toLowerCase() === handle.toLowerCase()),
            ...list.filter((item) => item.handle.toLowerCase() !== handle.toLowerCase())
        ];
    }

    const changeHandler = (e, handler) => {
        handler(() => e.target.value)
    }

    return (
        <>
            <Head>
                <title>ᴅ ᴏ ᴛ ꜱ ᴇ ᴇ ᴍ ᴘ ʟ ᴇ</title>
            </Head>
            <div className='App w-full h-screen bg-black'>
                {
                    !loginState && <div className='absolute w-full h-screen m-auto bg-black z-50 flex flex-row items-center justify-center space-x-5'>
                        <input placeholder="Who are you?" className="text-white tracking-wider text-lg w-1/2 outline-none md:w-80 transition-all border border-white bg-black rounded-lg hover:outline-white px-3 py-2" value={handle} onChange={(e) => changeHandler(e, setHandle)} />
                        <button onClick={onLogin} className='text-5xl text-white outline-none hover:scale-110 transition-all'>
                            ⦿
                        </button>
                    </div>
                }
                {
                    loginState && <HeadForm
                        onSearch={(e) => fetchDB(e)}
                        validCodes={validCodes}
                        list={list}
                        handle={handle}
                    />
                }
                {
                    loginState && <div className='bg-black w-full px-2 md:px-20 mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5 h-fit pb-32 pt-44 md:pt-16'>
                        {
                            proritizedUserList().map((data, ind) => {
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
                                                {[...Array(data.connections).keys()].map(() => {
                                                    return '.'
                                                }).join('')}
                                            </div>)
                                        }</span>
                                </a>
                            })
                        }
                    </div>
                }
                {
                    loginState && <footer className="absolute bg-black bottom-0 w-full flex flex-row items-center justify-center space-x-10 py-5">
                        <a className='no-underline decoration-auto text-white text-2xl sticky bottom-0'
                            href="/connect">
                            ⦿
                        </a>
                        <a className='no-underline decoration-auto text-white text-2xl sticky bottom-0'
                            href="/feed">
                            ⦾
                        </a>
                        <a className='no-underline decoration-auto text-white text-xs sticky bottom-0'
                            href="/notFound">
                            <Icon icon={fileText} />
                        </a>
                        <a className='no-underline decoration-auto text-white text-xs sticky bottom-0'
                            href="https://twitter.com/dotseemple" target="_blank">
                            <Icon icon={twitter} />
                        </a>
                    </footer >
                }
            </div>
        </>

    )
}
