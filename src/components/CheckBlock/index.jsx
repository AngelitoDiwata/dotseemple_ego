import React, { useEffect, useState } from 'react'

export default function CheckBlock({label, onChange, errorMsg}) {
    const [state, setState] = useState(false)
    useEffect(() => {
        onChange(state)
    }, [state])
    return (
        <div className="form-control w-full">
            <label className="label cursor-pointer flex items-center justify-between space-x-3 w-full">
                <span className="label-text text-justify w-3/4 text-white">{label}</span>
                <input checked={state} onChange={(e) => setState(e.target.checked)} type="checkbox" className="checkbox border-2 border-white bg-black text-white" />
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
