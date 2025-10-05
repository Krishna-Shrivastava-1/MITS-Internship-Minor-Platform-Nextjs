'use client'
import React, { useState } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

const PdfUploader = () => {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [url, setUrl] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a PDF first')
      return
    }

    setUploading(true)

    const filePath = `pdfs/${Date.now()}_${file.name}`

    const { data, error } = await supabase.storage
      .from('offerletters') //  bucket name
      .upload(filePath, file)

    setUploading(false)

    if (error) {
      console.error(error)
      toast.error('Upload failed')
      return
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('offerletters')
      .getPublicUrl(filePath)

    setUrl(publicUrlData.publicUrl)
    toast.success('File uploaded successfully!')
  }

  return (
    <div className="p-4 border rounded-md max-w-md mx-auto mt-10">
      <h2 className="text-lg font-bold mb-4">Upload PDF (Supabase)</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-600 text-white px-4 py-2 mt-4 rounded disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>

      {url && (
        <div className="mt-4">
          <p>✅ Uploaded File URL:</p>
          <a href={url} target="_blank" className="text-blue-600 underline">
            {url}
          </a>
        </div>
      )}
    </div>
  )
}

export default PdfUploader
