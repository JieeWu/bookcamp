import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import OrderList from '@/components/order/orderList'
import OrderStatus from '@/components/order/orderStatus'
import OrderTotal from '@/components/order/orderTotal'
import OrderDate from '@/components/order/orderDate'
import OrderKeyword from '@/components/order/orderKeyword'

export default function Order() {
  // 從SQL抓出來的資料
  const [order, setOrder] = useState([])
  const [orderPage, setOrderPage] = useState([]) //有設定頁數的order

  const [coupon, setCoupon] = useState([])
  const [delivery, sedivelivery] = useState([])
  const [pay, setPay] = useState([])
  const [receipt, setReceipt] = useState([])

  const [status, setStatus] = useState([])
  const [changeOrderStatus, setChangeOrderStatus] = useState([]) //更新狀態的鉤子

  const [date, setDate] = useState('') //搜尋日期
  const [keyword, setkeyword] = useState('') //搜尋關鍵字
  const [total, setTotal] = useState('') //搜尋總價

  // Select mySQL data
  useEffect(() => {
    const dataTest = async () => {
      try {
        const res = await axios.get('http://localhost:3002/order')
        setOrder(res.data.pageOrder.newOrder)
        setOrderPage(res.data.pageOrder)
        setCoupon(res.data.bookcoupon)
        sedivelivery(res.data.bookdelivery)
        setStatus(res.data.bookorderstatus)
        setPay(res.data.bookpay)
        setReceipt(res.data.bookreceipt)
        setChangeOrderStatus(res.data.pageOrder.newOrder)
        
      } catch (error) {
        console.log(error)
      }
    }
    dataTest()
  }, [])

  const router = useRouter()
  useEffect(() => {
    const usp = new URLSearchParams(router.query)
    axios
      .get(`http://localhost:3002/order?${usp.toString()}`)
      .then((res) => {
        const data = res.data.pageOrder
        setOrderPage(data)
        setOrder(data.newOrder)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [router.query])

  // 單選
  const toggleCheck = (chooseID) => {
    const updatedOrder = order.map((v) => {
      if (v.order_id == chooseID) {
        return { ...v, checkThisBox: !v.checkThisBox }
      } else return v
    })
    setOrder(updatedOrder)
  }

  //全選
  const handleSelectAll = (event) => {
    const checked = event.target.checked //點擊checkbox
    const updatedOrder = order.map((v) => {
      return { ...v, checkThisBox: checked }
    }) //把所有都加入checked
    setOrder(updatedOrder)
  }

  return (
    <>
      <div className='row'>
        <OrderStatus
          status={status}
          order={order}
          setChangeOrderStatus={setChangeOrderStatus}
          changeOrderStatus={changeOrderStatus}
        />
        <OrderTotal
          setOrderPage={setOrderPage}
          setOrder={setOrder}
          total={total}
          setTotal={setTotal}
        />
        <OrderDate
          setOrderPage={setOrderPage}
          setOrder={setOrder}
          date={date}
          setDate={setDate}
        />
        <OrderKeyword
          setOrderPage={setOrderPage}
          setOrder={setOrder}
          keyword={keyword}
          setkeyword={setkeyword}
          status={status}
          delivery={delivery}
          receipt={receipt}
          pay={pay}
        />
      </div>
      <div className='order-th-group'>
        <div className='order-th-checked'>
          <span>更改狀態</span>
          <input
            className='ms-2'
            type='checkbox'
            id='checkAll'
            onChange={handleSelectAll}
          />
        </div>
        <div className='order-th-oNumber'>訂單編號</div>
        <div className='order-th-uNumber'>會員編號</div>
        <div className='order-th-total'>消費金額</div>
        <div className='order-th-pay'>付款方式</div>
        <div className='order-th-date'>創建日期</div>
        <div className='order-th-state'>狀態管理</div>
        <div className='order-th-other'>其他內容</div>
      </div>

      <OrderList
        orderPage={orderPage}
        toggleCheck={toggleCheck}
        coupon={coupon}
        delivery={delivery}
        order={order}
        date={date}
        status={status}
        pay={pay}
        receipt={receipt}
        setOrder={setOrder}
      />
    </>
  )
}
