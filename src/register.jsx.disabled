import React, { useState } from 'react'
import ProfileCard from '@/components/ProfileCard'
import ProfileForm from '@/components/ProfileForm'
import Footer from '@/components/Footer/Footer'
import swal from 'sweetalert';
export default function register() {
    const [userData, setUserData] = useState({})
    const sendCardData = (data) => {
        return setUserData(data)
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

    const submitForm = () => {
        setAlert('', 'Successfully updated profile!')
    }

    return (
        <div className='h-screen w-full flex flex-col items-center justify-between space-y-5 bg-black'>
            <div className='flex flex-col md:flex-row items-center md:mt-32 justify-center space-y-3 space-x-0 md:space-y-0 md:space-x-10 px-3'>
                <ProfileCard profileDetails={userData} />
                <ProfileForm setData={sendCardData} submitData={submitForm} />
            </div>
            <Footer />
        </div>
    )
}
