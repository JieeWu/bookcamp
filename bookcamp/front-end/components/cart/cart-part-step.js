import React from 'react'
import styles from './css/cart-part.module.css'
import { useRouter } from 'next/router'

export default function CartPartStep({ icon, name, isActive }) {
  const router = useRouter()
  const activeStep = router.pathname

  //   let stepClass = styles.step
  let additionalImg = null
  let additionalImgRe = null
  const currentLocation = [
    <img
      className={styles.stepMarked}
      src='http://localhost:3002/public/img/decorate/diamond.svg'
    />,
    <img
      className={styles.stepMarkedRe}
      src='http://localhost:3002/public/img/decorate/diamond.svg'
    />,
  ]

  if (activeStep === '/cart' && name === '購物清單') {
    additionalImg = currentLocation[0]
    additionalImgRe = currentLocation[1]
  } else if (activeStep === '/cart/checkout' && name === '填寫資料') {
    additionalImg = currentLocation[0]
    additionalImgRe = currentLocation[1]
  } else if (activeStep === '/cart/finish' && name === '訂單完成') {
    additionalImg = currentLocation[0]
    additionalImgRe = currentLocation[1]
  }

  return (
    <>
      <div className={`${styles.stepDiv} ${styles.step} ${isActive ? styles.stepOK : (isActive=='/cart/finish'? styles.stepOK :'') }`}>
        <div className={styles.stepContent}>
          {additionalImg}
          <i className={icon}></i>
          <span className='mt-2'>{name}</span>
          {additionalImgRe}
        </div>
      </div>
      {name === '訂單完成' ? ('') : (
        <div className={`${styles['cart-part-line-margin']} ${isActive ? 'text-orange' : ''}`}>
          <i className={`fa-solid fa-caret-right ${isActive ? 'arrow-one' : ''}`}></i>
          <i className={`fa-solid fa-caret-right ${isActive ? 'arrow-two' : ''}`}></i>
        </div>
      )}
    </>
  )
}
