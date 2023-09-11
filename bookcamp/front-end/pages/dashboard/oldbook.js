import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Oldbookback from '@/components/oldbook/oldbookback'

export default function Oldbooks() {
  //二手書的資料
  const [oldbook, setOldbook] = useState([])
  //會員資料
  const [client, setClient] = useState([])
  //使用多久
  const [usageduration, setUsageduration] = useState([])
  //分類
  const [bookgenre, setBookgenre] = useState([])
  //上下架
  const [bookstatus, setBookstatuw] = useState([])
  //書分類
  const [booktype, setBooktype] = useState([])

  useEffect(() => {
    const fechAlloldbook = async () => {
      try {
        const res = await axios.get('http://localhost:3002/oldbook')
        //如果後端是物件就要寫.data.oldbook 如果是陣列直接.data
        setOldbook(res.data.oldbook)
        setClient(res.data.client)
        setUsageduration(res.data.usageduration)
        setBookgenre(res.data.bookgenre)
        setBookstatuw(res.data.bookstatus)
        setBooktype(res.data.booktype)
      } catch (err) {
        console.log(err)
      }
    }
    fechAlloldbook()
  }, [])
  //後端也要寫
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/oldbook + ${id}`)
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <h1>書營舊書後台管理</h1>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>書id</th>
            <th>賣家會員名字</th>
            <th>圖片</th>
            <th>書名</th>
            <th>價錢</th>
            <th>數量</th>
            <th>使用多久</th>
            <th>分類</th>
            <th>上下架狀態</th>
            <th>書類型</th>
            <th>上架日期</th>
            <th>最後日期</th>
            <th>操作</th>
          </tr>
        </thead>

        <tbody>
          <Oldbookback
            oldbook={oldbook}
            client={client}
            usageduration={usageduration}
            bookgenre={bookgenre}
            booktype={booktype}
            bookstatus={bookstatus}
            handleDelete={handleDelete}
          />
        </tbody>
      </table>
    </>
  )
}
