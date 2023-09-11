import { useState } from 'react'
import styles from '../Mycommodity/seller-ob.module.css'
import Manage from '@/components/oldbook/Mycommodity/manage'

export default function Seller() {
  return (
    <>
      <div className='row Management2'>
        <div className='col-4'>商品</div>
        <div className='col-1'>金額</div>
        <div className='col-1'>狀態</div>
        <div className='col-2'>到期時間</div>
        <div className='col-2'>運送方式</div>
        <div className='col-2'>操作</div>
      </div>
      <div >
        <Manage />
      </div>
    </>
  )
}
