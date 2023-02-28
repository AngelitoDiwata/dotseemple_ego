import { useEffect, useState } from "react"
import SubmitForm from "@/components/SubmitForm"
import swal from 'sweetalert';
export default function Home() {

  const [currentList, setCurrentList] = useState([])

  const FileRead = async () => {
    const res = await fetch('/api')
    const resJson = await res.json()
    return resJson.data
  }

  const setAlert = (title, message) => {
    swal({
      title: title,
      text: message,
      timer: 2500,
      showCancelButton: false,
      showConfirmButton: false
    }).then(
      function () {},
      function (dismiss) {
        if (dismiss === 'timer') {
        }
      });
  }

  useEffect(() => {
    FileRead().then((data) => {
      setCurrentList(data)
    })
  }, [])

  return (
    <div className="App w-full h-screen bg-black">
      <SubmitForm setAlert={(title, message) => setAlert(title, message)} currentList={currentList} setList={(value) => setCurrentList(value)} />
      <div className='bg-black w-full px-2 md:px-20 my-10 mx-auto grid grid-cols-2 md:grid-cols-4 gap-1 h-fit'>
        {
          currentList.map((index, ind) => {
            return <div key={ind} className='w-full px-10 py-5 m-auto flex flex-col h-fit space-x-5 items-center justify-center text-white my-5 bg-black rounded-lg'>
              <div className="w-full flex flex-row items-center justify-around space-x-2">
              <a className='no-underline decoration-auto text-white text-xs font-semibold'
          href={`https://twitter.com/${index.handle.replaceAll('@', '')}`}>{index.handle}</a>
                <span className='text-xl md:text-5xl font-black flex flex-row items-start justify-start tracking-tighter'>⦿<sup className='text-xs tracking-normal font-light'>{index.connections}</sup></span>
              </div>
              <span style={{
                'overflowWrap': 'break-word',
                'wordWrap': 'break-word',
                'hyphens': 'auto'
              }} className='text-3xl break-all w-full leading-3 text-left mb-5 font-black tracking-widest'>{
                  (<div>
                    {[...Array(index.connections).keys()].map(() => {
                      return '.'
                    }).join('')}
                  </div>)
                }</span>
            </div>
          })
        }

      </div>
      <footer className="absolute bg-black bottom-0 w-full flex flex-row items-center justify-center py-5">
        <a className='no-underline decoration-auto text-white text-xs sticky bottom-0'
          href="https://twitter.com/dotseemple">
          @dotseemple
        </a>
      </footer >
    </div >

  )
}
