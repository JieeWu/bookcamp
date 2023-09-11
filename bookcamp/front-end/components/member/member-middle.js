import DetailBtn from '@/components/share/detail-btn'

export default function MemberMiddle(props) {
  return (
    <>
      <div className='col-12'>
        <div className='m-bg-purple boder-pixel'>
          {/* 卡片上部分 */}
          <div className='card-board-top c-bg-purple justify-content-between'>
            <div className='member-titles'>
              <h5 className='ms-2 pixel-font-chinese'>
                <i className={props.TitleIcon}></i>
                {props.TitleName}
              </h5>
              <span className='d-none d-md-block font-s ms-2'>
                {props.Remark}
              </span>
            </div>
            {props.status ? (
              <DetailBtn
                DetailIcon={props.DetailIcon}
                DetailName={props.DetailName}
                TextTitle={props.TextTitle}
                Text={props.Text}
              />
            ) : (
              ''
            )}
          </div>

          <div className='card-board-body'>{props.children}</div>
        </div>
      </div>
    </>
  )
}
