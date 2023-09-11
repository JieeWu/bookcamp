import MainHeader from './main-header/header'
import MainNavbar from './main-header/navbar'
import MainNavbarV2 from './main-header/navbar-v2'
import MainFooter from './main-header/footer'
import FooterCopyright from './main-header/footer-copyright'
import FooterMemberCopyright from './main-header/footer-member-copyright'
import FooterCartCopyright from './main-header/footer-cart-copyright'
import PhoneBottomBtn from './phone-bottom-btn'
import { usePathname } from 'next/navigation'
import TopBtn from './top-btn'

export default function GlobalHeader({ children }) {
  const pageLocation = usePathname() || '/' // 假設動態路由沒取到值，塞'/'防止報錯

  return (
    <>
      <header className='sticky-top'>
        <MainHeader />
        {pageLocation.indexOf('cart') > 0 ||
        pageLocation.indexOf('login') > 0 ||
        pageLocation.indexOf('forget-password') > 0 ||
        pageLocation.indexOf('register') > 0 ? (
          ''
        ) : (
          <MainNavbarV2 />
        )}
      </header>
      <main>
        <div className='container-fluid'>{children}</div>
      </main>
      <TopBtn />
      <PhoneBottomBtn />
      {pageLocation.indexOf('login') > 0 ||
      pageLocation.indexOf('register') > 0 ? (
        <FooterCopyright />
      ) : pageLocation.indexOf('member') > 0 ? (
        <FooterMemberCopyright />
      ) : pageLocation.indexOf('cart') > 0 ? (
        <FooterCartCopyright />
      ) : (
        <MainFooter />
      )}
    </>
  )
}
