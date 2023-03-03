/**
 * TODO: Registration and Connection flow
 */
import { db } from '@/firebase'
import {set, ref, onValue, remove, update } from "firebase/database";
import schedule from 'node-schedule'
import crypto from 'crypto'
let scheduledJobs = [

]
export default async function handler(req, res) {
    const { method, body } = req
    if (method === "GET") {
        res.send(scheduledJobs.map((job) => {
            return { uuid: job.uuid }
        }))
    }
    if (method === "POST") {
        if (scheduledJobs.map((job) => job.code).includes(body.code)) {
            res.send(`Code already running...`)
        } else {
            const job = schedule.scheduleJob(new Date(body.endTime),
                () => {
                    const job = scheduledJobs.filter((job) => job.code === body.code)[0]
                    remove(ref(db, `/codes/${job.uuid}`));
                    scheduledJobs.filter((job) => job.code === body.code)[0].job.cancel()
                    scheduledJobs = scheduledJobs.filter((job) => job.code !== body.code)
                });
            const uuid = crypto.randomUUID()
            set(ref(db, `/codes/${uuid}`), {
                name: body.name,
                code: body.code,
                ttl: body.endTime
            });
            scheduledJobs.push({ uuid, endTime: body.endTime, name: body.name, code: body.code, job })
            res.send(`Code ${body.code} running...`)
        }
    }
}