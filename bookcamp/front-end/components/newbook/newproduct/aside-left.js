import React from 'react'
import styles from './aside-left.module.css'

function asideLeft() {
  const genres = [
    '文學小說',
    '商業理財',
    '藝術設計',
    '人文社科',
    '心理勵志',
    '自然科普',
    '醫療保健',
    '旅遊',
    '輕小說',
    '漫畫/圖文書',
    '語言學習',
    '考試用書',
    '電腦資訊',
    '其他',
  ]

  return (
    <div className={`${styles.backgroundLift}`}>
      <nav className={`${styles.genre}`}>
        <h6>書籍語言</h6>
        <ul>
          {genres.map((genre) => (
            <li key={genre}>
              <a href='#'>{genre}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default asideLeft
