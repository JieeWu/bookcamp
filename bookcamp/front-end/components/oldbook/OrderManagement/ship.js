import { useState } from 'react'

export default function Ship() {
  const statuses = [
    '待出貨',
    '取消的訂單',
    '尚未付款',
    '運送中',
    '已完成',
    '退貨/退款',
  ]
  const [order, setOrder] = useState('待出貨')
  
  const OrderChange = (newOrder) =>{
    setOrder(newOrder)
  }
  return (
    <>
      <ul className='Management nav nav-tab'>
        {statuses.map((v, i) => {
          return (
            <li key={v}>
              <a href='#' onClick={()=>{OrderChange(v)} }
              className={order === v ? 'operatemenu' : '' }>{v}</a>
            </li>
          )
        })}
      </ul>
    </>
  )
}
