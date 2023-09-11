import React from 'react'
import styles from './newbook-list.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
export default function NewBookList() {
  const router = useRouter()
  

  const handleGenreClick = (genreId) => {
    router.push({
      pathname: '/newbook',
      query: { b_genre_id: genreId,},
    })
  }

  const handleLanguageClick = (languageId) => {
    router.push({
      pathname: '/newbook',
      query: { book_language: languageId,},
    })
  }

  return (
    <>
      <div className={`${styles.bookListBlock}`}>
        <h5 className={`${styles.bookListTilte} pixel-font-chinese`}>
          <i className='fa-solid fa-address-book me-2'></i>
          書籍分類
        </h5>
        <div className='h-100'>
          {/* 功能管理區 */}
          <div className={styles.bookListOptions} id='accordion'>
            <button
              className={`${styles.bookMainBtn}`}
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapse'
              aria-expanded='false'
              aria-controls='collapse'
            >
              書籍語言
              <i className='fa-solid fa-caret-down'></i>
            </button>
            <div
              className={`${styles.listContent} collapse`}
              id='collapse'
              data-bs-parent='#accordion'
            >
              <div className={`card card-body ${styles.bookListDetails}`}>
                <ul>
                  <li>
                    <button className={`${styles.resetbutton}`}  onClick={()=>handleLanguageClick(1)}>
                      繁體書類
                    </button>
                  </li>
                  <li>
                    <button className={`${styles.resetbutton}`} onClick={()=>handleLanguageClick(2)}>
                      英文書類
                    </button>
                  </li>
                  <li>
                    <button className={`${styles.resetbutton}`} onClick={()=>handleLanguageClick(3)}>
                      外文書類
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <button
              className={`${styles.bookMainBtn}`}
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapse1'
              aria-expanded='true'
              aria-controls='collapse1'
            >
              書籍類別
              <i className='fa-solid fa-caret-down'></i>
            </button>
            <div
              className='collapse w-100 show'
              id='collapse1'
              data-bs-parent='#accordion'
            >
              <div className={`card card-body ${styles.bookListDetails}`}>
                <ul className='mb-0'>
                  <li>
                    <button
                      className={`${styles.resetbutton}`}
                      onClick={() => handleGenreClick('1')}
                    >
                      文學小說
                    </button>
                  </li>
                  <li>
                    <button
                      className={`${styles.resetbutton}`}
                      onClick={() => handleGenreClick('2')}
                    >
                      商業理財
                    </button>
                  </li>
                  <li>
                    <button
                      className={`${styles.resetbutton}`}
                      onClick={() => handleGenreClick('3')}
                    >
                      藝術設計
                    </button>
                  </li>
                  <li>
                    <button
                      className={`${styles.resetbutton}`}
                      onClick={() => handleGenreClick('4')}
                    >
                      人文社科
                    </button>
                  </li>
                  <li>
                    <button
                      className={`${styles.resetbutton}`}
                      onClick={() => handleGenreClick('5')}
                    >
                      心理勵志
                    </button>
                  </li>
                  <li>
                    <button
                      className={`${styles.resetbutton}`}
                      onClick={() => handleGenreClick('6')}
                    >
                      自然科普
                    </button>
                  </li>
                  <li>
                    <button
                      className={`${styles.resetbutton}`}
                      onClick={() => handleGenreClick('7')}
                    >
                      醫療保健
                    </button>
                  </li>
                  <li>
                    <button
                      className={`${styles.resetbutton}`}
                      onClick={() => handleGenreClick('8')}
                    >
                      生活風格
                    </button>
                  </li>
                  <li>
                    <button
                      className={`${styles.resetbutton}`}
                      onClick={() => handleGenreClick('9')}
                    >
                      旅遊
                    </button>
                  </li>
                  <li>
                    <button
                      className={`${styles.resetbutton}`}
                      onClick={() => handleGenreClick('10')}
                    >
                      輕小說
                    </button>
                  </li>
                  <li>
                    <button
                      className={`${styles.resetbutton}`}
                      onClick={() => handleGenreClick('11')}
                    >
                      漫畫/圖文書
                    </button>
                  </li>
                  <li>
                    <button
                      className={`${styles.resetbutton}`}
                      onClick={() => handleGenreClick('12')}
                    >
                      語言學習
                    </button>
                  </li>
                  <li>
                    <button
                      className={`${styles.resetbutton}`}
                      onClick={() => handleGenreClick('13')}
                    >
                      考試用書
                    </button>
                  </li>
                  <li>
                    <button
                      className={`${styles.resetbutton}`}
                      onClick={() => handleGenreClick('14')}
                    >
                      電腦資訊
                    </button>
                  </li>
                  <li>
                    <button
                      className={`${styles.resetbutton}`}
                      onClick={() => handleGenreClick('15')}
                    >
                      其他
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
