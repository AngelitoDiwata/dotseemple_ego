import { deductPoints, getDrops, onParticipate } from '@/firebase'
import { setAlert } from '@/mixins'
import React, { useEffect, useState } from 'react'

export default function DropArea({ inSufficient, Claimed, visible, currentUser, participate, setVisible }) {

  const [modalVisible, setModalVisible] = useState(false)
  const [drops, setDrops] = useState([{}])
  const [dropKey, setDropKey] = useState('')
  useEffect(() => {
    getDrops().then((data) => {
      const res = data.val()
      if (res) {
        setDrops([Object.values(res).sort((a, b) => new Date(a.ttl) - new Date(b.ttl)).at(-1)])
        setDropKey(Object.keys(res).sort((a, b) => new Date(a) - new Date(b)).at(-1))
      }
    })
  }, [])

  const openModal = (mode) => {
    if (inSufficient === true) {
      setAlert('', 'You do not have enough points to join the whitelist')
    } else if (Claimed === true) {
      setAlert('', 'Your wallet address has already been collected.')
    } else {
      setModalVisible(() => mode)
    }
  }

  return (visible &&
    <div className='w-3/4 md:w-1/2 lg:w-2/3 flex min-h-max flex-col space-y-2 items-center justify-center py-5 px-10'>
      <ParticipateModal participate={participate} setModalVisible={setModalVisible} dropKey={dropKey} user={currentUser} openModal={openModal} visibility={modalVisible} />
      <span>{drops.at(-1).title} in</span>
      <Countdown setModalVisible={(value) => setVisible(value)} countDownDate={drops.at(-1).ttl} />
      <button onClick={() => openModal(true)} className="btn rounded-none bg-black hover:bg-neutral-900 text-white hover:scale-110 btn-md tracking-widest w-full">JOIN WHITELIST</button>
    </div>
  )
}

function Countdown({ countDownDate, setModalVisible }) {
  const [time, setTime] = useState('')
  useEffect(() => {
    if (countDownDate) {
      var x = setInterval(function () {
        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = new Date(countDownDate) - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        setTime(`${days}:${hours}:${minutes}:${seconds}`);

        if (distance <= 0) {
          clearInterval(x)
          setModalVisible(false)
        }

      }, 1000);
    }
  }, [countDownDate])
  return <div className='flex flex-col items-center justify-center'> <span className='text-6xl transition-all'>
    {time}
  </span>
    <div className='w-full flex flex-row items-center justify-around tracking-wide'><span>days</span>, <span>hours</span>, <span>minutes</span>, <span>seconds</span></div>
  </div>
}

function ParticipateModal({ visibility, openModal, dropKey, user, setModalVisible, participate }) {

  const participateAction = () => {
    return onParticipate({
      dropID: dropKey,
      uuid: user.uuid,
      wallet: user.wallet,
      handle: user.handle,
      date: new Date()
    }).then(() => {
      deduct()
    })
  }

  const deduct = () => {
    deductPoints({
      uuid: user.uuid,
      collections: user.collections.slice(20, user.collections.length)
    }).then(() => {
      participate()
      setAlert('Wallet address collected successfully (20 pts deducted).')
      setModalVisible(false)
    })
  }
  return visibility ? <div style={{ height: '1500px' }} className='w-full z-50 h-screen bg-black absolute flex flex-col items-center justify-center px-5'>
    <span className='text-white mx-auto w-11/12 md:w-1/3 text-justify'>Clicking this button means you will be added to the FCFS whitelist to mint the collab edition. This costs <span className='font-bold'>20</span> points.</span>
    <div className='w-11/12 md:w-1/3 mx-auto flex flex-row items-center justify-center space-x-2 my-3'>
      <button onClick={participateAction} className="btn rounded-none bg-black hover:bg-neutral-900 text-white hover:scale-110 btn-md tracking-widest w-1/2 font-bold border-4">PROCEED</button>
      <button onClick={() => openModal(false)} className="btn rounded-none bg-black hover:bg-neutral-900 text-white hover:scale-110 btn-md tracking-widest w-1/2">Cancel</button>
    </div>
  </div> : null
}
