class Api::V1::BaseController < ApplicationController
  def current_user
    respond_to?(:current_api_v1_user) ? current_api_v1_user : nil
  end

  def authenticate_user!
    respond_to?(:authenticate_api_v1_user!) ? authenticate_api_v1_user! : head(:unauthorized)
  end

  def user_signed_in?
    respond_to?(:api_v1_user_signed_in?) ? api_v1_user_signed_in? : false
  end
end
