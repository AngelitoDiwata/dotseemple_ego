/**
 * TODO: Registration and Connection flow
 */
import { db } from '@/firebase'
import {set, ref, onValue, remove, update } from "firebase/database";
export default async function handler(req, res) {
    const { method, body } = req
    if (method === "GET") {
        onValue(ref(db), (snapshot) => {
            const response = snapshot.val();
            if (response !== null) {
                res.status(200).json(response.data)
            }
        });
    } else if (method === "POST") {
        set(ref(db, `/codes`), body)
        res.status(200).json({ msg: 'success!' })
    }
}