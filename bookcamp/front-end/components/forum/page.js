import React from 'react'
import { useState, useEffect } from 'react'

export default function Pagination({
  totalCount,
  itemsPerPage,
  currentPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalCount / itemsPerPage)

  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPageButtons = 3 // 控制要显示的最大页码按钮数量

    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      const middle = Math.floor(maxPageButtons / 2)
      let startPage = currentPage - middle
      let endPage = currentPage + middle

      if (startPage < 1) {
        startPage = 1
        endPage = maxPageButtons
      }

      if (endPage > totalPages) {
        endPage = totalPages
        startPage = totalPages - maxPageButtons + 1
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }
    }

    return pageNumbers
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage)
    }
  }

  useEffect(() => {
    if (currentPage < 1) {
      onPageChange(1)
    } else if (currentPage > totalPages) {
      onPageChange(totalPages)
    }
  }, [currentPage, onPageChange, totalPages])

  const pageNumbers = getPageNumbers()

  return (
    <nav aria-label='Page navigation'>
      <ul className='pagination justify-content-center'>
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className='page-link'
            onClick={() => handlePageChange(currentPage - 1)}
          >
            上一页
          </button>
        </li>
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={`page-item ${
              pageNumber === currentPage ? 'active' : ''
            }`}
          >
            <button
              className='page-link'
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages ? 'disabled' : ''
          }`}
        >
          <button
            className='page-link'
            onClick={() => handlePageChange(currentPage + 1)}
          >
            下一页
          </button>
        </li>
      </ul>
    </nav>
  )
}
