export const validationRules = {
  email: {
    required: 'メールアドレスを入力してください。',
    pattern: {
      value:
        /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
      message: '正しい形式のメールアドレスを入力してください。',
    },
  },
  password: {
    required: 'パスワードを入力してください。',
    minLength: {
      value: 6,
      message: '6文字以上入力してください。',
    },
    maxLength: {
      value: 128,
      message: '128文字以内で入力してください。',
    },
  },
  name: {
    required: 'user_nameを入力してください。',
    pattern: {
      value: /^[a-zA-Z0-9_]+$/,
      message: '半角英数字およびアンダースコア(_)が使用できます。',
    },
    maxLength: {
      value: 30,
      message: '30文字以内で入力してください。',
    },
  },
  nickname: {
    required: 'ユーザー名を入力してください。',
    maxLength: {
      value: 30,
      message: '30文字以内で入力してください。',
    },
  },
}
