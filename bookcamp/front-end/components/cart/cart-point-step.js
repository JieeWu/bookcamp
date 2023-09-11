export default function CartPointStep({
  amount,
  point,
  usePoint,
  selected,
  radioChange,
  handleInputChange,
  inputNumberDiscount,
  numberInputRef,
  handleInputBlur,
  name,
  id,
}) {


  const handlePaste = (event) => {
    // 阻止複製貼上
    event.preventDefault();
  };
  return (
    <>
      <div className='input-radio-div mb-2 fw-bold'>
        <input type='radio' name='point-group' onChange={radioChange} id={id} />
        <label className='input-radio-label' htmlFor={id}>
          {name}
        </label>
        {id == 'part' ? (
          <input
            type='number'
            className='input-box-all'
            value={selected ? (amount - usePoint < 0 ? amount : usePoint) : ''}
            min='1'
            maxLength={3}
            onChange={handleInputChange}
            disabled={inputNumberDiscount}
            ref={numberInputRef}
            onPaste={handlePaste}
          />
        ) : (
          ''
        )}
      </div>

      <style jsx>
        {`

   {/* 關閉type=Number的選擇 */}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
input[type="number"]::-ms-clear {
  display: none;
}

{/* 樣式 */}
          .input-box-all {
            margin-left: 10px;
            width: 150px;
            height: 30px;
          }

          .input-box-all-btn {
            height: 30px;
            font-size: 15px;
          }
        `}
      </style>
    </>
  )
}
