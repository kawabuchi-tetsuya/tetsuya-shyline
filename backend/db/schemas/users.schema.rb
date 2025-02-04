create_table :users,
              force: :cascade,
              charset: 'utf8mb4',
              collation: 'utf8mb4_bin',
              options: 'ENGINE=InnoDB ROW_FORMAT=DYNAMIC' do |t|
  t.string :name,
            null: false,
            default: '',
            comment: 'ユーザー名'
  t.string :screen_name,
            null: false,
            default: '',
            comment: 'ユーザー表示名'
  t.string :email,
            null: false,
            default: '',
            comment: 'メールアドレス'
  t.string :password_digest,
            null: false,
            comment: 'パスワードのハッシュ値'
  t.timestamps

  add_index :users, %i[name], unique: true
  add_index :users, %i[screen_name]
  add_index :users, %i[email], unique: true
end
