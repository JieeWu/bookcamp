import React from 'react'
import styles from './bot.module.css'

export default function Botbutton({ actionProvider }) {
  const options = [
    { text: '來書營?', handler: () => actionProvider.handleBookCamp(), id: 1 },
    { text: '刪除所有收藏',handler: () => actionProvider.handleBook(), id: 2 },
    { text: '優惠卷使用', handler: () => actionProvider.handleCouponUse(), id: 3 },
    { text: '配送時間', handler: () =>  actionProvider.handleDate(), id: 4 },
    // { text: '忘記密碼', handler: () => {}, id: 5 },
  ]

  const optionsMarkup = options.map((option) => (
    <div className={styles['button-container']} key={option.id}>
    <button
      className={styles['learning-option-button']}
      onClick={option.handler}
    >
      {option.text}
    </button>
  </div>
  ))

  return (
    <div className={styles['learning-options-container']}>{optionsMarkup}</div>
  )
}
