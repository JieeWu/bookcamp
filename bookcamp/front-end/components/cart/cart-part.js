import React from 'react'
import Part from './cart-part-step'
import styles from './css/cart-part.module.css'
import { useRouter } from 'next/router'

export default function CartPart() {
  const router = useRouter()
  const activeStep = router.pathname
  return (
    <>
      <div className={`${styles.partDiv}`}>
        <Part
          name='購物清單'
          icon='fa-solid fa-cart-shopping font-m'
          isActive={activeStep.includes('/cart')}
        />
        <Part
          name='填寫資料'
          icon='fa-regular fa-file-lines font-m'
          isActive={activeStep.includes('/cart/checkout') || activeStep.includes('/cart/finish')}
        />
        <Part
          name='訂單完成'
          icon='fa-solid fa-check font-m'
          isActive={activeStep.includes('/cart/finish') }
        />
      </div>
    </>
  )
}
