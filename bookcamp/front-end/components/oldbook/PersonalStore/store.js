import React from 'react'
import { AiOutlineUser  } from 'react-icons/ai';
import { BsFillBookFill } from 'react-icons/bs';
import { AiFillMessage  } from 'react-icons/ai';
import { AiFillCarryOut  }from 'react-icons/ai';



export default function Store(props) {
  const {client,bookData,oldbookCount} =props
  
  return (
    <>
     <div className="Personal">
        {/*圖片*/}
        <div className="image-container">
          <img src="" alt="" />
        </div>
        <div className="opened">賣家資格開通日期:{client[0]?.join_date}</div>
        {/*簡介 */}
        <div className="man">
        <h3>{client[0]?.client_name}</h3>
            <div>@hruuuuuu_</div>
            <div>已驗證</div>
        <div className="opened1">賣家資格開通日期:{client[0]?.join_date}</div>

            
          </div>
     
        {/*關於*/}
        <div className="about">
          <div className="aboutcontent">
            <div>
            <AiOutlineUser />
              關注人數:
            </div>
            <div>
          <BsFillBookFill />
              商品:{oldbookCount}
            </div>
            <div>
              <AiFillCarryOut />
              已賣出的商品:
            </div>
            <div>
              <AiFillMessage />
              回覆率:
            </div>
          </div>
        </div>
        <div className="buttons">
          <a className="sellerbutton" href="">
            關注賣家
          </a>
          <a className="sellerbutton2" href="">
            私訊賣家
          </a>
        </div>
      </div>
    
        
    </>
   
  )
}
