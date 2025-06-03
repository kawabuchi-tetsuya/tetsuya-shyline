class UserSerializer < ActiveModel::Serializer
  attributes :name, :nickname, :avatar_url

  def avatar_url
    object.avatar_url
  end
end
