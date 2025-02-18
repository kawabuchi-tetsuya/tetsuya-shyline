FactoryBot.define do
  factory :post do
    user
    content { Faker::Lorem.sentence(word_count: 20) }
    status { :published }
  end
end
