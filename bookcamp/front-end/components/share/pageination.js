import React from 'react';
import styles from './pageination.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function PageInation({ currentPage, totalPages, onPageChange }) {
//currentPage當前頁面 //totalPages總頁數 onPageChange回調函數
  const handlePageClick = (page) => {
    if (page === currentPage) {
      return; // 避免重複點擊相同頁面
    }
    onPageChange(page);
  }

  //渲然分頁
  const renderPagination = () => {
    const paginationItems = [];//儲存分頁
    const maxVisiblePages = 5; // 最多可見的分頁數字個數
          
    if (totalPages <= maxVisiblePages) {
      // 如果分頁數量不足，直接顯示所有分頁數字
      for (let page = 1; page <= totalPages; page++) {
        paginationItems.push(
          <li
            className={`page-item mx-2 pixel-box--white-s ${
              currentPage === page ? 'active' : ''
            }`}
            key={page}
          >
            <Link
              className='page-link'
              href='#'
              onClick={(e) => {
                e.preventDefault();
                handlePageClick(page);
              }}
            >
              {page}
            </Link>
          </li>
        );
      }
    } else {
      //會根據當前頁數去算當前頁數的前後2個頁數 則其餘會被隱藏 例如當前頁數=4 startPage會顯示2   endPage會顯示6 也就是23456頁
      // 分頁數量過多，使用省略號
      const startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
      //startPage基於當前頁碼和最大可見頁數計算起始頁碼
      //Math.floor 函數會將這個數字向下取整到最接近的整數，所以結果是 2。 5/2 =2.5 取2
      //=當前頁數-2 確保計算結果不會小於1
      const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
      //endPage 基於 startPage 和最大可見頁數計算終止頁碼，但不超過總頁數。

      //算出來大於1 
      if (startPage > 1) {
        paginationItems.push(
          //這段程式碼是為了始終都有第一頁 而不會被隱藏
          <li className={`page-item mx-2 pixel-box--white-s`} key={1}>
            <Link
              className='page-link'
              href='#'
              onClick={(e) => {
                e.preventDefault();
                handlePageClick(1);
              }}
            >
              1
            </Link>
          </li>
        );
        //算出來大於2的時候 會依據當前分頁養藏其他的分頁  最多顯示5筆分頁  所以點到5 2會被隱藏 變成1..34567... 同理點到6 23會被隱藏
        if (startPage >= 2) {
          paginationItems.push(
            <li className={`page-item mx-2 pixel-box--white-s`} key="start-ellipsis">
              <span className="page-link">...</span>
            </li>
          );
        }
      }
      //每次迴圈都會處理一個頁碼
      for (let page = startPage; page <= endPage; page++) {
        paginationItems.push(
          <li
            className={`page-item mx-2 pixel-box--white-s ${
              currentPage === page ? 'active' : ''
            }`}
            key={page}
          >
            <Link
              className='page-link'
              href='#'
              onClick={(e) => {
                e.preventDefault();
                handlePageClick(page);
              }}
            >
              {page}
            </Link>
          </li>
        );
      }

      //先確保endPage會小於總頁數
      if (endPage < totalPages) {
        //endPage是基於startPage的值去計算 endPage < totalPages - 1確保不是最後一頁 且不是倒數第二頁時
        if (endPage < totalPages - 1) {
          paginationItems.push(
            <li className={`page-item mx-2 pixel-box--white-s`} key="end-ellipsis">
              <span className="page-link">...</span>
            </li>
          );
        }
        //始終都有最後一頁
        paginationItems.push(
          <li className={`page-item mx-2 pixel-box--white-s`} key={totalPages}>
            <Link
              className='page-link'
              href='#'
              onClick={(e) => {
                e.preventDefault();
                handlePageClick(totalPages);
              }}
            >
              {totalPages}
            </Link>
          </li>
        );
      }
    }

    return paginationItems;
  };
// 
  return (
    <>
      <nav
        className={`${styles.PageInationBlock} br-bg-purple py-2`}
        aria-label='Page navigation'
      >
        <ul
          className={`pagination ${styles.pagination} justify-content-center`}
        >
        {/* 箭頭前往第一頁 */}
          <li className='page-item mx-2 pixel-box--white-s'>
            <Link
              className='page-link'
              href='#'
              onClick={(e) => {e.preventDefault();
              handlePageClick(1)}}
              aria-label='First'
            >
              <i className='fa-solid fa-backward'></i>
            </Link>
          </li>
          {/* 箭頭-1頁 */}
          <li className='page-item mx-2 pixel-box--white-s'>
            <Link
              className={`page-link ${currentPage <= 1 ? 'disabled' : ''}`}
              href='#'
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) {
                  handlePageClick(currentPage - 1);
                }
              }}
              aria-label='Previous'
            >
              <i className='fa-solid fa-caret-left'></i>
            </Link>
          </li>
          {renderPagination()}
          {/* 箭頭+1頁 */}
          <li className={`page-item mx-2 pixel-box--white-s ${currentPage === totalPages ? 'disabled' : ''}`}>
            <Link
              className='page-link'
              href='#'
              onClick={(e) =>{e.preventDefault();
                handlePageClick(currentPage + 1)}}
              aria-label='Next'
            >
              <i className='fa-solid fa-caret-right'></i>
            </Link>
          </li>
          {/* 箭頭往最後一頁 */}
          <li className='page-item mx-2 pixel-box--white-s'>
            <Link
              className='page-link'
              href='#'
              onClick={(e) =>{e.preventDefault();handlePageClick(totalPages)}}
              aria-label='Last'
            >
              <i className='fa-solid fa-forward'></i>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
