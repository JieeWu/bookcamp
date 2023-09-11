import React from 'react'
import styles from '@/components/cart/css/cart-item.module.css'
import Link from 'next/link'
export default function UndefinedBook() {
  return (
    <div className={`mt-5 ${styles.cartEmptyDiv}`}>
          <div className='imgBoxSize'>
            <img src='/img/dead.png' className='w-100' />
          </div>
          <div className='my-2'>你的購物車還是空的！</div>
          <Link href='/newbook' className='px-5 my-4'>
            快來找書吧！
          </Link>
        </div>
  )
}
