import { Box, TextField } from '@mui/material'
import { Controller, Control } from 'react-hook-form'
import { PostFormData } from '@/types/postFormData'

type Props = {
  control: Control<PostFormData>
  contentLength: number
}

const PostForm = ({ control, contentLength }: Props) => {
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
    </Box>
  )
}

export default PostForm
