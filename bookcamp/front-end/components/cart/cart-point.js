import { useState, useRef } from 'react'
import Swal from 'sweetalert2'
import styles from './css/cart-point.module.css'
import CartPointStep from './cart-point-step'

export default function CartPoint(props) {
  //控制是否可以輸入
  const [inputNumberDiscount, setInputNumberDiscount] = useState(false)

  //控制選擇哪個radio才顯示點數
  const [selected, setSelected] = useState(false)
  const numberInputRef = useRef() // 用於聚焦 number input

  // 偵測輸入的input數值value
  const handleInputChange = (e) => {
    let value = e.target.value

    value = value.replace(/^0+|[^0-9]/g, '')

    const integerValue = parseInt(value, 10)

    if (isNaN(integerValue) || integerValue < 1) {
      Swal.fire('請選擇最少為1')
      value = 0
    } else if (integerValue > props.amountCoupon) {
      Swal.fire('不可折抵超過購買總價')
      value = props.point.toString()
    } else if (integerValue > props.point) {
      Swal.fire('您沒有這麼多點數')
      value = props.point.toString()
    } else {
      value = integerValue.toString()
    }

    props.setUsePoint(value)
  }
  // const handleInputChange = (e) => {
  //   let value = e.target.value

  //   const integerValue = parseInt(value, 10) // 將值轉換為整數
  //   if (isNaN(integerValue)) {
  //     value = '' // 如果輸入無效，設置為空
  //   } else {
  //     value = integerValue // 將整數轉換為字串
  //   }

  //   if (value < 1) {
  //     Swal.fire('請選擇最少為1')
  //     value = 0
  //   } else if (value > props.point) {
  //     Swal.fire('您沒有這麼多點數')
  //     value = props.point
  //   } else if (value > props.amountCoupon) {
  //     Swal.fire('不可折抵超過購買總價')
  //     value = props.amountCoupon
  //   }
  //   props.setUsePoint(value)
  // }

  // 選取的radio
  
  const radioChange = (e) => {
    let click = e.target.id
    if (click == 'all') {
      setInputNumberDiscount(true)
      props.setUsePoint(
        props.amountCoupon - props.point < 0 ? props.amountCoupon : props.point,
      )
      setSelected(false)
    } else if (click == 'part') {
      setInputNumberDiscount(false)
      setSelected(true)
      setTimeout(() => {
        numberInputRef.current.focus()
      }, 0)
    } else {
      setInputNumberDiscount(true)
      props.setUsePoint(0)
      setSelected(false)
    }
  }

  return (
    <>
      <div className='col-12 col-lg-6 ps-0 ps-lg-3 mt-4 mt-lg-0'>
        <div className={`${styles.point_bg} pixel-border-yellow`}>
          {/* 點數折抵標題 */}
          <h5 className='fw-bold pixel-font-chinese'>
            <i className='fa-solid fa-magnifying-glass-dollar me-2'></i>點數折抵
          </h5>
          {/* 點數內容 */}
          <div className='my-3'>
            <span>您的點數為</span>
            <label
              className={`pixel-font font-xl ${styles['point-label-color']}`}
            >
              {props.point > 0 ? props.point : 0}
            </label>
            <span>點，請選擇你需要使用的點數。</span>
          </div>

          {/* 折抵區塊 */}
          <div className='row flex-column'>
            <div className='col'>
              <CartPointStep
                id='all'
                name='全部折抵'
                radioChange={radioChange}
              />
            </div>
            <div className='col d-flex'>
              <CartPointStep
                id='part'
                name='部分折抵'
                radioChange={radioChange}
                // amount={props.amount}
                amount={props.amountCoupon}
                usePoint={props.usePoint}
                point={props.point}
                handleInputChange={handleInputChange}
                selected={selected}
                inputNumberDiscount={inputNumberDiscount}
                numberInputRef={numberInputRef}
              />
            </div>
            <div className='col'>
              <CartPointStep
                id='empty'
                name='不使用'
                radioChange={radioChange}
              />
            </div>
          </div>

          {/* 使用說明區塊 */}
          <div className={styles.instructions_use}>
            <h6 className='pixel-font-chinese p-3'>點數使用說明</h6>
            <ul className='px-3 pb-3'>
              <li className='mb-3'>
                1. 紅利點數的累積方式：
                您可以在每次購物時獲得紅利點數。每消費一定金額，您將獲得相應的紅利點數。您也可以通過參加促銷活動、分享產品、撰寫評論等方式獲得額外的紅利點數。
              </li>
              <li className='mb-3'>
                2. 紅利點數的轉讓和退換：
                紅利點數是您個人的，不能轉讓給其他人。此外，一旦您使用了紅利點數，我們將無法退換或退還您的紅利點數。
              </li>
              <li>
                3. 規則和條款的變更：
                我們保留根據需要隨時更改紅利點數計劃的規則和條款的權利。任何變更都將在我們的網站上公佈，請定期查看以確保您了解最新的紅利點數政策。
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
