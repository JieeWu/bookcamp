import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { RiMoneyDollarCircleLine } from 'react-icons/Ri'

export default function Oldbooklist() {
    const [oldbook, setOldbook] = useState([])
    

    useEffect(() => {
      const fechAlloldbook = async () => {
        try {
          const res = await axios.get('http://localhost:3002/oldbook')
          setOldbook(res.data.oldbook)
          console.log(res.data.oldbook)
        } catch (ex) {}
      }
      fechAlloldbook()
    }, [])

   

  return (
    <>
      <div className='oldbook' key={v.old_book_id}>
        <div>
          <img src='./img/a5h5kh6_460x580 1.png' alt='' />
        </div>
        <div>
          <p className='oldtitle'>
            <Link href={'/oldbook/' + v.old_book_id}>{v.old_book_title}</Link>
          </p>
          <div className='money'>
            <i className='bi bi-currency-dollar' />
            <RiMoneyDollarCircleLine /> {v.old_book_price}
            <button className='oldbookadd'>+</button>
          </div>
        </div>
      </div>
    </>
  )
}
