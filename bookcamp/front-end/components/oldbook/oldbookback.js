import React from 'react'
export default function oldbookback(props) {
  const {
    oldbook,
    client,
    usageduration,
    bookgenre,
    booktype,
    bookstatus,
    handleDelete,
  } = props

  return (
  
    <>
      {oldbook.map((v) => {
        return (
          <tr key={v}>
            <td>{v.old_book_id}</td>
            <td>{client[v.client_id - 1]?.client_name}</td>
            <td>
              <img src='{v.old_book_img_url}' alt=''></img>
            </td>
            <td>{v.old_book_title}</td>
            <td>{v.old_book_price}</td>
            <td>{v.old_book_count}</td>
            <td>
              {usageduration[v.book_language - 1]?.usage_duration_name}
            </td>
            <td>{bookgenre[v.b_genre_id - 1]?.b_genre_name}</td>
            <td>{booktype[v.b_type_id - 1]?.book_type_name}</td>
            <td>{bookstatus[v.book_status_id - 1]?.book_status_name}</td>
            <td>{v.sherlf_date}</td>
            <td>{v.revise_date}</td>
            <td>
              <button onClick={() => handleDelete(v.old_book_id)}>刪除</button>
            </td>
          </tr>
        )
      })}
    </>
  )
}
