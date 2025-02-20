USERS_COUNT = 2
TOTAL_POSTS_COUNT = 30
POST_BATCH_SIZE = 1000

users = []
USERS_COUNT.times do |i|
  name = "ユーザー#{i + 1}"
  uid = "user#{i + 1}"
  email = "user#{i + 1}@example.com"
  password = 'p@ssw0rd'
  confirmed_at = Time.current

  users << User.new(name:, uid:, email:, password:, confirmed_at:)
end

User.import users

posts = []
TOTAL_POSTS_COUNT.times do |i|
  user_id = i % USERS_COUNT + 1
  content = Faker::Lorem.sentence(word_count: 20)
  status = 'published'

  posts << Post.new(user_id:, content:, status:)

  if posts.size >= POST_BATCH_SIZE
    Post.import(posts)
    posts.clear
  end
end

Post.import(posts) unless posts.empty?
