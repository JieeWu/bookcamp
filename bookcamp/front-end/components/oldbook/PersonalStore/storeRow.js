import React from 'react'

export default function StoreRow() {
  return (
    <div className="productsorting">
    <div className="productsorting1">
      商品排序
      <select className="select1">
        <option value="價格低到高">價格低到高</option>
        <option value="價格高到低">價格高到低</option>
        <option value="上架日期">上架日期</option>
      </select>
    </div>
  </div>
  )
}
