RSpec.describe Post, type: :model do
  context 'factory のデフォルト設定に従ったとき' do
    subject { create(:post) }

    it '正常にレコードを新規作成できる' do
      expect { subject }.to change { Post.count }.by(1)
    end
  end

  describe 'validations' do
    it { should define_enum_for(:status) }
    it { should validate_presence_of(:status) }

    describe 'statusについて' do
      context '規定の値であるとき' do
        let!(:post) { create(:post) }

        it '有効となる' do
          aggregate_failures do
            Post.statuses.each_key do |status|
              post.status = status
              post.valid?
              expect(post).to be_valid
            end
          end
        end
      end

      context '規定外の値であるとき' do
        let!(:post) { build(:post, status: nil) }

        it 'エラーが返る' do
          post.valid?
          aggregate_failures do
            expect(post).to be_invalid
            expect(post.errors[:status]).to include('を入力してください')
          end
        end
      end
    end

    describe 'content について' do
      context 'status が published かつ content が nil のとき' do
        let!(:post) { build(:post, content: nil) }

        it 'エラーが返る' do
          post.valid?
          aggregate_failures do
            expect(post).to be_invalid
            expect(post.errors[:content]).to include('を入力してください')
          end
        end
      end
      context "#{Post::CONTENT_MAX_LENGTH} 文字のとき" do
        let!(:post) { create(:post) }

        it '有効となる' do
          post.content = '卍' * Post::CONTENT_MAX_LENGTH
          post.valid?
          expect(post).to be_valid
        end
      end

      context "#{Post::CONTENT_MAX_LENGTH + 1} 文字のとき" do
        let!(:post) { build(:post) }

        it '無効となる' do
          post.content = '卍' * (Post::CONTENT_MAX_LENGTH + 1)
          post.valid?
          aggregate_failures do
            expect(post).to be_invalid
            expect(post.errors[:content]).to include("は#{Post::CONTENT_MAX_LENGTH}文字以内で入力してください")
          end
        end
      end
    end

    describe '未保存 (unsaved) の投稿について' do
      context '同じユーザーが2つ以上同時に保存しようとしたとき' do
        let!(:user) { create(:user) }
        let!(:post) { create(:post, user:, status: :unsaved) }
        let!(:new_post) { build(:post, user:, status: :unsaved) }

        it 'エラーが返る' do
          new_post.valid?
          aggregate_failures do
            expect(new_post).to be_invalid
            expect(new_post.errors[:base]).to include('未保存の投稿は複数保有できません')
          end
        end
      end
    end
  end

  describe 'associations' do
    it { should belong_to(:user) }
  end
end
