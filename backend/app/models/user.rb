# frozen_string_literal: true

require 'mime/types'

class User < ApplicationRecord
  include DeviseTokenAuth::Concerns::User

  ALLOWED_AVATAR_CONTENT_TYPES = %w[image/jpeg image/png image/webp]
  AVATAR_MAX_SIZE_MB = 5
  AVATAR_SQUARE_SIZE = [150, 150]
  NICKNAME_MAX_LENGTH = 30
  THUMBNAIL_SIZE = [100, 100]
  USERNAME_MAX_LENGTH = 30

  # Include default devise modules. Others available are:
  # :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable

  validate :nickname_length_within_limit
  validates :avatar, content_type: ALLOWED_AVATAR_CONTENT_TYPES,
                     size: { less_than_or_equal_to: AVATAR_MAX_SIZE_MB.megabytes }
  validates :name, presence: true, uniqueness: true, format: { with: /\A[a-zA-Z0-9_]+\z/ }, length: { maximum: USERNAME_MAX_LENGTH }
  validates :nickname, presence: true

  has_one_attached :avatar

  after_commit :generate_avatar_variant, if: :avatar_previously_changed?

  has_many :posts, dependent: :destroy
  has_many :for_order_posts, -> { order(updated_at: :desc, id: :desc) }, dependent: :destroy, inverse_of: :user, class_name: :Post

  def avatar_url(size = THUMBNAIL_SIZE)
    if avatar.attached?
      Rails.application.routes.url_helpers.rails_representation_url(
        avatar.variant(resize_to_fill: size),
        only_path: false,
        host: Rails.application.config.x.frontend_host,
      )
    else
      default_avatar_url
    end
  rescue => e
    Rails.logger.warn("Failed to generate avatar URL: #{e}")
    default_avatar_url
  end

  private

  def avatar_previously_changed?
    previous_changes.has_key?('avatar')
  end

  def default_avatar_url
    "#{Rails.application.config.x.frontend_host || 'http://localhost:3000'}/images/default-avatar.png"
  end

  def generate_avatar_variant
    avatar.variant(resize_to_fill: AVATAR_SQUARE_SIZE).processed
  rescue => e
    Rails.logger.warn("Failed to generate avatar variant: #{e}")
  end

  def nickname_length_within_limit
    if nickname.present? && nickname.length > NICKNAME_MAX_LENGTH
      errors.add(:nickname, "は#{NICKNAME_MAX_LENGTH}文字以内で入力してください")
    end
  end
end
