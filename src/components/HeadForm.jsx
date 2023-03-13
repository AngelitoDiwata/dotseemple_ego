import React, { useState } from 'react'

export default function HeadForm({ onSearch, validCodes, onValidate }) {
    const [searchVal, setSearchVal] = useState("")
    const [code, setCode] = useState("")

    
    const changeHandler = (e, handler) => {
        handler(() => e.target.value)
    }
    

    return (
        <div className="absolute z-30 bg-black top-0 w-full m-auto flex flex-col md:flex-row items-start md:items-end justify-between py-5 space-y-3 md:space-x-3 space-x-0 md:space-y-0 px-10">
            <div className='w-full md:w-fit flex flex-row items-center justify-start space-x-3'>
                <input placeholder="🔍 Search for a handle" className="w-1/2 md:w-1/3 lg:w-96 self-start border border-white bg-black rounded-lg outline-white px-3 py-2" value={searchVal} onChange={(e) => changeHandler(e, setSearchVal)} />
                <button className="w-1/2 md:w-full lg:w-20 hover:scale-110 transition-all font-semibold border hover:font-neutral-900 hover:border-2 border-white bg-black rounded-lg outline-white px-3 py-1 text-white" onClick={() => onSearch(searchVal)}>Search</button>
            </div>
            <div className='w-full md:w-2/3 lg:w-1/3 flex flex-col md:flex-row items-center justify-end space-x-0 space-y-3 md:space-x-2 md:space-y-0'>
                <span className='w-1/2 text-xs text-white'>Active Codes: <span className='text-xl font-black'>{validCodes.filter((item) => new Date(item.ttl) > new Date()).map((item) => item.code).length} </span> </span>
                <input placeholder="CODE" className="w-full md:w-2/3 border border-white bg-black rounded-lg outline-white px-3 py-2" value={code} onChange={(e) => changeHandler(e, setCode)} />
                <button className="w-full md:w-20 hover:scale-110 transition-all font-semibold border hover:font-neutral-900 hover:border-2 border-white bg-black rounded-lg outline-white px-3 py-1 text-white" onClick={onValidate}>submit</button>
            </div>
        </div>
    )
}
