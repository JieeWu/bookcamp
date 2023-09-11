import React from 'react'

export default function DetailBtn(props) {
  return (
    <>
      {/* 詳細了解按鈕 */}
      <button
        type='button'
        className='text-white font-sm'
        data-bs-toggle='modal'
        data-bs-target='#adModal'
      >
        <i className={props.DetailIcon}></i>
        {props.DetailName}
      </button>
      {/* Modal */}
      <div
        className='modal fade'
        id='adModal'
        tabIndex={-1}
        aria-labelledby='adModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered text-black'>
          <div className='yellow-alert pixel-border-yellow'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5 fw-bold' id='adModalLabel'>
                {props.TextTitle}
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              />
            </div>
            <div className='modal-body'>{props.Text}</div>
          </div>
        </div>
      </div>
    </>
  )
}
