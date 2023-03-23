import React, { useState, useEffect } from 'react'
import { db } from '@/firebase'
import { ref, onValue } from "firebase/database";
import PassBlock from './PassBlock';
import SelectBlock from './SelectBlock';
import TextBlock from './TextBlock';
import CheckBlock from './CheckBlock';
import { Web3 } from 'web3';
export default function ProfileForm({ uuid, submitData }) {
    const [handle, setHandle] = useState('')
    const [email, setEmail] = useState('')
    const [bio, setBio] = useState('')
    const [wallet, setWallet] = useState('')
    const [role, setRole] = useState('Select your Web3 role:')
    const [password, setPassword] = useState('')
    const [confPass, setConfPass] = useState('')
    const [understood, setUnderstood] = useState(false)
    const RoleList = ['DEGEN',
        'COMMUNITY BUILDER',
        'COLLAB MANAGER',
        'ARTIST',
        'FOUNDER',
        'CONTENT WRITER',
        'ADVISOR',
        'ALPHA CALLER']

    useEffect(() => {
        fetchDB(uuid)
    }, [uuid])


    const fetchDB = (id) => {
        onValue(ref(db, `data/${id}`), (snapshot) => {
            const res = snapshot.val();
            try {
                res !== undefined ? populateFields(res) : console.log(null)
            } catch (_) {

            }
        });
    }

    const populateFields = (data) => {
        setHandle(data.handle)
        setEmail(data.email)
        setWallet(data.wallet)
    }

    const validate = () => {
        return {
            isValidEmail: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email), errMsg: 'Please provide valid email address.' },
            isValidBio: { value: bio.trim().length > 0, errMsg: 'Please provide valid bio.' },
            isValidWallet: { value: Web3.utils.isAddress(wallet), errMsg: 'Please provide valid wallet address.' },
            isValidRole: { value: RoleList.includes(role), errMsg: 'Please select a valid role.' },
            isValidPassword: { value: password.trim().length > 8 && confPass.trim().length > 8, errMsg: 'Password should match and have more than 8 characters' },
            isPasswordMatch: { value: password === confPass && password.trim().length > 8, errMsg: 'Passwords don\'t match.' },
            isUnderstood: { value: understood === true, errMsg: 'Please agree to the condition.' },
        }
    }

    const getErrorMessages = () => {
        return Object.values(validate()).map((value) => {
            return value
        })
    }

    const submit = () => {
        if (!Object.values(validate()).map((item) => item.value).includes(false)) {
            submitData({
                uuid,
                email,
                bio,
                wallet,
                role,
                password,
            })
        } else {

        }
    }


    return (handle ?
        <form className='hscreen overflow-scroll flex flex-col items-start justify-around space-y-5 px-5 md:px-0 pt-5 h-fit mb-20  bg-black text-white'>
            <span className='text-lg font-bold text-white'>Provide your details, {handle}:</span>
            <TextBlock errorMsg={!getErrorMessages()[0].value && getErrorMessages()[0].errMsg} label="Email" placeholder="Example: info@site.com" onChange={(value) => setEmail(value)} />
            <div className='w-full'>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="textarea textarea-lg w-full bg-black text-white resize-none border border-white rounded-lg" placeholder="Short bio"></textarea>
            </div>
            <TextBlock errorMsg={!getErrorMessages()[2].value && getErrorMessages()[2].errMsg} label="Wallet" placeholder={"Example: 0xb794f5ea0ba39494fe839913fffba74279579268"} onChange={(value) => setWallet(value)} />
            <SelectBlock errorMsg={!getErrorMessages()[3].value && getErrorMessages()[3].errMsg} items={RoleList} placeholder="Select your Web3 role:" onChange={(value) => setRole(value)} />
            <PassBlock errorMsg={!getErrorMessages()[4].value && getErrorMessages()[4].errMsg} label="Create Password" placeholder="Create a strong password" onChange={(value) => setPassword(value)} />
            <PassBlock errorMsg={!getErrorMessages()[5].value && getErrorMessages()[5].errMsg} label="Confirm Password" placeholder="Confirm your password" onChange={(value) => setConfPass(value)} />
            <CheckBlock errorMsg={!getErrorMessages()[6].value && getErrorMessages()[6].errMsg} label="I made sure that all the details here are valid." onChange={(value) => setUnderstood(value)} />
            <div className='w-full flex flex-row items-center justify-end'>
                <button disabled={Object.values(validate()).map((item) => item.value).includes(false)} className="btn btn-outline text-white" onClick={submit}>Update profile</button>
            </div>

        </form> : <div>Loading...</div>
    )
}
