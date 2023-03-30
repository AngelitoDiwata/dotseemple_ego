import ControlArea from "@/components/ControlArea";
import Footer from "@/components/Footer/Footer";
import LeaderBoard from "@/components/Leaderboard";
import ProfileArea from "@/components/ProfileArea";
import QuoteBlock from "@/components/QuoteBlock";
import useUserAuth from "@/hooks/useUserAuth";
import { useEffect, useState } from "react";
import { closeAlert, setAlert } from "@/mixins";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase";
import ProfileEdit from "@/components/ProfileEdit";
import LinkSubmission from "@/components/LinkSubmission";
import { onValue, ref } from "firebase/database";

function connect({ currentUser, getUserData }) {
    const [loaded, setLoaded] = useState(false)
    const [user, loading, error] = useAuthState(auth);
    const [profileVisible, setProfileVisible] = useState(false)
    const router = useRouter()
    if (router.isFallback) {
        return <div>Loading...</div>
    }

    useEffect(() => {
        onValue(ref(db, `data/${currentUser.uuid}`), (snapshot) => {
            if (snapshot.val()) {
                const res = Object.values(snapshot.val())[0]
                getUserData(res.email)
            }
        })
    }, [])

    useEffect(() => {
        setAlert('ᴘᴀᴛɪᴇɴᴄᴇ ɪꜱ ᴡʜᴀᴛ ᴅɪꜰꜰᴇʀꜱ ᴜꜱ', `loading your profile...`)
    }, [])

    useEffect(() => {
        if (!loading && loaded) {
            closeAlert()
            if (!user) {
                router.push('/')
            }
            closeAlert()
        }
    }, [user, loading, loaded]);

    useEffect(() => {
        console.log('triggered')
    }, [currentUser])

    const setLoad = () => {
        setLoaded(true)
    }

    const changeVisibility = (value) => {
        setProfileVisible(value)
    }

    const getSubEligibility = () => {
        try {
            const d1 = new Date(currentUser.linkEntry.date)
            const d2 = new Date()
            const diffTime = (d2 - d1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays >= 2
        } catch (_) {
            return true
        }
    }

    return (profileVisible ? <ProfileEdit setVisibility={() => changeVisibility(false)} onSubmit={getUserData} visible={profileVisible} details={{ uuid: currentUser.uuid, email: currentUser.email, handle: currentUser.handle, email: currentUser.email, bio: currentUser.bio, wallet: currentUser.wallet, role: currentUser.role }} /> :
        <div className="bg-black w-full h-fit flex flex-col items-center justify-between">
            <div className="w-full lg:w-1/2 m-auto h-fit flex flex-col items-center justify-center space-y-5">
                <QuoteBlock />
                <LinkSubmission user={currentUser} eligible={getSubEligibility()} onSubmit={() => getUserData(currentUser.email)} />
                <ControlArea onSubmit={getUserData} userData={currentUser} />
                <ProfileArea isLoaded={() => setLoad()} id={currentUser.uuid} handle={currentUser.handle} />
                <LeaderBoard isLoaded={() => setLoad()} />
                {/* <FeaturedTweet /> */}
            </div>
            <Footer openProfile={(value) => changeVisibility(value)} />
        </div>
    )
};

export default useUserAuth(connect)