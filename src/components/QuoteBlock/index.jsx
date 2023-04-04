import { db } from '@/firebase';
import { onValue, ref } from '@firebase/database';
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
export default function QuoteBlock() {
  const [quote, setQuote] = useState('')
  useEffect(() => {
      onValue(ref(db, 'QOTD'), (snapshot) => {
          const res = snapshot.val()
          setQuote(res)
      });
  }, [])
  return (
    <div className='w-full md:w-1/2 lg:w-2/3 flex flex-row items-center justify-center py-10 px-10'>
        <span className='italic tracking-widest text-center text-white flex flex-row'>
            <span className='text-white text-center font-normal'>"</span><ReactMarkdown>{quote}</ReactMarkdown><span className='text-white'>"</span>
        </span>
    </div>
  )
}
