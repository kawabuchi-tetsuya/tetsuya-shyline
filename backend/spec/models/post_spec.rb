RSpec.describe Post, type: :model do
  context 'factory のデフォルト設定に従ったとき' do
    subject { create(:post) }

    it '正常にレコードを新規作成できる' do
      expect { subject }.to change { Post.count }.by(1)
    end
  end

  describe 'validations' do
    describe 'statusについて' do
      subject { build(:post) }

      it { should define_enum_for(:status) }
      it { should validate_presence_of(:status) }
      Post.statuses.each_key {|status| it { should allow_value(status).for(:status) } }
      it { should_not allow_value(nil).for(:status).with_message('を入力してください') }
    end

    describe 'content について' do
      it { should allow_value('卍' * Post::CONTENT_MAX_LENGTH).for(:content) }
      it { should_not allow_value('卍' * (Post::CONTENT_MAX_LENGTH + 1)).for(:content).with_message("は#{Post::CONTENT_MAX_LENGTH}文字以内で入力してください") }

      context 'status が published のとき' do
        subject { build(:post, status: :published, content: nil) }

        it 'content が必須である' do
          aggregate_failures do
            expect(subject).to be_invalid
            expect(subject.errors[:content]).to include('を入力してください')
          end
        end
      end
    end

    describe '未保存 (unsaved) の投稿について' do
      context '同じユーザーが2つ以上同時に保存しようとしたとき' do
        let!(:user) { create(:user) }
        let!(:post) { create(:post, user:, status: :unsaved) }
        subject { build(:post, user:, status: :unsaved) }

        it 'エラーが返る' do
          aggregate_failures do
            expect(subject).to be_invalid
            expect(subject.errors[:base]).to include('未保存の投稿は複数保有できません')
          end
        end
      end
    end
  end

  describe 'associations' do
    it { should belong_to(:user) }
  end
end
