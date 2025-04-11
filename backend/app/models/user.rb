# frozen_string_literal: true

class User < ApplicationRecord
  include DeviseTokenAuth::Concerns::User
  USERNAME_MAX_LENGTH = 30
  NICKNAME_MAX_LENGTH = 30

  # Include default devise modules. Others available are:
  # :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable

  validates :name, presence: true, uniqueness: true, format: { with: /\A[a-zA-Z0-9_]+\z/ }, length: { maximum: USERNAME_MAX_LENGTH }
  validates :nickname, presence: true
  validate :nickname_length_within_limit

  has_many :posts, dependent: :destroy
  has_many :for_order_posts, -> { order(updated_at: :desc, id: :desc) }, dependent: :destroy, inverse_of: :user, class_name: :Post

  private

  def nickname_length_within_limit
    if nickname.present? && nickname.length > NICKNAME_MAX_LENGTH
      errors.add(:nickname, "は#{NICKNAME_MAX_LENGTH}文字以内で入力してください")
    end
  end
end
