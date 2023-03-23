import { auth, getUserByEmail } from '@/firebase'
import { setAlert } from '@/mixins';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";

export default function useUserAuth(Component) {
  return function UseUserAuth(props) {
    const router = useRouter()

    //Add this
    if (!router.isFallback) {
      return <span>Error 404</span>;
    }
    if (router.isFallback) {
      return <div>Loading...</div>
    }
    const [currentUser, setCurrentUser] = useState({})

    const [user, loading, error] = useAuthState(auth);

    const getUserData = (email) => {
      getUserByEmail(email).then((snapshot) => {
        const res = snapshot.val()
        if (res) {
          setCurrentUser(Object.values(res)[0])
        }
      })
    }

    useEffect(() => {
      if (loading) {
      }
      if (user) {
        router.replace('/connect')
        setAlert('ᴘᴀᴛɪᴇɴᴄᴇ ɪꜱ ᴡʜᴀᴛ ᴅɪꜰꜰᴇʀꜱ ᴜꜱ', `loading your profile...`)
        getUserData(user.email)
      };
    }, [user, loading]);

    return <Component getUserData={getUserData} currentUser={currentUser} {...props} />
  }
}
