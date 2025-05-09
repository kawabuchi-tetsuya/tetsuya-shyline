create_table :users,
              force: :cascade,
              charset: 'utf8mb4',
              collation: 'utf8mb4_bin',
              options: 'ENGINE=InnoDB ROW_FORMAT=DYNAMIC' do |t|
  ## Required
  t.string :provider, null: false, default: 'email'
  t.string :uid, null: false, default: ""

  ## Database authenticatable
  t.string :encrypted_password, null: false, default: ""

  ## Recoverable
  t.string :reset_password_token
  t.datetime :reset_password_sent_at
  t.boolean :allow_password_change, null: false, default: false

  ## Rememberable
  t.datetime :remember_created_at

  ## Confirmable
  t.string :confirmation_token
  t.datetime :confirmed_at
  t.datetime :confirmation_sent_at
  t.string :unconfirmed_email # Only if using reconfirmable
  t.datetime :last_confirmation_sent_at

  ## Lockable
  # t.integer :failed_attempts, default: 0, null: false # Only if lock strategy is :failed_attempts
  # t.string :unlock_token # Only if unlock strategy is :email or :both
  # t.datetime :locked_at

  ## User Info
  t.string :name, null: false
  t.string :nickname, null: false
  t.string :image
  t.string :email, null: false

  ## Tokens
  t.text :tokens

  t.timestamps
end

add_index :users, :email, unique: true
add_index :users, %i[uid provider], unique: true
add_index :users, :name, unique: true
add_index :users, :nickname
add_index :users, :reset_password_token, unique: true
add_index :users, :confirmation_token, unique: true
