const FileWrite = async(body) => {
    await supabase.storage.from('dotseemfiles').update('DB.json', JSON.stringify(body))
    return await FileRead()
}

/**
 * TODO: Registration and Connection flow
 */
export default async function handler(req, res) {
    const { method, body } = req
    if (method === "GET") {
        fetch('https://api.jsonbin.io/v3/b/63f9c182c0e7653a057e384e', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": "$2b$10$p0drLjjSb3dDMlwsxhySZe8pqHbsqj1mhmqueJN.LGicCpV8lWxnm",
                "X-Access-Key": "$2b$10$rtWOLtauSNnvhXlDKiHVdO9Ntnli73AZ2Fy9UAsOgFVtpO8QrfB7y"
            }
        }).then((res) => {
            return res.json()
        }).then((data) => {
            res.status(200).json({ data: data.record })
        })
    } else if (method === "PUT") {
        fetch('https://api.jsonbin.io/v3/b/63f9c182c0e7653a057e384e', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": "$2b$10$p0drLjjSb3dDMlwsxhySZe8pqHbsqj1mhmqueJN.LGicCpV8lWxnm",
                "X-Access-Key": "$2b$10$rtWOLtauSNnvhXlDKiHVdO9Ntnli73AZ2Fy9UAsOgFVtpO8QrfB7y"
            },
            body: JSON.stringify(body)
        }).then((err) => {
            return err.json()
        }).then(() => {
            fetch('https://api.jsonbin.io/v3/b/63f9c182c0e7653a057e384e', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "X-Master-Key": "$2b$10$p0drLjjSb3dDMlwsxhySZe8pqHbsqj1mhmqueJN.LGicCpV8lWxnm",
                    "X-Access-Key": "$2b$10$rtWOLtauSNnvhXlDKiHVdO9Ntnli73AZ2Fy9UAsOgFVtpO8QrfB7y"
                }
            }).then((res) => {
                return res.json()
            }).then((data) => {
                res.status(200).json({ data: data.record })
            })
        })

    }
}