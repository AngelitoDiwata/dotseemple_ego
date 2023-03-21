import React, { useEffect, useState } from 'react'

export default function PassBlock({label, placeholder, onChange, errorMsg}) {
  const [password, setPassword] = useState('')
  const [visibility, setVisibility] = useState(false)
  useEffect(() => {
    onChange(password)
  }, [password])
  return (
    <div className="form-control w-full border rounded-lg">
      <label className="input-group">
        <span className='text-xs w-fit bg-black text-white'>{label}</span>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type={visibility ?'text':'password'} placeholder={placeholder} className="hover:outline-none focus:outline-none input bg-black text-white input-bordered w-full" />
        <span onClick={() => setVisibility(!visibility)} className='text-xs w-fit bg-black text-white'>{visibility ?'hide' :'view'}</span>
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
