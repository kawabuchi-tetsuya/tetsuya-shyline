class Api::V1::PostsController < Api::V1::BaseController
  def index
    posts = Post.published.order(updated_at: :desc, id: :desc).eager_load(:user)
    render json: posts
  end

  def show
    post = Post.published.find(params[:id])
    render json: post
  end
end
