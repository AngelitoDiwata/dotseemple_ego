import React, { useEffect, useState } from 'react'

export default function SelectBlock({ items, placeholder, onChange, errorMsg, val = ''}) {
    const [value, setValue] = useState(placeholder)

    useEffect(() => {
        onChange(value)
    }, [value])

    return (
        <div className='w-full'>
            <select value={value} onChange={(e) => setValue(e.target.value)} className="select bg-black text-white select-bordered w-full border border-white rounded-lg">
                <option disabled>{placeholder}</option>
                {
                    items.map((item, index) => <option key={index}>{item}</option>)
                }
            </select>
            {
                errorMsg && <label className="label">
                    <span className="label-text-alt"></span>
                    <span className="label-text-alt text-rose-300 pr-3">{errorMsg}</span>
                </label>
            }
        </div>

    )
}
