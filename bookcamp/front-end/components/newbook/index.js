import styles from '@/components/newbook/newbook-grid.module.css'
import AsideLeft from '@/components/newbook/newproduct/aside-left'
import Carousel from '@/components/newbook/newproduct/dms'

export default function NewbookHome() {
  return (
    <>
      <div className={`${styles.allbody}`}>
        <div className={`${styles.navgrone}`}></div>
        <div className={`${styles.dms}`}>
          <Carousel />
        </div>
        <div className={`${styles.asideleft}`}>
          <div className={`${styles.asideleft1}`}>
            <AsideLeft />
          </div>
          <div className={`${styles.asideleft2}`}></div>
        </div>
        <div className={`${styles.mainbody}`}>
          <div className={`${styles.ranking}`}>排行榜</div>
          <div className={`${styles.focusbook}`}>焦點書籍</div>
          <div className={`${styles.newbook}`}>近期好書</div>
        </div>
        <div className={`${styles.asideright}`}></div>
      </div>
    </>
  )
}
