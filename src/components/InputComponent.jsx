import React, { useState } from 'react'

export default function InputComponent({ placeholder, className}) {
    const [inputValue, setInputValue] = useState('')
    const changeHandler = (e, handler) => {
        handler(e.target.value)
    }

    return (
        <input placeholder={placeholder} className={className} value={inputValue} onChange={(e) => changeHandler(e, setInputValue)} />
    )
}
