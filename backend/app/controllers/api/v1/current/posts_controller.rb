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

    begin
      if post.update(post_params)
        render json: post
      else
        render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
      end
    rescue ArgumentError => e
      render json: { errors: [e.message] }, status: :unprocessable_entity
    end
  end

  private

  def post_params
    params.expect(post: [:content, :status, images: []])
  end

  def resolve_paginated_posts(keyset_updated_at, keyset_id)
    base_scope = current_user.posts.not_unsaved.preload(:user, images_attachments: :blob)

    if keyset_updated_at.present? && keyset_id.present?
      base_scope.where(
        '(posts.updated_at < ?) OR (posts.updated_at = ? AND posts.id < ?)',
        Time.zone.parse(keyset_updated_at),
        Time.zone.parse(keyset_updated_at),
        keyset_id.to_i,
      )
    else
      base_scope
    end.
      order(updated_at: :desc, id: :desc).limit(Post::POSTS_PER_PAGE)
  end
end
