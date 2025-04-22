create_table 'active_storage_blobs', force: :cascade do |t|
  t.string   'key',          null: false
  t.string   'filename',     null: false
  t.string   'content_type'
  t.text     'metadata'
  t.string   'service_name', null: false
  t.bigint   'byte_size',    null: false
  t.string   'checksum'
  t.datetime 'created_at', null: false, precision: 6
  t.index %w[key], name: 'index_active_storage_blobs_on_key', unique: true
end

create_table 'active_storage_attachments', force: :cascade do |t|
  t.string     'name', null: false
  t.string     'record_type', null: false
  t.bigint     'record_id',   null: false
  t.bigint     'blob_id',     null: false
  t.datetime   'created_at',  null: false, precision: 6
  t.index %w[record_type record_id name blob_id], name: 'index_active_storage_attachments_uniqueness', unique: true
end

add_foreign_key 'active_storage_attachments', 'active_storage_blobs', column: 'blob_id'

create_table 'active_storage_variant_records', force: :cascade do |t|
  t.bigint 'blob_id',          null: false
  t.string 'variation_digest', null: false
  t.timestamps
  t.index %w[blob_id variation_digest], name: 'index_active_storage_variant_records_uniqueness', unique: true
end

add_foreign_key 'active_storage_variant_records', 'active_storage_blobs', column: 'blob_id'
