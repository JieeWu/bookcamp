import React, { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

// 建立這個context
export const Cart = createContext([])

export const CartAllItem = ({ children }) => {
  // 該會員-所有的產品
  const [cartItem, setCartItem] = useState([])
  // 該會員-訂單資料寫入
  const [orderCH, setOrderCH] = useState([])
  //偵測路由
  const router = useRouter()


  useEffect(() => {
    const data = async () => {
      try {
        await axios
          .get('http://localhost:3002/cart/check', {
            withCredentials: true,
          })
          .then((res) => {
            // 購物車所有產品
            setCartItem(res.data.cart)
          })
          .catch((error) => {
            console.log(error)
          })
      } catch (error) {
        console.log(error)
      }
    }
    data()
  }, [router.pathname == '/'])

  return (
    <Cart.Provider
      value={{
        cartItem,
        setCartItem,
        orderCH,
        setOrderCH,
      }}
    >
      {children}
    </Cart.Provider>
  )
}

// 輸出
export const CartContext = () => useContext(Cart)
