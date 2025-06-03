class Api::V1::Current::User::AvatarsController < Api::V1::BaseController
  before_action :authenticate_user!

  def update
    if params[:avatar].present?
      current_user.avatar.purge if current_user.avatar.attached?
      current_user.avatar.attach(params[:avatar])

      render json: current_user, serializer: CurrentUserSerializer, status: :ok
    else
      render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
