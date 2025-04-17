class Post < ApplicationRecord
  ALLOWED_IMAGE_CONTENT_TYPES = %w[image/jpeg image/png image/webp]
  CONTENT_MAX_LENGTH = 140
  IMAGES_MAX_COUNT = 4
  IMAGE_MAX_SIZE_MB = 5
  POSTS_PER_PAGE = 20
  THUMBNAIL_SIZE = [300, 300]

  enum :status, { unsaved: 10, draft: 20, published: 30 }

  validate :content_length_within_limit
  validate :images_count_within_limit
  validate :images_format_within_limit
  validate :images_size_within_limit
  validate :verify_only_one_unsaved_status_is_allowed
  validates :content, presence: true, if: :published?
  validates :status, presence: true, inclusion: { in: statuses.keys }

  belongs_to :user

  has_many_attached :images

  def thumbnail(index = 0, size = THUMBNAIL_SIZE)
    images[index]&.variant(resize_to_fill: size)&.processed
  end

  private

  # マルチバイト文字で140字を超えるとき、エラーを追加する
  def content_length_within_limit
    if content.present? && content.length > CONTENT_MAX_LENGTH
      errors.add(:content, "は#{CONTENT_MAX_LENGTH}文字以内で入力してください")
    end
  end

  def images_count_within_limit
    if images.count > IMAGES_MAX_COUNT
      errors.add(:images, "は最大#{IMAGES_MAX_COUNT}枚までです")
    end
  end

  def images_format_within_limit
    images.each do |image|
      unless image.content_type.in?(ALLOWED_IMAGE_CONTENT_TYPES)
        errors.add(:images, 'はJPEG, PNG, WebP形式のみアップロードできます')
      end
    end
  end

  def images_size_within_limit
    images.each do |image|
      if image.byte_size > IMAGE_MAX_SIZE_MB.megabytes
        errors.add(:images, "のサイズは#{IMAGE_MAX_SIZE_MB}MB以内にしてください")
      end
    end
  end

  # 未保存ステータスのpostは1ユーザーにつき同時に1つのみ
  def verify_only_one_unsaved_status_is_allowed
    if unsaved? && user.posts.unsaved.exists?
      errors.add(:base, '未保存の投稿は複数保有できません')
    end
  end
end
