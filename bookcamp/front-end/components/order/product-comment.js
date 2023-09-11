import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
export default function ProductComment() {
  const router = useRouter()
  // 路由參數
  const { book_id } = router.query
  const [allComment, setAllComment] = useState([])

  useEffect(() => {
    const data = async () => {
      try {
        await axios
          .get(`http://localhost:3002/oldbook/bookComment/${book_id}`)
          .then((res) => {
            const newComment = res.data.comment.filter((v) => {
              if (v.book_star != null) {
                return v
              }
            })
            setAllComment(newComment)
          })
          .catch((error) => {
            console.log(error)
          })
      } catch (error) {
        console.log(error)
      }
    }
    data()
  }, [])


  return (
    <>
      {allComment.map((v, i) => {
        const stars = Array.from({ length: v.book_star }, (_, index) => (
          <span key={index}>&#9733;</span>
        ))
        const emptyStars = Array.from(
          { length: 5 - v.book_star },
          (_, index) => (
            <span key={index} className='off'>
              &#9733;
            </span>
          ),
        )
        return (
            <>
          <div
            key={i}
            className='pixel-border-br-purple pixel-font-chinese font-s'
          >
            <div className='text-d-purple'>{v.client_name}</div>
            <div className='star_button on'>
              {stars}
              {emptyStars}
            </div>
            <div>{v.book_assess}</div>
            <div className='text-end'>{v.order_create_date}</div>
          </div>
          <hr />
          </>
        )
      })}
      <style jsx>{`
        .star_button {
          background-color: transparent;
          border: none;
          outline: none;
          font-size: 15px;
        }
        .on {
          color: gold;
        }
        .off {
          color: gray;
        }
      `}</style>
    </>
  )
}
