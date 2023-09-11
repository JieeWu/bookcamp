;<div
  className='forum-post-content w-100 test-bg'
  style={{
    gridTemplateColumns: hidden ? '95% 5%' : '5% 95%',
    background: hidden
      ? `linear-gradient(-45deg, transparent 10px, white 0) right,
         linear-gradient(45deg, transparent 10px, white 0) left`
      : `linear-gradient(-45deg, transparent 10px, #0D0733 0) right,
         linear-gradient(45deg, transparent 10px, #0D0733 0) left`,
  }}
>
  {/* 一 */}
  <button
    className='forum-post-content-reply'
    onClick={changePostReply}
    style={{
      display: hidden ? 'none' : 'block',
      background: hidden ? 'black' : 'white',
      color: hidden ? 'white' : 'black',
    }}
  >
    文章
  </button>
  {/* 二 */}
  <div
    className='forum-post-content-text'
    style={{ display: hidden ? 'block' : 'none' }}
  >
    {props.data.length > 0 && props.data[0].forum_content != '' ? (
      <RenderDatabaseContent htmlContent={props.data[props.id].forum_content} />
    ) : (
      '123'
    )}
  </div>
  <div
    className='forum-post-content-text h-75'
    style={{ display: hidden ? 'none' : 'block' }}
  >
    {message.length > 0 && message != ''
      ? message.map((v, i) => {
          return (
            <>
              <div key={i}>
                {v.id === props.id + 1 ? (
                  <>
                    <div className='message-bg mb-2 d-flex align-items-center justify-content-between'>
                      <div className='avatar-img  h-100 d-flex align-items-center justify-content-center'>
                        <img
                          className='post-avatar'
                          src={avatarUrl + `${message[i].avatar}`}
                        ></img>
                      </div>
                      <div className='message-avatar'>{v.client_id}</div>

                      {v.forum_content}

                      <div>{v.forum_create_time}</div>
                    </div>
                  </>
                ) : (
                  ''
                )}
              </div>
            </>
          )
        })
      : ''}
    {/* 四 */}
    <div className='reply-bg mb-2 w-75'>
      <div className='mb-2 d-flex align-items-center justify-content-center'>
        <div className='avatar-img  h-100 d-flex align-items-center justify-content-center'>
          <img
            className='post-avatar'
            src={avatarUrl + `${authJWT.userData.avatar}`}
          ></img>
        </div>
        <div className='w-100 '>
          {/* 留言輸入的地方 */}
          <input
            className='h-100 w-100'
            id={props.id + 1}
            onChange={getMessage}
          ></input>
        </div>
        <div>
          <button className='btn btn-primary' onClick={submitMessage}>
            送出
          </button>
        </div>
      </div>
    </div>
  </div>
  {/* 三 */}
  <button
    className='forum-post-content-reply'
    style={{
      display: hidden ? 'block' : 'none',
      background: hidden ? 'black' : 'white',
      color: hidden ? 'white' : 'black',
    }}
    onClick={changePostReply}
  >
    留言
  </button>
</div>
