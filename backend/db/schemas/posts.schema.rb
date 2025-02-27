create_table :posts,
              force: :cascade,
              charset: 'utf8mb4',
              collation: 'utf8mb4_bin',
              comment: '投稿',
              options: 'ENGINE=InnoDB ROW_FORMAT=DYNAMIC' do |t|
  t.references :user,
                null: false,
                foreign_key: true,
                comment: '投稿者ID'
  t.text :content,
          comment: '投稿本文'
  t.integer :status,
             null: false,
             comment: 'ステータス(10:未保存, 20:下書き, 30:公開中)'
  t.timestamps

  add_index :posts, :content, type: :fulltext
  add_index :posts, :status
  add_index :posts, %i[created_at id]
end
