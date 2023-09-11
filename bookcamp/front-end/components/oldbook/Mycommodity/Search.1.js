import React from 'react'

export default function Search() {
  return (
    <>
      <div className='input-container'>
        <input
          type='text'
          placeholder='關鍵字搜尋訂單'
          style={{ paddingLeft: 20 }}
        />
        <button>搜尋</button>
      </div>
    </>
  )
}
