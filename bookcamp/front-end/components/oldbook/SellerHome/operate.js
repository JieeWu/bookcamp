import React from 'react'

export default function Operate() {
  return (
    <>
        <div>
                <div className='overview'>
                  <h2 className='operate'>營運概況</h2>
                  <h6 className='operate'>您賣場的即時總體狀況概述</h6>
                </div>
                <div className='operatemenu1'>
                  <div className='operatemenu2'>
                    <div className='operatemenuyellow'>
                      商品總數量 <div>0</div>
                    </div>
                    <div className='operatemenured'>
                      待付款訂單 <div>0</div>
                    </div>
                    <div className='operatemenuyellow'>
                      待出貨訂單 <div>0</div>
                    </div>
                    <div className='operatemenured'>
                      待取消訂單 <div>0</div>
                    </div>
                    <div className='operatemenured'>
                      我的評價 <div>0</div>
                    </div>
                    <div className='operatemenuyellow'>
                      已付款訂單<div>0</div>
                    </div>
                    <div className='operatemenured'>
                      已出貨訂單 <div>0</div>
                    </div>
                    <div className='operatemenuyellow'>
                      待退款訂單 <div>0</div>
                    </div>
                  </div>
                </div>
              </div>
    </>
  )
}
