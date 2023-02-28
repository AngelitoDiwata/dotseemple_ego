import React, { useState, useEffect } from 'react'
export default function SubmitForm({ currentList, setList, setAlert }) {

    const [handle, setHandle] = useState('')
    const [code, setCode] = useState('')
    const [currentCollection, setCurrentCollection] = useState([])

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
            body: JSON.stringify({
                data: await FindCode(),
                append: {
                    handle,
                    code,
                    collections: currentCollection
                }
            })
        }).then((err) => {
            setAlert(err.status !== 401 ? '' : 'Error', err.status !== 401 ? `Thank you for being there, ${handle}` : 'Invalid Code!')
        }).catch((err) => {
            setAlert('Error', err)
        })
        return await FileRead()
    }

    const FindCode = async () => {
        const listData = await FileRead()
        if (listData.filter((item) => item.handle === handle).length < 1) {
            listData.push({
                handle,
                connections: 1,
                collections: [code]
            })
        } else {
            listData.forEach((record, index) => {
                console.log(record)
                if (record.handle === handle) {
                    setCurrentCollection(listData[index].collections)
                    listData[index].connections += 1
                    listData[index].collections.push(code)
                }
            })
        }
        return listData
    }

    const checkFormEmpty = () => {
        return handle.trim() !== '' && code.trim() !== ''
    }

    const Submit = () => {
        FileWrite().then((data) => {
            setList(data)
        }).catch(() => {
            setAlert('Error!', '⦿ Please try again. ⦿')
        })
    }

    const SubmitForm = () => {
        try {
            if (!checkFormEmpty()) {
                setAlert('Error!', '⦿ Details empty. \n Please try again. ⦿')
            } else if (currentList.filter((item) => item.handle === handle)[0].collections.includes(code)) {
                setAlert('code already claimed', 'Please try again.')
            } else {
                throw null
            }
        } catch (_) {
            Submit()
        }
    }


    return (
        <div className="sticky z-50 bg-black top-0 w-4/5 md:w-full m-auto flex flex-col md:flex-row items-center justify-end py-5 space-y-3 md:space-x-3 space-x-0 md:space-y-0 px-20">
            <input onChange={(e) => setHandle(e.target.value)} placeholder="twitter handle" className="w-full md:w-40 border border-white bg-black rounded-lg outline-white px-3 py-1" />
            <input onChange={(e) => setCode(e.target.value)} placeholder="CODE" className="w-full md:w-1/4 border border-white bg-black rounded-lg outline-white px-3 py-1" />
            <button onClick={SubmitForm} className="w-full md:w-20 hover:scale-110 transition-all font-semibold border hover:font-neutral-900 hover:border-2 border-white bg-black rounded-lg outline-white px-3 py-1 text-white">Submit</button>
        </div>
    )
}
