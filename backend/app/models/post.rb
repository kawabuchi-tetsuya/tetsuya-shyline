class Post < ApplicationRecord
  ALLOWED_IMAGE_CONTENT_TYPES = %w[image/jpeg image/png image/webp]
  CONTENT_MAX_LENGTH = 140
  IMAGES_MAX_COUNT = 4
  IMAGE_MAX_SIZE_MB = 5
  POSTS_PER_PAGE = 20
  THUMBNAIL_SIZE = [300, 300]

  enum :status, { unsaved: 10, draft: 20, published: 30 }

  validate :content_length_within_limit
  validate :verify_only_one_unsaved_status_is_allowed
  validates :content, presence: true, if: :published?
  validates :images, content_type: ALLOWED_IMAGE_CONTENT_TYPES
  validates :images, limit: { max: IMAGES_MAX_COUNT }
  validates :images, size: { less_than_or_equal_to: IMAGE_MAX_SIZE_MB.megabytes }
  validates :status, presence: true, inclusion: { in: statuses.keys }

  belongs_to :user

  has_many_attached :images do |attachable|
    attachable.variant :thumb, resize_to_fill: THUMBNAIL_SIZE, preprocessed: true
  end

  private

  # マルチバイト文字で140字を超えるとき、エラーを追加する
  def content_length_within_limit
    if content.present? && content.length > CONTENT_MAX_LENGTH
      errors.add(:content, "は#{CONTENT_MAX_LENGTH}文字以内で入力してください")
    end
  end

  # 未保存ステータスのpostは1ユーザーにつき同時に1つのみ
  def verify_only_one_unsaved_status_is_allowed
    if unsaved? && user.posts.unsaved.exists?
      errors.add(:base, '未保存の投稿は複数保有できません')
    end
  end
end
