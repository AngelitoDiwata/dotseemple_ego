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
import { auth } from "@/firebase";
import swal from "sweetalert";
import ProfileEdit from "@/components/ProfileEdit";

function connect({ currentUser, getUserData }) {
    const [loaded, setLoaded] = useState(false)
    const [user, loading, error] = useAuthState(auth);
    const [profileVisible, setProfileVisible] = useState(false)
    const router = useRouter()
    if (router.isFallback) {
        return <div>Loading...</div>
    }
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

    const setLoad = () => {
        setLoaded(true)
    }

    const changeVisibility = (value) => {
        setProfileVisible(value)
    }
    return (profileVisible ? <ProfileEdit setVisibility={() => changeVisibility(false)} onSubmit={getUserData} visible={profileVisible} details={{ uuid: currentUser.uuid, email: currentUser.email, handle: currentUser.handle, email: currentUser.email, bio: currentUser.bio, wallet: currentUser.wallet, role: currentUser.role }} /> :
        <div className="bg-black w-full h-fit flex flex-col items-center justify-between">
            <div className="w-full lg:w-1/2 m-auto h-fit flex flex-col items-center justify-center space-y-5">
                <QuoteBlock />
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