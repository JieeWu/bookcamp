import React, { useState } from 'react'
import MemberSide from '@/components/member/member-side'
import Breadcrumb2 from '@/components/share/guide-pagination'
import MemberMiddle from '@/components/member/member-middle'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import OrderDetailComment from '@/components/member/order/order-detail-comment'
export default function Comment() {

  //評價
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState([]);


  const router = useRouter();

  // 送出評論
  const sentComment = async (e) => {
    try {
      await axios
        .put(`http://localhost:3002/member/user-order/comment/${router.query.id}`, { rating, comment }, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '已評論！',
            showConfirmButton: true,
          }).then(()=>{
            router.back()
          })

        }).catch((error) => {
          console.log(error);
        })
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <>
      <div className='row'>
        <div className='col-2 d-none d-md-flex px-0'>
          <MemberSide />
        </div>
        <div className='col-12 col-md-10 col-xl-8 mobile-phone'>
          <div className='mb-5'>
            <Breadcrumb2 />
            <div className='px-3'>
              <MemberMiddle
                TitleIcon='fa-solid fa-comment-dots pe-2'
                TitleName='評論商品'
                Remark='(給此商品給一個評價吧!!)' >
                <OrderDetailComment setRating={setRating} setComment={setComment} rating={rating} comment={comment} />


                <div className='d-flex justify-content-between py-4'>
                  <button
                    type='button' onClick={() => { router.back() }}
                    className='text-white main-btn pixel-border-purple c-bg-purple'
                  >
                    返回
                  </button>
                  <button
                    type='button'
                    className='main-btn pixel-border-yellow m-bg-yellow'
                    onClick={(e) => { sentComment(e); }}
                  >
                    送出評論
                    <i className='fa-solid fa-upload ms-3'></i>
                  </button>
                  </div>
              </MemberMiddle>
            </div>
          </div>
        </div>

        {/* <div className='col d-none d-xl-flex'></div> */}
      </div>
    </>
  )
}
