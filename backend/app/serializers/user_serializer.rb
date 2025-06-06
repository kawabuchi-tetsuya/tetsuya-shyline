class UserSerializer < ActiveModel::Serializer
  attributes :name, :nickname, :avatar_url

  def avatar_url
    if object.avatar.attached?
      Rails.application.routes.default_url_options[:host] ||= 'http://localhost:3000'
      Rails.application.routes.url_helpers.url_for(
        object.avatar.variant(:thumb),
      )
    else
      nil
    end
  end
end
