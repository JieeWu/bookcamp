import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './post-page.module.css'
export default function AvatarData(props) {
  const avatarUrl = 'http://3.113.3.149:3002/img/member/'

  useEffect(() => {
    console.log(props.data)
  }, [])
  const avatar = props.data[props.id].avatar
  console.log('ccc', avatar)
  return (
    <>
      <div className={styles.discussTitle}>
        {/* 使用者頭像 */}
        <div className='d-flex col-xxl-10 col-12'>
          <div className={`${styles.landlordAvatar} boder-pixel-w`}>
            <img src={avatarUrl + `${avatar}`}></img>
          </div>
          <div className={`${styles.landlordInformation} pixel-border-purple`}>
            <div className={`${styles.landlord}`}>
              {props.id === 0 ? <span>原PO</span> : <span>回覆者</span>}
            </div>
            <span className={`mx-2 ${styles.Author}`}>
              發文者 : {props.data[props.id].client_name}
            </span>
            <div className={`ms-auto ${styles.landTime}`}>
              <i className='fa-regular fa-calendar me-2'></i>
              {props.data.length > 0 && props.data[0].forum_create_time ? (
                <span>{props.data[0].forum_create_time}</span>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
        <div className={`col-xxl-2 d-flex ${styles.postPageAdArea}`}>
          <div className={`${styles.floorOperation} w-100 me-1`}>
            <span>{props.id}層</span>
          </div>
          <button
            className={`${styles.floorOperationBtn} pixel-border-orange mx-3`}
          >
            <i className='fa-solid fa-turn-up font-l'></i>
          </button>
          <button className={`${styles.floorOperationBtn} pixel-border-orange`}>
            <i className='fa-solid fa-turn-down font-l'></i>
          </button>
        </div>
      </div>
      <style jsx>
        {`
          .post-data {
            width: 70px;
            height: 32px;
            border-radius: 15px;
            background: #512893;
          }
          .post-data2 {
            border-radius: 15px;
          }
          .wrapper {
            display: grid;
            grid-template-columns: 0.5fr 3fr 1.2fr;
          }
          .wrapper2 {
            display: grid;
            grid-template-columns: 0.8fr 1fr 2fr;
          }
          .avatar-img {
            border-radius: 50%;
            background: white;
          }
          .post-avatar {
            max-width: 70px;
            min-height: 70px;
            border-radius: 50%;
            background-size: cover;
          }
          .button4 {
            height: 70.153px;
            background: #9b6cff;
            /* #6b4cb3*/
            box-shadow:
              10px -10px 0 0 #9b6cff,
              0px -10px 0 0 #9b6cff,
              0px -15px 0 0 black,
              -5px -10px 0 0 black,
              15px 0px 0 0 #6b4cb3,
              15px -10px 0 0 #6b4cb3,
              20px -10px 0 0 black,
              15px -15px 0 0 black,
              0px 5px 0 0 #6b4cb3,
              -5px 5px 0 0 black,
              15px 5px 0 0 #6b4cb3,
              20px 5px 0 0 black,
              0px 10px 0 0 black,
              15px 10px 0 0 black;
          }
          .button {
            margin-right: 20px;
            min-width: 70px;

            background: var(--orange, #f90);
            box-shadow:
              5px 0px 0 0 #f90,
              6px -1px 0 0px #f90,
              -1px -1px 0 0 #f90,
              -5px 0px 0 0 #f90,
              0px 5px 0 0 #f90,
              6px 0px 0 0 #f90,
              1px 1px 0 0 #f90,
              0px -5px 0 0 #f90,
              5px -5px 0 0 #f90,
              -5px 5px 0 0 #f90,
              10px 5px 0 0 black,
              10px 0px 0 0 black,
              0px 10px 0 0 black,
              5px 10px 0 0 black;
          }
        `}
      </style>
    </>
  )
}
