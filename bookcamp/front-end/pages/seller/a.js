import axios from 'axios'
import React, { useState } from 'react'

function UploadPage() {
  const [file, setFile] = useState(null)

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  const handleUpload = async () => {
    if (!file) {
      console.log('No file selected.')
      return
    }

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await axios.post(
        'http://localhost:3002/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      console.log('File uploaded successfully:', response.data)
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>上傳圖片</button>
    </div>
  )
}

export default UploadPage