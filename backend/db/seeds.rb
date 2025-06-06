USERS_COUNT = 10
TOTAL_POSTS_COUNT = 1000
POST_BATCH_SIZE = 1000
FAKER_RANDOM_NUM = 42
Faker::Config.random = Random.new(FAKER_RANDOM_NUM)

users = []
USERS_COUNT.times do |i|
  name = "user#{i + 1}_#{Faker::Internet.username(specifier: 5..10, separators: %w[_])}"
  nickname = "ユーザー#{i + 1}"
  email = "user#{i + 1}@example.com"
  uid = "user#{i + 1}@example.com"
  provider = 'email'
  password = 'p@ssw0rd'
  confirmed_at = Time.current

  users << User.new(name:, nickname:, email:, uid:, provider:, password:, confirmed_at:)
end

User.import users

sample_avatar_path = Rails.root.join('app/assets/images/sample-avatar.png')

User.find_each do |user|
  if user.id % 2 == 1
    user.avatar.attach(io: File.open(sample_avatar_path), filename: 'sample-avatar.png', content_type: 'image/png')
  end
end

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
