import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthJWT } from '@/hooks/use-auth-jwt';
import Swal from 'sweetalert2';

export default function Home() {
  const { authJWT, setAuthJWT } = useAuthJWT();
  const [signedDate, setSignedDate] = useState(null);
  const [signedDatesList, setSignedDatesList] = useState([]);

  const SIGN_API = 'http://localhost:3002/member/sign';

  useEffect(() => {
    const fetchSignedDates = async () => {
      try {
        const response = await axios.get(`${SIGN_API}/${authJWT.userData.client_id}`);
        setSignedDatesList(response.data.signedDates);
      } catch (error) {
        console.error('發生錯誤', error);
      }
    }

    fetchSignedDates();
  }, [authJWT]);

  const currentDate = new Date();
  const netxMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  );
  const daysInMonth = netxMonth.getDate();

  const startDay = 1;
  const daysPerWeek = 7;
  const calendarDays = [];

  const getDayStatus = (date) => {
    const dateString = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      date,
    ).toISOString();

    if (signedDatesList.includes(dateString)) {
      return 'signed';
    } else if (date >= currentDate.getDate()) {
      return 'future';
    } else {
      return 'expired';
    }
  };

  const handleSignIn = async () => {
    try {
      setSignedDate(currentDate.getDate());

      const response = await axios.post(`${SIGN_API}/${authJWT.userData.client_id}`);
      // 更新點數
      const updatedPoints = authJWT.userData.client_point + 10

      // 更新點數到後端
      const updatePointsResponse = await axios.put(
        `${SIGN_API}/${authJWT.userData.client_id}`,
        {
          client_point: updatedPoints,
        },
      )

      // 更新成功后更新點數狀態
      if (updatePointsResponse.data.message === 'success') {
        setAuthJWT({
          ...authJWT,
          userData: {
            ...authJWT.userData,
            client_point: updatedPoints,
          },
        })
      }

      Swal.fire({
        title: response.data.message,
        icon: 'success',
      });

      const newSignedDate = currentDate.toISOString();
      setSignedDatesList([...signedDatesList, newSignedDate]);
    } catch (error) {
      Swal.fire({
        title: '發生錯誤',
        icon: 'error',
      });
    }
  };

  for (let i = 1; i <= daysInMonth; i++) {
    let dayStatus = getDayStatus(i);
    let currentDayOfWeek = (i + startDay - 1) % daysPerWeek;

    calendarDays.push(
      <div
        key={i}
        className={`day ${dayStatus}`} // 使用原來的 CSS 樣式
        style={{ gridColumn: currentDayOfWeek + 1 }}
      >
        {i}
      </div>,
    );
  }

  return (
    <div className='d-flex flex-column'>
      <div className='calendar'>{calendarDays}</div>
      <div className='d-flex align-items-center mx-3 mt-3'>
        <button
          className='day-check-dtn main-btn pixel-border-yellow' // 使用原來的 CSS 樣式
          onClick={handleSignIn}
        >
          每日簽到 !<i className='fa-regular fa-circle-check ms-2'></i>
        </button>
        <span className='mx-3 font-sm text-nowrap'>
          每日簽到即可獲得10點<i className='fa-solid fa-sack-dollar mx-2'></i>
          紅利點數~
        </span>
      </div>
    </div>
  );
}
