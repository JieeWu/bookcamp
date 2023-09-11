import React, { useEffect, useState } from 'react'
import Oldbookad from '@/components/oldbook/oldbook/oldbookad'
import OldbookAcc from '@/components/oldbook/oldbook/oldbookAcc'
import Oldbookcoupon from '@/components/oldbook/oldbook/oldbookcoupon'
import Carousel from 'react-bootstrap/Carousel'
import Monthrec from '@/components/oldbook/oldbook/monthrec'
import axios from 'axios'
import { useRouter } from 'next/router'
import styles from '@/styles/oldbook/odbk-page.module.css'
import CollectButton from '@/components/oldbook/CollectButton'
import CollectBtn from '@/components/oldbook/collectBtn'
import Link from 'next/link'
import LinkComponent from '@/components/cbot/chatbot/cbota'

export default function Oldbook() {
  const [oldbook, setOldbook] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()
  const queryTerm = router.query.query
  const { b_genre_id } = router.query
  const { query } = router.query

  useEffect(() => {
    const fetchBooksByGenre = async () => {
      try {
        const res = b_genre_id
          ? await axios.get(`http://localhost:3002/obgenre/${b_genre_id}`)
          : await axios.get('http://localhost:3002/oldbook')
        setOldbook(res.data.oldbook)
      } catch (ex) {}
    }

    if (router.isReady && !query) {
      fetchBooksByGenre()
    }
  }, [b_genre_id, router.isReady])
  

  //搜尋
  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get('http://localhost:3002/hotsearch', {
        params: { term: searchTerm },
      })
      setOldbook(response.data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    if (query && router.isReady) {
      handleSearch(query)
    }
  }, [query, router.isReady])

  return (
    <>
      <div>
        <input
          type='text'
          placeholder='搜尋書籍'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ paddingLeft: 20 }}
        />
        <button type='submit' onClick={() => handleSearch(searchTerm)}>
          搜尋
        </button>

        <ul className='list'>
          <li>
            <a href=''>Home</a>
          </li>
          <li>
            /<a href='http://localhost:3000/oldbook'>二手書</a>
          </li>
        </ul>
      </div>

      {/* <Oldbookad /> */}

      <div className='row'>
        <div className='col-2'>
          <OldbookAcc />
          <div className='leftad'>
            <i className='bi bi-bookmark' />
            <h5>指定書類優惠券</h5>
          </div>
          {/* <Oldbookcoupon /> */}
        </div>

        <div className='col-8'>
          <div className='rounded-2 shadow-sm '>
            <h3 className='month'>進階搜尋</h3>
            {/* <div className='recommend'>
              <div>
              書籍語言: 
              <div className='mylanguage' >
              <input type='radio' name='language' id='chinese'/>
              <label htmlFor='chinese'> 繁體中文()</label>
              </div>
               <div>
               <input type='radio' name='language' id='english' />
              <label htmlFor='english'>英文</label>
               </div>
              <input type='radio'name='language' id='othen'/>
              <label htmlFor='othen'>其他外文</label>
              </div>
            </div> */}
            <h2 className='obh2'>書營</h2>
            <div className='booklist row'>
              <div className='booklist row'>
                {oldbook.length > 0 ? (
                  oldbook.map((v) => {
                    if (v.book_status_id == 2) return null
                    return (
                      <div className='col-3' key={v.book_id}>
                        <div
                          className={`${styles.commodityCard} pixel-box--white m-1 my-2`}
                        >
                          <Link href={'/oldbook/' + v.book_id}>
                            <img
                              className={styles.commodityImg}
                              src={`http://localhost:3002/public/img/oldbookimgs/${v.book_img_id}`}
                            />
                          </Link>
                          <div className='mt-auto position-relative'>
                            {/* <CollectButton oldBookId={v.book_id} /> */}
                            <CollectBtn book_id={v.book_id} />
                            <h6 className='fw-bold px-2'>{v.b_title}</h6>
                            <div className={styles.priceArea}>
                              <div className='d-bg-purple text-yellow pixel-d-purple w-100 p-1'>
                                <i className='bi bi-coin mx-1'></i>
                                {v.book_price}元
                              </div>
                              <button
                                type='button'
                                className={styles.addButton}
                              >
                                <i className='fa-solid fa-plus'></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className={`mt-5 ${styles.cartEmptyDiv}`}>
                    <div className='imgBoxSize1'>
                      <img src='/img/dead.png' className='w-100' />
                    </div>
                    <div className='erbook'>
                      找不到您輸入的內容，重新搜尋看看？？
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className='col-2'>{/*  */}</div>
      </div>
    </>
  )
}
