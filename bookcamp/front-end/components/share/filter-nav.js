import React from 'react'
import styles from './filter-nav.module.css'
import { useRouter } from 'next/router'
export default function FilterNav({ setSortOrder, sortOrder, fetchBooksByDate }) {
  return (
    <>
      <div className={`${styles.filterNav} br-bg-purple text-white`}>
        <span>篩選</span>
        <button className={styles.filterBtn}>熱銷</button>
        <button className={styles.filterBtn} 
    onClick={async () => {
      try {
        fetchBooksByDate();
        if (response.data) {
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }}
    >最新</button>
        
        <div className='d-flex  ms-auto'>
        <label className='me-3 mt-2'>價格</label>
        
        <select
          className={`${styles.formSelect} d-md-flex out-time-pixel`}
          aria-label='Default select example'
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          // e.target 是觸發這個事件的元素，即 <select> 元素。
          // e.target.value 是 <select> 當前被選中的 <option> 的值。
          // setSortOrder(e.target.value) 則是更新我們的 sortOrder 狀態為 <select> 當前的值。
        >
          <option value=''>預設排序</option>
          <option value='desc'>高到低</option>
          <option value='asc'>低到高</option>
          
        </select>
        </div>
      </div>
    </>
  )
}
