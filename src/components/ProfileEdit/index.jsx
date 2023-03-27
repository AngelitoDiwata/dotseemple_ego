import React, { useEffect, useState } from 'react'
import SelectBlock from '../SelectBlock'
import TextBlock from '../TextBlock'
import { cross } from 'react-icons-kit/icomoon/'
import { Icon } from 'react-icons-kit'
import { updateProfile } from '@/firebase'
import { setAlert } from '@/mixins'
import { isAddress } from 'ethereum-address'

export default function ProfileEdit({ visible, details, setVisibility, onSubmit }) {
    const RoleList = ['DEGEN',
        'COMMUNITY BUILDER',
        'COLLAB MANAGER',
        'ARTIST',
        'FOUNDER',
        'CONTENT WRITER',
        'ADVISOR',
        'ALPHA CALLER']
    const [bio, setBio] = useState(details.bio)
    const [wallet, setWallet] = useState(details.wallet)
    const [role, setRole] = useState(details.role)

    useEffect(() => {
        setBio(details.bio)
        setWallet(details.wallet)
        setRole(details.role)
    }, [details])

    const submitUpdate = () => {
        if (!Object.values(validate()).includes(false)) {
            updateProfile({
                uuid: details.uuid,
                bio,
                wallet,
                role
            }).then(() => {
                setAlert('', 'Successfully updated your profile!')
                onSubmit(details.email)
                setVisibility(false)
            })
        } else {
            setAlert('', 'Please input valid details')
        }
    }

    const validate = () => {
        return {
            isValidBio: { value: bio.trim().length > 0, errMsg: 'Please provide valid bio.' },
            isValidWallet: { value: isAddress(wallet), errMsg: 'Please provide valid wallet address.' },
            isValidRole: { value: RoleList.includes(role), errMsg: 'Please select a valid role.' }
        }
    }

    return (visible ?
        <div className='w-full absolute h-full flex flex-col items-center justify-start space-y-5 m-auto bg-black z-40 py-20'>
            <div className="w-11/12 md:w-1/2 lg:w-1/4 flex flex-row items-center justify-end">
                <Icon onClick={() => setVisibility(false)} className="hover:text-white hover:cursor-pointer hover:scale-110 transition-all" icon={cross} />
            </div>
            <div className='w-11/12 md:w-1/2 lg:w-1/4 m-auto flex flex-col items-center justify-start space-y-5'>
                <span>Edit your profile, {details.handle}</span>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} className='bg-black text-white rounded-lg border border-white p-3 focus:outline-none resize-none w-full' placeholder='Edit your bio...'></textarea>
                <TextBlock val={wallet} label="wallet" onChange={setWallet} />
                <SelectBlock val={role} items={RoleList} placeholder="Select your web3 role." onChange={setRole} />
                <div className='w-full flex flex-row items-center justify-end'>
                    <button onClick={() => submitUpdate()} className="btn btn-outline text-white">Update profile</button>
                </div>
            </div>
        </div> : null
    )
}
