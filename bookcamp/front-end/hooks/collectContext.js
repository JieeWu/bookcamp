import React, { createContext, useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
export const CollectLove = createContext([])

export const Collectll = ({ children }) => {
  // 收藏判斷
  const [collect, setCollect] = useState([])
  //偵測路由
  const router = useRouter()
  //抓取資料
  useEffect(() => {
    const data = async () => {
      try {
        await axios
          .get('http://localhost:3002/searchcollect/collect', {
            withCredentials: true,
          })
          .then((res) => {
            const gg = res.data
            if (gg.length > 0) {
              const array = gg.map((v) => {
                return v.book_id
              })
              setCollect(array)
            }
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
    <CollectLove.Provider
      value={{
        collect,
        setCollect,
      }}
    >
      {children}
    </CollectLove.Provider>
  )
}
export const useCollect = () => useContext(CollectLove)
