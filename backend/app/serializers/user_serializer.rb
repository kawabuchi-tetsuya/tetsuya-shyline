class UserSerializer < ActiveModel::Serializer
  attributes :name, :nickname
  has_many :for_order_posts, serializer: PostSerializer
end
