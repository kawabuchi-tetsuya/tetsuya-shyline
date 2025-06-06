import { Box, FormHelperText, Input, TextField } from '@mui/material'
import { Controller, Control } from 'react-hook-form'
import { PostFormData } from '@/types/postFormData'
import { useImageValidation } from '@/hooks/useImageValidation'
import { usePostImagePreview } from '@/hooks/usePostImagePreview'
import { useState } from 'react'

type Props = {
  control: Control<PostFormData>
  contentLength: number
}

const PostForm = ({ control, contentLength }: Props) => {
  const { validateImages, errorMessage } = useImageValidation()
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const previewUrls = usePostImagePreview(selectedFiles)

  return (
    <Box>
      <Controller
        name="content"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            type="textarea"
            error={fieldState.invalid || contentLength > 140}
            helperText={
              contentLength > 140
                ? '140文字以内で入力してください'
                : fieldState.error?.message
            }
            multiline
            fullWidth
            placeholder="本文"
            rows={20}
            sx={{ backgroundColor: 'white', borderRadius: 2 }}
          />
        )}
      />
      <Controller
        name="images"
        control={control}
        render={({ field, fieldState }) => (
          <Box mt={2}>
            <Input
              name="images"
              type="file"
              inputProps={{ multiple: true }}
              onChange={(e) => {
                const target = e.target as HTMLInputElement
                const files = target.files ? Array.from(target.files) : []
                const validFiles = validateImages(files) ?? []
                setSelectedFiles(validFiles)
                field.onChange(validFiles)
              }}
            />
            {(fieldState.error?.message || errorMessage) && (
              <FormHelperText error>
                {fieldState.error?.message || errorMessage}
              </FormHelperText>
            )}
            <Box mt={2} display="flex" flexWrap="wrap" gap={2}>
              {previewUrls.map((url, index) => (
                <Box
                  key={index}
                  component="img"
                  src={url}
                  alt={`preview-${index}`}
                  width={100}
                  height={100}
                  sx={{ objectFit: 'cover', borderRadius: 2 }}
                />
              ))}
            </Box>
          </Box>
        )}
      />
    </Box>
  )
}

export default PostForm
