import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import styles from '@/components/forum/forum.module.css'
export default function Category(props) {
  const [Data3, setData3] = useState([])
  const [showMore, setShowMore] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://3.113.3.149:3002/forum/select/category',
        )
        console.log(response)
        const data = response.data
        setData3(data.rows)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])
  useEffect(() => {
    const categoryWidth = () => {
      if (props.windowSize.width <= 994) {
        setShowMore(false)
      } else {
        setShowMore(true)
      }
    }
    categoryWidth()
  }, [props.windowSize.width])
  console.log(Data3)
  const categoryData = async (pid) => {
    // 將pid參數進行URL編碼（URL encoding），這樣特殊字符會被轉換為URL安全的形式。
    pid = encodeURIComponent(pid)
    const res = await axios.get(
      `http://3.113.3.149:3002/forum/select/category/${pid}`,
    )
    const data = res.data.rows
    const [data2] = res.data.totalCountResult
    props.setTotalCount(data2.totalCount)
    props.setPost(data)
  }
  return (
    <>
      <div className='row row-cols-3 mt-3 mb-1'>
        {Data3 && Data3.length !== 0
          ? Data3.map((v, i) => {
              if (i < 6 || showMore) {
                return (
                  <div className={`${styles.categoryBtn} col`} key={i}>
                    <button
                      onClick={() => {
                        categoryData(v.forum_Cname)
                      }}
                    >
                      {v.forum_Cname}
                    </button>
                  </div>
                )
              }
              return null
            })
          : ''}
      </div>
      <div></div>
      {Data3.length > 6 && (
        <button onClick={() => setShowMore((prev) => !prev)}>
          {showMore ? (
            <i
              className='fa-solid fa-caret-up fa-xl icon-shake'
              style={{ color: '#fff261' }}
            ></i>
          ) : (
            <i
              className='fa-solid fa-caret-up fa-rotate-180 fa-xl icon-shake'
              style={{ color: '#fff261' }}
            ></i>
          )}
        </button>
      )}
      <style jsx>{`
        .category-btn {
          height: 47px;
          background: var(--colorful-purple, #9a4aff);
          box-shadow: -3px -3px 0px 0px rgba(0, 0, 0, 0.3) inset;
          color: white;
          transition: all 0.3s ease; // Adding transition effect here
          opacity: 1;
          transform: translateY(0);
        }
        .category-btn.hide {
          opacity: 0;
          transform: translateY(20px);
        }
        @keyframes shake {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-7.5px);
          }
          100% {
            transform: translateY(0);
          }
        }

        .icon-shake {
          display: inline-block;
          animation: shake 1s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
          animation-iteration-count: infinite;
        }
      `}</style>
    </>
  )
}
