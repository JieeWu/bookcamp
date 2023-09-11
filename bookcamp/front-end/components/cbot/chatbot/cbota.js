import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2'
import { useCollect } from '@/hooks/collectContext';
import styles from './bot.module.css'

function LinkComponent(props) {
  const { collect, setCollect } = useCollect();

  const handleDeleteAllCollects = async () => {
    if (collect.length === 0) {
      Swal.fire('錯誤', '您沒有任何收藏！', 'error')
      return; // 退出函數，不進行任何其他操作
    }
    try {
      const response = await axios.delete('http://localhost:3002/collect/Alloldcollect', {
        withCredentials: true
      });

      if (response.status === 200) {
        Swal.fire('成功', '已取消所有收藏！', 'success').then(() => {
          setCollect([]); // 清空所有收藏
        });
      } else {
        alert('錯誤: ' + response.data.message);
      }
    } catch (error) {
      console.error('API 請求失敗:', error);
      alert('API 請求失敗');
    }
  };

  return <button className={styles['learning-option-button']} onClick={handleDeleteAllCollects} target="_blank" rel="noopener noreferrer">刪除所有收藏</button>;
}

export default LinkComponent;
