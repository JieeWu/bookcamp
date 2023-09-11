import React, { useState, useEffect, useContext } from 'react'

import axios from 'axios'

import { CartContext } from '@/hooks/cartContext'
import { useAuthJWT } from '@/hooks/use-auth-jwt'
// 取用Redux
import { useDispatch } from 'react-redux'
import { setOrder, setBook } from '@/Redux/action.js'
import { useRouter } from 'next/router'

import styles from '@/components/cart/css/cart-item.module.css'

import CartBook from '@/components/cart/cart-book'
import CartItemHeader from '@/components/cart/cart-item-header'
import CartPart from '@/components/cart/cart-part'
import CartCoupon from '@/components/cart/cart-coupon'
import CartPoint from '@/components/cart/cart-point'
import CartAddPurchase from '@/components/cart/cart-add-purchase'
import CartDescribe from '@/components/cart/cart-describe'
import UndefinedBook from './undefined-book'

export default function Cart() {
  // 購物車狀態
  const { cartItem, setCartItem, orderCH, setOrderCH } = CartContext()
  // 使用會員
  const { authJWT } = useAuthJWT()
  //偵測路由
  const router = useRouter()
  //取用Redux
  const dispatch = useDispatch()

  //單選or全選-選取的內容
  const [check, setCheck] = useState([])
  // 當前會員點數
  const [point, setPoint] = useState([])
  // 會員選擇使用的點數
  const [usePoint, setUsePoint] = useState(0)
  // 當前所有的優惠卷
  const [coupon, setCoupon] = useState([])
  // 會員選擇使用的優惠卷
  const [cartCoupon, setCartCoupon] = useState([])
  // 購物車 加購區需要的十個商品(隨機)
  const [cartAddItem, setCartAddItem] = useState([])

  //抓取資料
  useEffect(() => {
    const data = async () => {
      try {
        await axios
          .get('http://localhost:3002/cart/check', {
            withCredentials: true,
          })
          .then((res) => {
            dispatch(setOrder([]))
            dispatch(setBook([]))
            setPoint(res.data.user[0].client_point)
            // 購物車所有產品
            setCartItem(res.data.cart)
            // 優惠卷抓取
            setCoupon(res.data.coupon)
            // 設定訂單需要的資料
            const userAndItem = {
              total: 0,
              amount: 0,
              id: res.data.user[0].client_id,
              coupon: null,
              fee: 0,
              userName: res.data.user[0].client_name,
              userPhone: res.data.user[0].phone,
              userAddress: res.data.user[0].client_address,
              userEmail: res.data.user[0].email,
              point: res.data.user[0].client_point,
              usePoint: 0,
              consignee: '',
              consigneePhone: '',
              consigneeAddress: '',
              other: '',
              delivery: 0,
              receipt: 1,
              pay: 0,
              address711:'',
              vehicle:'',
              book: [],
            }
            setOrderCH(userAndItem)

            // 進來購物車時就把所有內容勾選
            let all = res.data.cart.map((v) => {
              return v.cart_id
            })
            setCheck(all)
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

  // 進來購物車時就把所有內容勾選(為了加購後東西要勾選)
  // useEffect(() => {
  //   if (cartItem) {
  //     let all = cartItem.map((v) => {
  //       return v.cart_id
  //     })
  //     setCheck(all)
  //   }
  // }, [cartItem])

  /* --------------- 這裡計算總金額 -------------- */
  // 篩選有選擇到的商品 + 計算總金額
  
  let book = []
  let amount = 0
  let fee = 0
  let total = 0
  let amountCoupon = 0
  let couponName = ''
  let operator = []

  if (cartItem && cartItem.length > 0) {
    book = cartItem.filter((item) => check.includes(item.cart_id))
    amount = book.reduce((acc, v) => acc + v.book_price * v.book_count, 0)

    // 優惠卷計算
    if(cartCoupon.length > 0) {
      operator = coupon[parseInt(cartCoupon) - 1]
      couponName = operator.coupon_name
      if (operator.discount_type == 0) {

      }
    }


    if (cartCoupon.length > 0) {
      operator = coupon[parseInt(cartCoupon) - 1]
      couponName = operator.coupon_name
      if (operator.discount_type == 0) {
        amountCoupon = amount - parseInt(operator.discount)
      } else if (operator.discount_type == 1) {
        amountCoupon = Math.floor(amount * parseFloat(operator.discount))
      }
    } else {
      amountCoupon = amount
    }

    // 運費計算
    if (amount > 3000 || operator.coupon_id == 13) {
      fee = 0
    } else {
      fee = 60
    }

    // 總價計算
    if (amountCoupon - usePoint <= 0 ) {
      total = 0
    } else if (amountCoupon - usePoint <= 0) {
      total = 0 + 60
    } else {
      total = amountCoupon - usePoint + fee
    }
  }
  /* --------------- 這裡計算總金額 -------------- */

  // 更新orderCH資訊
  useEffect(() => {
    let newValue = {
      ...orderCH,
      total: total,
      amount: amount,
      usePoint: parseInt(usePoint),
      coupon: parseInt(cartCoupon),
      fee: fee,
      book: book,
    }
    setOrderCH(newValue)
  }, [check, amount, usePoint, cartCoupon])

  // 功能-單選
  const selectCheck = (cartID) => {
    if (check.includes(cartID)) {
      setCheck(check.filter((id) => id !== cartID))
    } else {
      setCheck([...check, cartID])
    }
  }
  // 功能-全選
  const selectCheckAll = (e) => {
    if (e.target.checked === true) {
      setCheck([])
    } else {
      const allCartID = cartItem.map((item) => item.cart_id)
      setCheck(allCartID)
    }
  }

  //點下前往加購時，讀取內容
  const seeAddItem = () => {
    try {
      axios
        .get('http://localhost:3002/share/addcart')
        .then((res) => {
          setCartAddItem(res.data.bookadd1)
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }
  }

  // 樣式加入
  const cartSpacing = {
    marginBottom: '23vh',
  }

  return (
    <>
      {/* 會員沒書 */}
      {!cartItem || cartItem.length === 0 ? (
        <UndefinedBook />
      ) : (
        <div className='row' style={cartSpacing}>
          <div className='col-xxl-2'></div>
          <div className='col-12 col-xxl-8 d-flex flex-column'>
            {/* 步驟區塊 */}
            <div className='my-5'>
              <CartPart />
            </div>
            {/* 產品區塊 */}
            <CartItemHeader selectCheckAll={selectCheckAll} />
            <div className={`frame-line-black ${styles.cart_bg}`}>
              {cartItem.map((item) => {
                return (
                  <CartBook
                    item={item}
                    selectCheck={selectCheck}
                    check={check}
                  />
                )
              })}
            </div>
            {/* 優惠券&點數區塊 */}
            <div className='d-flex flex-wrap mt-4 '>
              <CartCoupon setCartCoupon={setCartCoupon} amount={amount}/>
              <CartPoint
                amount={amount}
                amountCoupon={amountCoupon}
                total={total}
                point={point}
                usePoint={usePoint}
                setUsePoint={setUsePoint}
              />
            </div>
          </div>
          <div className='col-xxl-2'></div>

          {/* 描述區 */}
          <CartDescribe
            fee={fee}
            seeAddItem={seeAddItem}
            amount={amount}
            check={check}
            couponName={couponName}
            usePoint={usePoint}
            total={total}
            cartCoupon={cartCoupon}
          />
        </div>
      )}
      {/* 加購彈跳視窗 */}
      <CartAddPurchase setCheck={setCheck} cartAddItem={cartAddItem} />
    </>
  )
}
