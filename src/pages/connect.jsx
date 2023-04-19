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
import DropArea from "@/components/DropArea";
import { auth, db, getCampaigns, getDrops } from "@/firebase";
import ProfileEdit from "@/components/ProfileEdit";
import LinkSubmission from "@/components/LinkSubmission";
import { onValue, ref } from "firebase/database";
import LinkCarousel from "@/components/LinkCarousel";
import LinkSub from "@/components/LinkSub";

function connect({ currentUser, getUserData }) {
    const [loaded, setLoaded] = useState(false)
    const [user, loading, error] = useAuthState(auth);
    const [profileVisible, setProfileVisible] = useState(false)
    const [countDownVisible, setCountDownVisible] = useState(false)
    const [insufficient, setInsufficient] = useState(false)
    const [claimed, setClaimed] = useState(false)
    const [campaigns, setCampaigns] = useState([])
    const [campaignCards, setCampaignCards] = useState([])

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
        checkParticipation()
        getCurrentCampaigns()
    }, [currentUser])

    useEffect(() => {
        if (!loading && loaded) {
            closeAlert()
            if (!user) {
                router.push('/')
            }
            closeAlert()
        }
    }, [user, loading, loaded]);

    const checkParticipation = () => {
        if (currentUser.connections < 20) {
            setInsufficient(true)
        }
        getDrops().then((snap) => {
            if (snap.val() && currentUser && Object.values(snap.val()).sort((a, b) => new Date(a.ttl) - new Date(b.ttl)).at(-1).participants) {
                const entry = Object.values(Object.values(snap.val()).sort((a, b) => new Date(a.ttl) - new Date(b.ttl)).at(-1).participants).filter((entry) => {
                    return entry.handle === currentUser.handle
                })
                setCountDownVisible(true)
                setClaimed(entry.length > 0)
            } else if (snap.val() && Object.values(snap.val()).sort((a, b) => new Date(a.ttl) - new Date(b.ttl)).at(-1).participants === undefined) {
                setCountDownVisible(true)
            } else if (!snap.val()) {
                setCountDownVisible(false)
            }
        })
    }
    useEffect(() => {
        console.log('triggered')
    }, [currentUser])

    useEffect(() => {
        setCampaignCards(() => campaigns.sort((a, b) => new Date(a.end_date) - new Date(b.end_date)).map((item) => {
            return { component: () => <LinkSub currentUser={currentUser} id={item.id} title={item.title} okMsg={item.success_message} confMsg={item.confirm_message} /> }
        }))
    }, [campaigns])

    const setLoad = () => {
        setLoaded(true)
    }

    const changeVisibility = (value) => {
        setProfileVisible(value)
    }

    // const getSubEligibility = () => {
    //     try {
    //         const d1 = new Date(currentUser.linkEntry.date)
    //         const d2 = new Date()
    //         const diffTime = (d2 - d1);
    //         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    //         return diffDays >= 2
    //     } catch (_) {
    //         return true
    //     }
    // }

    const getCurrentCampaigns = () => {
        getCampaigns().then((snap) => {
            const data = snap.val()
            if (data) {
                setCampaigns(() => Object.values(data))
            }
        })
    }

    return (profileVisible ? <ProfileEdit setVisibility={() => changeVisibility(false)} onSubmit={getUserData} visible={profileVisible} details={{ uuid: currentUser.uuid, email: currentUser.email, handle: currentUser.handle, email: currentUser.email, bio: currentUser.bio, wallet: currentUser.wallet, role: currentUser.role }} /> :
        <div className="bg-black w-full h-screen overflow-scroll flex flex-col items-center justify-between">
            <div className="w-full lg:w-1/2 m-auto h-fit flex flex-col items-center justify-center space-y-5">
                <QuoteBlock />
                <DropArea setVisible={(value) => setCountDownVisible(value)} participate={() => checkParticipation()} visible={countDownVisible} Claimed={claimed} inSufficient={insufficient} currentUser={currentUser} />
                <LinkCarousel linkList={campaignCards} />
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