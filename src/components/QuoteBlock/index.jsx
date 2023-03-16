import { db } from '@/firebase';
import { onValue, ref } from '@firebase/database';
import React, { useEffect, useState } from 'react'
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
        <span className='italic font-thin tracking-widest text-xl'>
            <span className='text-3xl font-extralight'>"</span>{quote}<span className='text-3xl font-extralight'>"</span>
        </span>
    </div>
  )
}
