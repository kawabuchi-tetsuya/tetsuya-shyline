class UserSerializer < ActiveModel::Serializer
  attributes :name, :nickname, :avatar_url
end
