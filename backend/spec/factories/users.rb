FactoryBot.define do
  factory :user do
    sequence(:name) {|n| "user_#{n}_#{Faker::Internet.username(specifier: 5..10, separators: ['_'])}" }
    nickname { Faker::Name.name }
    email { Faker::Internet.unique.email }
    password { Faker::Internet.password(min_length: 8) }
    confirmed_at { Time.current }
  end
end
