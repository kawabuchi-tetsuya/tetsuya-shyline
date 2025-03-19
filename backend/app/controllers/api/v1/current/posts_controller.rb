class Api::V1::Current::PostsController < Api::V1::BaseController
  before_action :authenticate_user!

  # GET api/v1/current/posts
  def index
    posts = resolve_paginated_posts(params[:updated_at], params[:id])
    next_keyset = posts.last ? { updated_at: posts.last.updated_at.strftime('%Y-%m-%dT%H:%M:%S.%6N%z'), id: posts.last.id } : nil
    render json: posts, meta: { next_keyset: next_keyset }, adapter: :json
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

  def resolve_paginated_posts(keyset_updated_at, keyset_id)
    if keyset_updated_at.present? && keyset_id.present?
      current_user.posts.not_unsaved.where(
        '(posts.updated_at < ?) OR (posts.updated_at = ? AND posts.id < ?)',
        Time.zone.parse(keyset_updated_at),
        Time.zone.parse(keyset_updated_at),
        keyset_id.to_i,
      ).order(updated_at: :desc, id: :desc).eager_load(:user).limit(Post::POSTS_PER_PAGE)
    else
      current_user.posts.not_unsaved.order(updated_at: :desc, id: :desc).eager_load(:user).limit(Post::POSTS_PER_PAGE)
    end
  end
end
