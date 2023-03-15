import React, { useState, useEffect } from 'react'
import { db } from '@/firebase'
import { ref, onValue } from "firebase/database";
export default function ProfileForm({ uuid = '00060060-d931-4e10-9b8a-e9227f54dae9', setData, submitData }) {
    const [handle, setHandle] = useState('')
    const [email, setEmail] = useState('')
    const [bio, setBio] = useState('')
    const [wallet, setWallet] = useState('')
    const [role, setRole] = useState('Select your Web3 role:')
    const [understood, setUnderstood] = useState(false)

    useEffect(() => {
        fetchDB(uuid)
    }, [uuid])

    useEffect(() => {
        setCardData()
    }, [handle, email, bio, wallet, role])


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

    const setCardData = () => {
        setData({
            handle,
            email,
            bio,
            wallet,
            role,
        })
    }

    const submit = () => {
        /**
         * VALIDATIONS TODO
         */
        if (understood === true) {
            submitData()
        }
    }

     
    return (
        <div className='flex flex-col items-start justify-around space-y-3 px-5 md:px-0 pt-5 h-fit'>
            <span className='text-lg font-bold text-white'>Your details:</span>
            <div className="form-control w-full">
                <label className="input-group">
                    <span>Handle</span>
                    <input disabled value={handle} type="text" placeholder="@twitter_handle" className="input input-bordered w-full" />
                </label>
            </div>
            <div className="form-control w-full">
                <label className="input-group">
                    <span>Email</span>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="info@site.com" className="input input-bordered w-full" />
                </label>
            </div>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="textarea textarea-lg w-full resize-none" placeholder="Short bio"></textarea>
            <div className="form-control w-full">
                <label className="input-group">
                    <span>Wallet</span>
                    <input value={wallet} onChange={(e) => setWallet(e.target.value)} type="text" placeholder="0xb794f5ea0ba39494ce839613fffba74279579268" className="input input-bordered w-full" />
                </label>
            </div>
            <select value={role} onChange={(e) => setRole(e.target.value)} defaultValue={'Select your Web3 role:'} className="select select-bordered w-full">
                <option disabled>Select your Web3 role:</option>
                <option>Buidler</option>
                <option>Artist</option>
                <option>Influencer</option>
                <option>Flipper/Trader</option>
            </select>
            <div className="form-control w-full">
                <label className="label cursor-pointer flex items-center justify-between space-x-3 w-full">
                    <span className="label-text text-justify w-3/4">I made sure that all the details here are valid.</span>
                    <input checked={understood} onChange={(e) => setUnderstood(e.target.checked)} type="checkbox" className="checkbox border-2 border-white text-white" />
                </label>
            </div>
            <div className='w-full flex flex-row items-center justify-end'>
                <button className="btn btn-outline" onClick={submit}>Update profile</button>
            </div>
        </div>
    )
}
