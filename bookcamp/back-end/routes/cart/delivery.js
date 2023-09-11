import express from "express"; //使用Express框架
import { parseString } from 'xml2js';
import querystring from 'querystring'
const router = express.Router();

// 抓Road
router.post("/", async (req, res) => {
    const cityAndTown = req.body.mychoose
    console.log('1',cityAndTown);
    const cityAndTownString = querystring.stringify(cityAndTown);
    try {
        const response = await fetch('http://emap.pcsc.com.tw/EMapSDK.aspx', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: cityAndTownString,
        })

        // 寫上這段才能得到實際文本內容
        const xmlText = await response.text();
        // 解析XML檔案
        parseString(xmlText, (err, result) => {
            if (err) {
                console.error('Error parsing XML:', err);
                res.status(500).json({ error: 'An error occurred while parsing XML' });
                return;
            }
            const road = result.iMapSDKOutput.RoadName.map((v) => {
                return ({
                    road: v.rd_name_1[0] + v.section_1[0]
                })
            })

            console.log('為什麼沒有你',road);
            res.json(road)
        })
    } catch (error) {
        console.log(error);
    }
})

// 選擇road後出現正確的地址
router.post("/address", async (req, res) => {
    const list = req.body
    const addressString = querystring.stringify(list);
    try {
        const response = await fetch('http://emap.pcsc.com.tw/EMapSDK.aspx', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: addressString,
        })
        // 寫上這段才能得到實際文本內容
        const xmlText = await response.text();

        // 解析XML檔案
        parseString(xmlText, (err, result) => {
            if (err) {
                console.error('Error parsing XML:', err);
                res.status(500).json({ error: 'An error occurred while parsing XML' });
                return;
            }
            if (result) {
                const address = result.iMapSDKOutput.GeoPosition.map((v) => {
                    return ({
                        id: v.POIID[0],
                        storeName: v.POIName[0],
                        phone: v.Telno[0],
                        address: v.Address[0],
                        mapX: v.X[0],
                        mapY: v.Y[0],
                    })
                })

                res.json(address)
            }
        })
    } catch (error) {
        console.log(error);
    }
})

export default router;