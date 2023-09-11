import { useState } from 'react'
import { RiCoupon3Line } from 'react-icons/Ri'

export default function Oldbookcoupon() {
  const couponClass = ['滿千折扣', '滿百折扣', '生日禮卷', '滿萬折扣']
  
  const [couponMoney, setCouponMoney] = useState(false)

  return (
    <div className='leftad1'>
      {couponClass.map((v,i) => (
        <div className='oldbookcoupon' key={v}>
          <div className='coupontext' > 
          <RiCoupon3Line />
          {v}
          </div>
          <button className='couponbutton'>領取</button>
        </div>
      ))}
      
      <div className='oldbookcoupon'>
        <div className='more'>
          <a href=''>查看更多</a>
        </div>
      </div>
    </div>
  )
}
