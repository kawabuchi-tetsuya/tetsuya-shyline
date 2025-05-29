class Api::V1::Current::User::AvatarsController < Api::V1::BaseController
  before_action :authenticate_user!

  def update
    if params[:avatar].present?
      current_user.avatar.attach(params[:avatar])
      current_user.publish_avatar! if current_user.respond_to?(:publish_avatar!)

      render json: { avatar_url: current_user.avatar_url }, status: :ok
    else
      render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
