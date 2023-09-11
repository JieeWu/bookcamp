import React from 'react';
import Swal from 'sweetalert2';
import styles from './bot.module.css';

function CouponComponent(props) {

  const handleUseCoupon = () => {

    
   
    Swal.fire({
        title: '優惠卷代碼',
        html: '<span style="font-size: 30px;">fast500</span>', // 使用自定義的 HTML 並設置字體大小
      });
  };

  return (
    <button 
      className={styles['learning-option-button']} 
      onClick={handleUseCoupon}
      target="_blank" 
      rel="noopener noreferrer"
    >
      獲得優惠卷代碼
    </button>
  );
}

export default CouponComponent;
