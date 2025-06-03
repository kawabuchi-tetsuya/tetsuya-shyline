import { DirectUpload } from '@/activestorage'

export async function uploadFile(
  file: File,
  uploadUrl: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const upload = new DirectUpload(file, uploadUrl)

    type UploadBlob = {
      signed_id: string
      filename: string
    }

    upload.create((error, blob) => {
      if (error) {
        reject(error)
      } else if (blob) {
        const b = blob as UploadBlob
        resolve(`/rails/active_storage/blobs/${b.signed_id}/${b.filename}`)
      }
    })
  })
}
