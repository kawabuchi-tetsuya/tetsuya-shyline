# frozen_string_literal: true

class User < ApplicationRecord
  include DeviseTokenAuth::Concerns::User

  ALLOWED_IMAGE_CONTENT_TYPES = %w[image/jpeg image/png image/webp]
  USERNAME_MAX_LENGTH = 30
  NICKNAME_MAX_LENGTH = 30

  # Include default devise modules. Others available are:
  # :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable

  validate :avatar_format_within_limit
  validate :nickname_length_within_limit
  validates :name, presence: true, uniqueness: true, format: { with: /\A[a-zA-Z0-9_]+\z/ }, length: { maximum: USERNAME_MAX_LENGTH }
  validates :nickname, presence: true

  has_one_attached :avatar

  has_many :posts, dependent: :destroy
  has_many :for_order_posts, -> { order(updated_at: :desc, id: :desc) }, dependent: :destroy, inverse_of: :user, class_name: :Post

  private

  def avatar_format_within_limit
    return unless avatar.attached?
    unless avatar.content_type.in?(ALLOWED_IMAGE_CONTENT_TYPES)
      errors.add(:avatar, 'はJPEG, PNG, WebP形式のみアップロードできます')
    end
  end

  def nickname_length_within_limit
    if nickname.present? && nickname.length > NICKNAME_MAX_LENGTH
      errors.add(:nickname, "は#{NICKNAME_MAX_LENGTH}文字以内で入力してください")
    end
  end
end
