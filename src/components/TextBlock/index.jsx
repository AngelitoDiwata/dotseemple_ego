import React, { useState, useEffect } from 'react'

export default function TextBlock({ label, placeholder, onChange, errorMsg }) {
    const [value, setValue] = useState('')

    useEffect(() => {
        onChange(value)
    }, [value])
    return (
        <div className="form-control w-full border rounded-lg">
            <label className="input-group">
                <span className='text-xs bg-black text-white'>{label}</span>
                <input autoComplete='false' value={value} onChange={(e) => setValue(e.target.value)} type="text" placeholder={placeholder} className="input bg-black text-white input-bordered w-full" />
            </label>
            {
                errorMsg && <label className="label">
                    <span className="label-text-alt"></span>
                    <span className="label-text-alt text-rose-300 pr-3">{errorMsg}</span>
                </label>
            }
        </div>
    )
}
