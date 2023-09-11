import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ChatApp from '@/components/cbot/chat-app'
import axios from 'axios'
import Link from 'next/link'
import Swal from 'sweetalert2'
export default function Manage(props) {
  //存書籍
  const [bookData, setbookData] = useState([])

  //存上下架
  const [oldstate, setState] = useState([])

  const [bookDataFromParent, setBookDataFromParent] = useState(props.books)
  // console.log(bookDataFromParent)
 
  const handleDeleteBook = async (bookId) => {
    Swal.fire({
      title: '你確定要刪除嗎？',
      text: '若誤刪除需要重新新增!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '確定',
      cancelButtonText: '取消'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(
            `http://localhost:3002/selleroldbook/${bookId}`
          );
          console.log(res.data);
          
          // 更新狀態
          const updatedBooks = bookDataFromParent.filter(book => book.book_id !== bookId);
          setBookDataFromParent(updatedBooks);
  
          Swal.fire('已刪除!', '資料已被刪除。', 'success');
        } catch (err) {
          console.log(err);
          Swal.fire('刪除失敗!');
        }
      }
    });
  };



  //路由參數
  useEffect(() => {
    const fetchstoreDate = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3002/oldmanageRouter/my-store`,
        )
        setbookData(res.data.oldbook)
        setState(res.data.bookstatus)
      } catch (err) {
        console.log(err)
      }
    }
    fetchstoreDate()
  }, [])
  useEffect(() => {
    setBookDataFromParent(props.books);
  }, [props.books]);
 
  return (
    <>
       {Array.isArray(bookDataFromParent) && bookDataFromParent.map((v, i) => (
        <div className='row Management3' key={i}>
          <div className='col-4 '>
            <img
              src={`http://localhost:3002/public/img/oldbookimgs/${v.book_img_id}`}
              alt='123'
              width='100px'
              className='orwd'
            />
            <div className='book orwd '>{v.b_title}</div>
          </div>
          <img
            className='orwd1'
            src={`http://localhost:3002/public/img/oldbookimgs/${v.book_img_id}`}
            alt='123'
            width='10px'
          />
          <div className='book  orwd1 col-md-1 orwd1 odk3'>
            {v.b_title}
          </div>
          <div className='col-md-1  price1 '>{v.book_price}</div>
          <div className='col-md-1  state3 orwd'>
            {oldstate[v.book_status_id - 1]?.book_status_name}
          </div>
          <div className='col-md-2  time3 orwd'>{v.sherlf_date}</div>
          <div className='col-md-2  count3'>{v.book_quantity}</div>
          <div className='col-md-1  state3 orwd1 '>
            {oldstate[v.book_status_id - 1]?.book_status_name}
          </div>
          <div className='col-md-2  time3 orwd1 '>{v.sherlf_date}</div>

          <div className='col-md-2  bot5 delbt'>
            <Link className='Lookorder' href={`/editproduct/${v.book_id}`}>
              編輯
            </Link>
            <button className='Lookorder' onClick={() => handleDeleteBook(v.book_id)}>
              刪除
            </button>
          </div>
        </div>
      ))} 

    
    </>
  )
}
