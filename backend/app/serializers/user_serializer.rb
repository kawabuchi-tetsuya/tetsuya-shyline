class UserSerializer < ActiveModel::Serializer
  attributes :name
  has_many :for_order_posts, serializer: PostSerializer
end
