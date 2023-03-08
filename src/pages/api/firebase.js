// /**
//  * TODO: Registration and Connection flow
//  */
// import { db } from '@/firebase'
// import {set, ref, onValue, remove, update } from "firebase/database";
// import crypto from 'crypto'

// export default async function handler(req, res) {
//     const { method, body } = req
//     const x = [
//         "@3xsixten",
//         "@wru_kii",
//         "@mastrix_ayo",
//         "@d3genM0nK",
//         "@debthemelon",
//         "@lifeof0T",
//         "@NFTKaperga",
//         "@EmmanuelFamou13",
//         "@ayo_ylx",
//         "@dDimeji999",
//         "@bondmansa",
//         "@Temi_torera",
//         "@mattyboyeth",
//         "@superboyeze",
//         "@TheOnlyNessie",
//         "@CryptoCamNFT",
//         "@BrainboxOfweb3",
//         "@_thagirlsteph",
//         "@mysweetsugarr",
//         "@ProjectBaby_9",
//         "@ewerald2",
//         "@degen_ola",
//         "@CalixMiseriae",
//         "@Fortified007",
//         "@biscuitparty",
//         "@JoCo_426",
//         "@Kodark_H",
//         "@gr8sunnsama",
//         "@0x_Maeko",
//         "@_itsme_E_",
//         "@0xumutcan",
//         "@severestriker",
//         "@dhabiri_codes",
//         "@_Xtarwiiz",
//         "@chime_szn",
//         "@kexxnorman",
//         "@Adatonnes",
//         "@zcwebby",
//         "@SklavounosP",
//         "@Official_Awwal",
//         "@SculptedE",
//         "@jaiye3k",
//         "@Shrmurda1",
//         "@TheRealDadJokes",
//         "@powerofthenut",
//         "@boadieth",
//         "@TheOneWhiz",
//         "@HanGoSolo_",
//         "@Haaywyy",
//         "@yjheucks",
//         "@utep_eth",
//         "@AboveSavage",
//         "@kkholimi",
//         "@lordstalkher",
//         "@omerd1_",
//         "@adedayomide03",
//         "@degensheikh",
//         "@Fishmadpro1984",
//         "@adeliyipraise1",
//         "@superfly1303",
//         "@Uba_Tweets",
//         "@luckykid_11",
//         "@theochi_x",
//         "@KingSleyy99",
//         "@eafelnolava",
//         "@No1eyewitness",
//         "@Ha_kim_",
//         "@mb_hte",
//         "@romeo_1r",
//         "@ajjeee__",
//     ]
//     if (method === "GET") {
//         onValue(ref(db), (snapshot) => {
//             const response = snapshot.val();
//             if (response !== null) {
//                 res.status(200).json(response.data)
//             }
//         });
//     }
//     // else if (method === "POST") {
//     //     x.forEach(async(item) => {
//     //         const uuid = crypto.randomUUID()
//     //         const itemBody = {
//     //             handle: item,
//     //             connections: 0,
//     //             email: "",
//     //             uuid: uuid,
//     //             wallet: ""
//     //         }
//     //         await set(ref(db, `/data/${uuid}`), itemBody)
//     //     })
//     //     res.status(200).json({ msg: 'success!' })
//     // }
// }