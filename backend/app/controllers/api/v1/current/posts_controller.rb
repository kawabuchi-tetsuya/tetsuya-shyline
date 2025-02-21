class Api::V1::Current::PostsController < Api::V1::BaseController
  before_action :authenticate_user!

  # GET api/v1/current/posts
  def index
    posts = current_user.posts.not_unsaved.order(updated_at: :desc, id: :desc)
    render json: posts
  end

  # GET api/v1/current/posts/:id
  def show
    post = current_user.posts.find(params[:id])
    render json: post
  end

  # POST api/v1/current/posts
  def create
    unsaved_post = current_user.posts.unsaved.first || current_user.posts.create!(status: :unsaved)
    render json: unsaved_post
  end

  # PATCH api/v1/current/posts/:id
  def update
    post = current_user.posts.find(params[:id])
    post.update!(post_params)
    render json: post
  end

  private

  def post_params
    params.expect(post: %i[content status])
  end
end
