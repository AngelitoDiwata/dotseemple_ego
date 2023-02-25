import { useEffect, useState } from "react"
import SubmitForm from "@/components/SubmitForm"
export default function Home() {

  const [currentList, setCurrentList] = useState([])
  
  const FileRead = async () => {
    const res = await fetch('/api')
    const resJson = await res.json()
    return resJson.data
}

  useEffect(() => {
    FileRead().then((data) => {
      setCurrentList(data)
    })
  }, [])

  return (
    <div className="App w-full h-screen">
      <SubmitForm currentList={currentList} setList={(value) => setCurrentList(value)} />
      <div className='w-1/2 my-10 flex flex-col items-center justify-start m-auto h-screen'>
        {
          currentList.map((index) => {
            return <div key={index.uuid} className='w-full flex flex-row h-fit space-x-8 items-center justify-center text-white m-auto my-5'>
              <span className='text-xs w-16 font-semibold'>{index.handle}</span>
              <span className='text-5xl w-10 font-black flex flex-row items-start justify-start tracking-tighter'>⦿<sup className='text-xs tracking-normal font-light'>{index.connections.length}</sup></span>
              <span style={{
                'overflowWrap': 'break-word',
                'wordWrap': 'break-word',
                'hyphens': 'auto'
              }} className='text-3xl break-all w-2/3 leading-3 text-left mb-5 font-black tracking-widest'>{
                  (<div>
                    {index.connections.map(() => {
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
