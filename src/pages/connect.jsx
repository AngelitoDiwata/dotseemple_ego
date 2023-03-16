import { React, useState, useEffect } from 'react'
import { ref, onValue } from "firebase/database";
import { fileText, twitter } from 'react-icons-kit/icomoon/'
import { Icon } from 'react-icons-kit'
import { db } from '@/firebase'
import swal from 'sweetalert';
import Head from 'next/head';
import HeadForm from '@/components/HeadForm';
import DotGrid from '@/components/DotGrid';

export default function Home() {
    const [list, setList] = useState([])
    const [handle, setHandle] = useState("")
    const [loginState, setLoginState] = useState(false)

    useEffect(() => {
        fetchDB()
    }, []);

    const fetchDB = async (searchValue = '') => {
        await onValue(ref(db), (snapshot) => {
            setList([]);
            const res = snapshot.val();
            try {
                res.data !== undefined ? Object.values(res.data).filter((entry) => {
                    return entry.handle.toLowerCase().includes(searchValue.toLowerCase())
                }).map((entry) => {
                    setList((oldArray) => [...oldArray, entry]);
                }) : setList([])
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
        if (handle === undefined || handle.trim().length === 0 || handle === '') {
            setAlert('', 'Oh, come on...')
        } else if (cond && list.map((item) => item.handle.toLowerCase()).includes(handle.toLowerCase())) {
            setLoginState(true)
            setHandle(handle)
            setAlert('', `Welcome, ${handle}`)
        } else {
            setAlert('', 'ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴘᴀʀᴛ ᴏꜰ ᴛʜᴇ ᴄɪʀᴄʟᴇ -- ʏᴇᴛ.')
        }
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
                    !loginState && list !== [] && <div className='absolute w-full h-screen m-auto bg-black z-50 flex flex-row items-center justify-center space-x-5'>
                        <input placeholder="Who are you?" className="text-white tracking-wider text-lg w-1/2 outline-none md:w-80 transition-all border border-white bg-black rounded-lg hover:outline-white px-3 py-2" value={handle} onChange={(e) => changeHandler(e, setHandle)} />
                        <button onClick={onLogin} className='text-5xl text-white outline-none hover:scale-110 transition-all'>
                            ⦿
                        </button>
                    </div>
                }
                {
                    loginState && list !== [] && <HeadForm
                        onSearch={(e) => fetchDB(e)}
                        list={list}
                        handle={handle}
                    />
                }
                {
                    loginState && list !== [] && <DotGrid list={list} handle={handle} />
                }
                {
                    loginState && list !== [] && <footer className="absolute bg-black bottom-0 w-full flex flex-row items-center justify-center space-x-10 py-5">
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
