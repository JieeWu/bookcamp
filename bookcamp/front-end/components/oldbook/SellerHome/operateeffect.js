import React from 'react'

export default function Operateeffect() {
  return (
    <>
        <div className='overview'>
                <h3 className='operate'>廣告成效表</h3>
                <h6 className='operate'>您賣場的即時總體狀況概述</h6>
              </div>
              <div className='effect'>
                <div className='effectleft'>
                  <select className='selectad' defaultValue="廣告1">
                    <option value='廣告選擇'>
                      廣告選擇
                    </option>
                    <option value='廣告1'>廣告1</option>
                    <option value='廣告2'>廣告2</option>
                  </select>
                  <div className='effectbutton'>
                    <input
                      className='form-check-input'
                      type='radio'
                      id='radio1'
                      name='abc'
                      defaultValue='廣告次數'
                    />
                    <label htmlFor='radio1'>廣告次數</label>
                    <br />
                    <input
                      className='form-check-input'
                      type='radio'
                      id='radio2'
                      name='abc'
                      defaultValue='月份'
                    />
                    <label htmlFor='radio2'>月份</label>
                  </div>
                </div>
                <div className='adclick'>點擊數</div>
                <div>
                  {/* <img src="./img/Frame 210.png" alt="" width="400px" height="300px" /> */}
                </div>
              </div>
    </>
  )
}
