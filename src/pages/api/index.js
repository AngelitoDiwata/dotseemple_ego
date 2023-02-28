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
        fetch('https://api.jsonbin.io/v3/b/63fdb4f8c0e7653a057ff411', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": "$2b$10$p0drLjjSb3dDMlwsxhySZe8pqHbsqj1mhmqueJN.LGicCpV8lWxnm",
                "X-Access-Key": "$2b$10$rtWOLtauSNnvhXlDKiHVdO9Ntnli73AZ2Fy9UAsOgFVtpO8QrfB7y"
            }
        }).then((res) => {
            return res.json()
        }).then((data) => {
            if (data.record.filter((record) => record.code === body.append.code).length < 1) {
                res.status(401).json({ error: "Invalid Code!" })
            } else {
                fetch('https://api.jsonbin.io/v3/b/63f9c182c0e7653a057e384e', {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                        "X-Master-Key": "$2b$10$p0drLjjSb3dDMlwsxhySZe8pqHbsqj1mhmqueJN.LGicCpV8lWxnm",
                        "X-Access-Key": "$2b$10$rtWOLtauSNnvhXlDKiHVdO9Ntnli73AZ2Fy9UAsOgFVtpO8QrfB7y"
                    },
                    body: JSON.stringify(body.data)
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
        })

    }
}