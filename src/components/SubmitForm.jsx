import React, { useEffect, useState } from 'react'
import validator from 'validator'
export default function SubmitForm({ currentList, setList }) {

    const [handle, setHandle] = useState('')
    const [link, setLink] = useState('')
    const [code, setCode] = useState('')
    const [isLinkValid, setIsLinkValid] = useState(true)

    const FileRead = async () => {
        const res = await fetch('/api')
        const resJson = await res.json()
        return resJson.data
    }

    const FileWrite = async () => {
        await fetch('/api', {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(FindCode())
        })
        return await FileRead()
    }

    const FindCode = () => {
        const listData = currentList
        listData.forEach((record, index) => {
            if (record.code === code) {
                const joinerData = {
                    handle: handle,
                    link: link
                }
                if (listData[index].connections.filter((connection) => {
                    return connection.handle === handle
                }).length > 0) {
                    alert('⦿ Already in the list! ⦿')
                } else {

                    listData[index].connections.push(joinerData)
                    alert(`Thank you for joining, ${handle}`)
                }
            }
        })
        return listData
    }

    const checkFormEmpty = () => {
        return handle.trim() !== '' && link.trim() !== '' && code.trim() !== ''
    }

    const validCodes = () => {
        const listData = currentList
        return listData.map((record) => {
            return record.code
        })
    }

    const SubmitForm = () => {
        if (!validCodes().includes(code)) {
            alert('⦿ INVALID CODE! ⦿')
        } else {
            if (isLinkValid && checkFormEmpty() && validator.isURL(link)) {
                FileWrite().then((data) => {
                    setList(data)
                }).catch(() => {
                    alert(`Error. please try again.`)
                })
            } else {
                alert('⦿ please enter a valid details ⦿')
            }
        }
    }


    return (
        <div className="sticky top-0 w-1/2 m-auto flex flex-row items-center justify-center py-5 space-x-3">
            <input onChange={(e) => setHandle(e.target.value)} placeholder="twitter handle" className="w-1/4 border border-white bg-black rounded-lg outline-white px-3 py-1" />
            <input onChange={(e) => { setLink(e.target.value) }} placeholder="retweet link" className="w-1/4 border border-white bg-black rounded-lg outline-white px-3 py-1" />
            <input onChange={(e) => setCode(e.target.value)} placeholder="CODE" className="w-1/4 border border-white bg-black rounded-lg outline-white px-3 py-1" />
            <button onClick={SubmitForm} className="w-1/4 hover:scale-110 transition-all font-semibold border hover:font-black hover:border-2 border-white bg-black rounded-lg outline-white px-3 py-1">Submit</button>
        </div>
    )
}
