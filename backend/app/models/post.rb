class Post < ApplicationRecord
  CONTENT_MAX_LENGTH = 140

  enum :status, { unsaved: 10, draft: 20, published: 30 }

  validates :content, presence: true, if: :published?
  validate :content_length_within_limit
  validates :status, presence: true, inclusion: { in: statuses.keys }
  validate :verify_only_one_unsaved_status_is_allowed

  belongs_to :user

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
