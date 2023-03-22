import ControlArea from "@/components/ControlArea";
import Footer from "@/components/Footer/Footer";
import LeaderBoard from "@/components/Leaderboard";
import ProfileArea from "@/components/ProfileArea";
import QuoteBlock from "@/components/QuoteBlock";
import useUserAuth from "@/hooks/useUserAuth";
import { useEffect, useState } from "react";
import { setAlert } from "@/mixins";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import swal from "sweetalert";

function connect({ currentUser, getUserData }) {
    const [loaded, setLoaded] = useState(false)
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter()
    useEffect(() => {
        if(!user) {
            router.replace('/')
        }
       if (!loading && loaded) {
         swal.close()
        }
      }, [user, loading, loaded]);

    const setLoad = () => {
        setLoaded(true)
    }
    return (
        <div className="bg-black w-full h-fit flex flex-col items-center justify-between">
            <div className="w-full lg:w-1/2 m-auto h-fit flex flex-col items-center justify-center space-y-5">
                <QuoteBlock />
                <ControlArea onSubmit={getUserData} userData={currentUser} />
                <ProfileArea isLoaded={() => setLoad()} id={currentUser.uuid} handle={currentUser.handle} data={currentUser} />
                <LeaderBoard isLoaded={() => setLoad()} />
                {/* <FeaturedTweet /> */}
            </div>
            <Footer />
        </div>
    )
};

export default useUserAuth(connect)