import { useState } from 'react'

export default function Put(props) {
  const manage = ['全部商品', '上架的商品', '下架的商品',]

  const [commodity, setCommodity] = useState('全部商品');

  const commodityChange = (newCommodity) => {
    setCommodity(newCommodity);
    props.setFilterCondition(newCommodity);
  }

  return (
    <>
      <ul className='Management nav nav-tab'>
      {manage.map((v)=>{
        return (
            <li key={v}>
         <button  onClick={()=>{commodityChange(v)}}
         className={commodity === v ? 'operatemenu' : ''}>{v}</button>
        </li>

        )
      })}
      </ul>
    </>
  )
}