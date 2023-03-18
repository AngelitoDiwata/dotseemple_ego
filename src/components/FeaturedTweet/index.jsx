import React from 'react'

export default function FeaturedTweet() {
  return (
    <div className='w-11/12 md:w-3/4  rounded-xl border border-gray-600 m-auto pb-20 h-96 overflow-auto'>
    { window !== 'undefined' && <a
        async
        className="twitter-timeline"
        href="https://twitter.com/dotseemple"
        target="_blank"
        rel="noreferrer"
        data-theme="dark"
        data-chrome="noborders noheaders"
    >
    </a>}
</div>
  )
}
