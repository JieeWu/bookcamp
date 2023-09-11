import React, { useEffect, useState, useContext } from 'react'
import FrontTitle from '@/components/share/front-title'
import FilterNav from '@/components/share/filter-nav'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import styles from '@/styles/oldbook/odbk-page.module.css'
import CollectButton from '@/components/oldbook/CollectButton'
import CollectBtn from '@/components/oldbook/collectBtn'
import PageInation from '@/components/share/pageination'
import Swal from 'sweetalert2'
import { CartContext } from '@/hooks/cartContext';
import { useAuthJWT } from '@/hooks/use-auth-jwt'

export default function AllNewBook() {
  const router = useRouter();
  const [oldbook, setOldbook] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const { b_genre_id, book_language, query } = router.query;

   // 使用會員
   const { authJWT } = useAuthJWT()

   //確保每次點擊分類都會出現在第一頁
  useEffect(() => {
    setCurrentPage(1);
}, [b_genre_id, book_language]);


  // 加入購物車按鈕
  const handleAddCart = (e) => {
    try {
      axios
        .post('http://localhost:3002/share/addcart/add', e, {
          withCredentials: true,
        })
        .then((res) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '加入購物車',
            timer: 1500,
          });
          setCartItem(res.data.newcart);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
// 請先加入會員
const handleAlert = (e) => {
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: '請先登入',
    confirmButtonText: '前往',
    cancelButtonText: '取消',
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      router.push('/member/login')
    }
  })
}


  // 購物車狀態
  const { setCartItem } = CartContext()

  //價錢
  const fetchSortedBooks = async (order ='', page = currentPage) => {
    try {
      const res = await axios.get(`http://localhost:3002/price/books`, {
        params: { sortOrder: order, page: page },
      });
      setOldbook(res.data.books);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error('Error:', error);
    }
  };

    //最新按鈕
    const fetchBooksByDate = async (page = currentPage) => {
      try {
        const res = await axios.get("http://localhost:3002/bookdate", {
          params: { page: page },
        });
        setOldbook(res.data.activity);
         setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error('Error:', error);
      }
    };

  useEffect(() => {
    const fetchBooks = async () => {
      let endpoint; 
      // 根據不同的路由參數來設定endpoint
      if (query && router.isReady) {
        endpoint = `http://localhost:3002/hotsearch?page=${currentPage}`;
      } else if (b_genre_id) {
        endpoint = `http://localhost:3002/obgenre/${b_genre_id}?page=${currentPage}`;
      } else if (book_language) {
        endpoint = `http://localhost:3002/obgenre/language/${book_language}?page=${currentPage}`;
      } else {
        endpoint = `http://localhost:3002/perpage?page=${currentPage}`;
      }

      try {
        const params = query && router.isReady ? { term: query } : {};
        const res = await axios.get(endpoint, { params });

        if (b_genre_id || book_language || (query && router.isReady)) {
          setOldbook(res.data.oldbook || res.data);
        } else {
          setOldbook(res.data.data);
        }
        setTotalPages(res.data.totalPages);
      } catch (ex) {
        console.error('Error fetching books:', ex);
      }
    };
    
    fetchBooks();

    if (sortOrder) {
      fetchSortedBooks(sortOrder, currentPage);
    }
   
  }, [b_genre_id, book_language, query, router.isReady, currentPage, sortOrder]);

  
  // useEffect(() => {
  //   console.log("useEffect triggered", query, router.isReady);
  //   if (query && router.isReady) {
  //     handleSearch(query);
  //   }
  // }, [query, router.isReady]);



  // 搜尋
  const handleSearch = async (searchTerm) => {
    console.log("handleSearch called with:", searchTerm);
    try {
      const response = await axios.get('http://localhost:3002/hotsearch', {
        params: { term: searchTerm },
      });
      setOldbook(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // const sortedBooks = [...oldbook];
  // if (sortOrder === 'asc') {
  //   sortedBooks.sort((a, b) => a.book_price - b.book_price);
  // } else if (sortOrder === 'desc') {
  //   sortedBooks.sort((a, b) => b.book_price - a.book_price);
  // }

  //用於更新分頁
  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }
  
  
  

  return (
    <>
      <div className='newbook-top'>
        <FrontTitle icon='fa-solid fa-book-bookmark me-2' title='書類名稱' />
        <div className='mt-4 px-4'>
        <FilterNav
        fetchBooksByDate={fetchBooksByDate}
          setSortOrder={(order) => {
            setSortOrder(order);
            fetchSortedBooks(order, currentPage);
          }}
          sortOrder={sortOrder}
        />
          <div className='row px-2'>
            {oldbook && oldbook.length > 0 ? (
              oldbook.map((v) => {
                if (v.book_status_id == 2) return null
                return (
                  <div className='col-2' key={v.book_id}>
                    <div
                      className={`${styles.commodityCard} pixel-box--white m-1 my-2`}
                    >
                      <Link href={'/newbook/' + v.book_id}>
                        <img
                          className={styles.commodityImg}
                          src={`http://localhost:3002/public/img/oldbookimgs/${v.book_img_id}`}
                        />
                      </Link>
                      <div className='mt-auto position-relative'>
                        {/* <CollectButton oldBookId={v.book_id} /> */}
                        <CollectBtn book_id={v.book_id}/>
                        <h6 className='fw-bold px-2 '>{v.b_title}</h6>
                        <div className={styles.priceArea}>
                          <div className='d-bg-purple text-yellow pixel-d-purple w-100 p-1'>
                            <i className='bi bi-coin mx-1'></i>
                            <i className='fa-solid fa-circle-dollar-to-slot me-2'></i>
                            {v.book_price}元
                          </div>
                          <button
                            type='button'
                            className={styles.addButton}
                            onClick={(e) => { authJWT.isAuth !== false ? handleAddCart(v) : handleAlert(e) }}
                          >
                            <i className='fa-solid fa-cart-plus'></i>
                          </button>
                          {/* <button type='button' className={styles.addButton}>
                            <i className='fa-solid fa-plus'></i>
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className={`mt-1 ${styles.booknull}`}>
                <div className={styles.imgBoxSize1}>
                  <img src='/img/dead.png'/>
                </div>
                <div className={styles.erbook}>
                  找不到您輸入的內容，重新搜尋看看？？
                </div>
              </div>
            )}
          </div>
          <PageInation
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  )
}
