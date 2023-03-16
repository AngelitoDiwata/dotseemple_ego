import ControlArea from "@/components/ControlArea";
import FeaturedTweet from "@/components/FeaturedTweet";
import Footer from "@/components/Footer/Footer";
import LeaderBoard from "@/components/Leaderboard";
import ProfileArea from "@/components/ProfileArea";
import QuoteBlock from "@/components/QuoteBlock";
import { db, getUserByHandle } from "@/firebase";
import { onValue, ref } from "@firebase/database";
import { useEffect, useState } from "react";
import swal from "sweetalert";

export default function connect() {
    const [handle, setHandle] = useState("")
    const [loginState, setLoginState] = useState(false)
    const [user, setUser] = useState({})

    useEffect(() => {
        onValue(ref(db, `data/${user.uuid}`), (_) => {
            getUserData()
        });
    }, [])

    const getUserData = () => {
        getUserByHandle(handle).then((snapshot) => {
            if (snapshot.val() !== null) {
                setUser(Object.values(snapshot.val())[0])
            }
        })
    }

    const onLogin = () => {
        getUserByHandle(handle).then((snapshot) => {
            if (snapshot.val() !== null) {
                const user = Object.values(snapshot.val())
                setLoginState(user.length > 0)
                setUser(user[0])
            } else {
                setAlert('', 'ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴘᴀʀᴛ ᴏꜰ ᴛʜᴇ ᴄɪʀᴄʟᴇ -- ʏᴇᴛ.')
            }
        })
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
    return (
        <div className="bg-black w-full h-screen flex flex-col items-center justify-between">
            {
                loginState === false ? <div className='absolute w-full h-screen m-auto bg-black z-50 flex flex-row items-center justify-center space-x-5'>
                    <input placeholder="Who are you?" className="text-white tracking-wider text-lg w-2/3 outline-none md:w-80 transition-all border border-white bg-black rounded-lg hover:outline-white px-3 py-2" value={handle} onChange={(e) => setHandle(e.target.value)} />
                    <button onClick={onLogin} className='text-5xl text-white outline-none hover:scale-110 transition-all'>
                        ⦿
                    </button>
                </div> :
                    <div className="w-full lg:w-1/2 m-auto h-fit flex flex-col items-center justify-center space-y-5">
                        <QuoteBlock />
                        <ControlArea userData={user} />
                        <ProfileArea id={user.uuid} handle={handle} />
                        <LeaderBoard />
                        {/* <FeaturedTweet /> */}
                    </div>
            }
            <Footer />
        </div>
    )
};