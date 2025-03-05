import { css } from '@emotion/react'

export const globalStyles = {
  html: css({
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  }),

  body: css({
    backgroundColor: 'f5f5f5',
    color: '#333',
  }),
}

export const styles = {
  pageMinHeight: css({
    // ヘッダーの高さ分引く
    minHeight: 'calc(100vh - 64px)',
  }),
}
