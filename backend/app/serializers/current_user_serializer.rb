class CurrentUserSerializer < ActiveModel::Serializer
  attributes :id, :name, :nickname, :email
end
