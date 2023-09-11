import React from 'react'

export default function RenderDatabaseContent({ htmlContent }) {
  return (
    <>
      <div
        className='inner'
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      <style jsx>
      {`
      `}</style>
    </>
  )
}
