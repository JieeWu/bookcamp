import React, { useState, useEffect } from 'react'

import axios from 'axios'
import Swal from 'sweetalert2'

// 取用Redux
import { useDispatch, useSelector } from 'react-redux'
import { setOrder } from '@/Redux/action.js'

import CartItemHeader from '@/components/cart/cart-item-header'
import CartDialogBtn from '@/components/cart/cart-dialog-btn'
import CartItem from '@/components/cart/cart-book'
import CartPart from '@/components/cart/cart-part'

import styles from '@/components/cart/css/cart-item.module.css'
import inforstyles from '@/components/cart/css/cart-information.module.css'

export default function Checkout3() {
  //取用Redux
  const localorder = useSelector((state) => state.order) //此為完整訂單內容，拿來傳送給後端

  // 讀取
  const [allData, setAllData] = useState([])
  console.log('allData', allData)
  // 傳給產品
  const [book, setBook] = useState([])

  //取用Redux
  const dispatch = useDispatch()

  //抓取資料
  useEffect(() => {
    const data = async () => {
      try {
        await axios
          .post('http://localhost:3002/cart/finish', localorder, {
            headers: {
              'content-type': 'application/json',
            },
            withCredentials: true,
          })
          .then((res) => {
            let data = {
              coupon:
                res.data.bookcoupon == ''
                  ? ''
                  : res.data.bookcoupon[0].discount_display,
              couponType:
                res.data.bookcoupon == ''
                  ? ''
                  : res.data.bookcoupon[0].discount_type,
              couponRecordId:
                res.data.bookcoupon == ''
                  ? ''
                  : res.data.bookcoupon[0].coupon_record_id,
              user: res.data.userdata.client_name,
              userPhone: res.data.userdata.phone,
              userAddress: res.data.userdata.client_address,
              point: res.data.point,
              usepoint: res.data.usepoint,
              consignee: res.data.bookorder[0].consignee,
              consigneePhone: res.data.bookorder[0].consignee_phone,
              consigneeAddress: res.data.bookorder[0].consignee_address,
              dilivery: res.data.bookdelivery[0].delivery_name,
              pay: res.data.bookpay[0].pay_name,
              receipt: res.data.bookreceipt[0].receipt_name,
              fee: res.data.bookorder[0].delivery_fee,
              other: res.data.bookorder[0].other,
              amount: res.data.amount,
              total: res.data.bookorder[0].total,
              orderId: res.data.bookorder[0].order_id,
              address711: res.data.bookorder[0].delivery_address,
            }
            setAllData(data)
            setBook(res.data.bookdetail)

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '感謝您的訂購！',
              showConfirmButton: true,
            })
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        let param = {
          order_id: allData.orderId,
          coupon_record_id: allData.couponRecordId,
        }
        const response = await axios.post(
          `http://localhost:3002/coupon/record/update`,
          param,
        )
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()

  }, [allData])



  return (
    <>
      <div className='container'>
        <div className='row mt-5'>
          {/* 步驟 */}
          <div className='mb-5'>
            <CartPart />
          </div>
          {/* 產品 */}
          <div className='col-12'>
            <CartItemHeader />
            <div className={`frame-line-black ${styles.cart_bg}`}>
              {book.map((item) => (
                <CartItem item={item} />
              ))}
            </div>
          </div>
          {/* 個人訊息 */}
          <div className='col-12'>
            <div className='frame-line-black-heart my-4'>
              <div className='m-bg-purple pixel-d-border-purple text-white p-4'>
                {/* 個人資訊 */}
                <div className='row'>
                  <div className='col-12 col-lg-6'>
                    <div className='d-flex flex-column align-items-start p-4 d-bg-purple rounded-3'>
                      <h5 className='pixel-font-chinese d-flex align-items-center pb-2'>
                        <i className='fa-solid fa-circle-info me-2'></i>
                        <span>購買人資訊</span>
                      </h5>
                      <div className='pb-2'>
                        <span>姓名：</span>
                        <span>{allData.user}</span>
                      </div>
                      <div className='pb-2'>
                        <span>電話：</span>
                        <span>{allData.userPhone}</span>
                      </div>
                      <div className='d-flex pb-2'>
                        <span>地址：</span>
                        <div>{allData.userAddress}</div>
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-lg-6 mt-3 mt-lg-0'>
                    <div className='d-flex flex-column align-items-start p-4 d-bg-purple rounded-3'>
                      <h5 className='pixel-font-chinese d-flex align-items-center pb-2'>
                        <i className='fa-solid fa-circle-info me-2'></i>
                        <span>收貨人資訊</span>
                      </h5>
                      <div className='pb-2'>
                        <span>姓名：</span>
                        <span>{allData.consignee}</span>
                      </div>
                      <div className='pb-2'>
                        <span>電話：</span>
                        <span>{allData.consigneePhone}</span>
                      </div>
                      <div className='d-flex pb-2'>
                        <span>地址：</span>
                        <div>
                          {allData.address711 == '' ||
                          allData.address711 == null
                            ? allData.consigneeAddress
                            : allData.address711}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 明細 */}
          <div className='col-12'>
            <div className='c-bg-purple pixel-border-purple p-4 mb-3'>
              <div className='d-flex flex-column text-white'>
                <div className='d-flex flex-wrap pb-2'>
                  <div className='col-12 col-lg-8'>
                    <div className='d-flex flex-wrap'>
                      <div className='me-3 py-2'>
                        <i
                          className='fa-regular fa-circle-check me-2'
                          style={{ color: 'rgb(0, 213, 25)' }}
                        ></i>
                        商品共
                        <span className='d-bg-purple p-2 px-3 rounded-pill mx-2'>
                          {book ? book.length : ''}項
                        </span>
                      </div>
                      <div className='me-3 py-2'>
                        <i
                          className='fa-regular fa-circle-check me-2'
                          style={{ color: 'rgb(0, 213, 25)' }}
                        ></i>
                        配送方式
                        <span className='d-bg-purple p-2 px-3 rounded-pill mx-2'>
                          {allData.dilivery}
                        </span>
                      </div>
                      <div className='me-3 py-2'>
                        <i
                          className='fa-regular fa-circle-check me-2'
                          style={{ color: 'rgb(0, 213, 25)' }}
                        ></i>
                        發票
                        <span className='d-bg-purple p-2 px-3 rounded-pill mx-2'>
                          {allData.receipt}
                        </span>
                      </div>
                      <div className='me-3 py-2'>
                        <i
                          className='fa-regular fa-circle-check me-2'
                          style={{ color: 'rgb(0, 213, 25)' }}
                        ></i>
                        付款方式
                        <span className='d-bg-purple p-2 px-3 rounded-pill mx-2'>
                          {allData.pay}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-lg-4'>
                    <div className='mt-4 mt-lg-0'>
                      <div className='d-flex justify-content-end text-end'>
                        <b className='mb-2'>商品小計</b>
                        <span className={styles.overviewAmount}>
                          {allData.amount}
                        </span>
                      </div>
                      <div className='d-flex justify-content-end text-end'>
                        <b className='mb-2'>點數折抵</b>
                        <span className={styles.overviewAmount}>
                          {allData.usepoint ? -allData.usepoint : 0}
                        </span>
                      </div>
                      <div className='d-flex justify-content-end text-end'>
                        <b className='mb-2'>優惠券</b>
                        <span className={styles.overviewAmount}>
                          {allData.couponType == 0
                            ? -allData.coupon
                            : allData.coupon + '折'}
                        </span>
                      </div>
                      <div className='d-flex justify-content-end text-end'>
                        <b className='mb-2'>運費計算</b>
                        <span className={styles.overviewAmount}>
                          {allData.fee}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='d-flex justify-content-end text-end border-top pt-3'>
                  <b className=''>總計</b>
                  <span className={styles.overviewAmount}>
                    ${allData.total}元
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CartDialogBtn Shopping='返回購物車' next='繼續購物' href='/newbook' />
      </div>

      <style jsx>
        {`
          h3 {
            display: inline;
            margin: 0;
            padding: 0;
          }
        `}
      </style>
    </>
  )
}
