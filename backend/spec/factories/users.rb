FactoryBot.define do
  factory :user do
    name { 'user_1' }
    screen_name { 'ユーザー1' }
    email { 'user_1@example.com' }
    password { 'p@ssw0rd' }
    password_confirmation { 'p@ssw0rd' }
  end
end
