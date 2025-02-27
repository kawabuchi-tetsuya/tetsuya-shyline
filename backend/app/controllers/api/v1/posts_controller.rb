class Api::V1::PostsController < Api::V1::BaseController
  def index
    posts = resolve_paginated_posts(params[:updated_at], params[:id])
    next_keyset = posts.last ? { updated_at: posts.last.updated_at.strftime('%Y-%m-%dT%H:%M:%S.%6N%z'), id: posts.last.id } : nil
    render json: posts, meta: { next_keyset: next_keyset }, adapter: :json
  end

  def show
    post = Post.published.find(params[:id])
    render json: post
  end

  private

  def resolve_paginated_posts(keyset_updated_at, keyset_id)
    if keyset_updated_at.present? && keyset_id.present?
      Post.published.where(
        '(posts.updated_at < ?) OR (posts.updated_at = ? AND posts.id < ?)',
        Time.zone.parse(keyset_updated_at),
        Time.zone.parse(keyset_updated_at),
        keyset_id.to_i,
      ).order(updated_at: :desc, id: :desc).eager_load(:user).limit(Post::POSTS_PER_PAGE)
    else
      Post.published.order(updated_at: :desc, id: :desc).eager_load(:user).limit(Post::POSTS_PER_PAGE)
    end
  end
end
