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
      it { should_not allow_value(nil).for(:status).with_message('を入力してください') }

      Post.statuses.each_key do |status|
        it { should allow_value(status).for(:status) }
      end
    end

    describe 'content について' do
      it { should allow_value('卍' * Post::CONTENT_MAX_LENGTH).for(:content) }
      it { should_not allow_value('卍' * (Post::CONTENT_MAX_LENGTH + 1)).for(:content).with_message("は#{Post::CONTENT_MAX_LENGTH}文字以内で入力してください") }

      context 'status が published のとき' do
        subject { build(:post, status: :published, content: nil) }

        it 'content が必須である' do
          subject.valid?

          aggregate_failures do
            expect(subject.errors[:content].size).to eq(1)
            expect(subject.errors[:content]).to include('を入力してください')
          end
        end
      end
    end

    describe '未保存 (unsaved) の投稿について' do
      let!(:user) { create(:user) }
      let!(:post) { create(:post, user:, status: :unsaved) }

      context '同じユーザーが2つ以上同時に保存しようとしたとき' do
        subject { build(:post, user:, status: :unsaved) }

        it 'エラーが返る' do
          subject.valid?

          aggregate_failures do
            expect(subject.errors[:base].size).to eq(1)
            expect(subject.errors[:base]).to include('未保存の投稿は複数保有できません')
          end
        end
      end
    end

    describe '画像について' do
      let!(:user) { create(:user) }
      let!(:post) { build(:post, user:) }

      context '画像が正しく添付されているとき' do
        subject { post }
        before { post.images.attach(fixture_file('sample.jpg', 'image/jpeg')) }

        it '有効である' do
          expect(subject).to be_valid
        end
      end

      context '画像枚数の上限を超えるとき' do
        subject { post }
        before do
          (Post::IMAGES_MAX_COUNT + 1).times do
            post.images.attach(fixture_file('sample.jpg', 'image/jpeg'))
          end
        end

        it 'エラーが返る' do
          subject.valid?

          aggregate_failures do
            expect(subject.errors[:images].size).to eq(1)
            expect(subject.errors[:images]).to include("は最大#{Post::IMAGES_MAX_COUNT}枚までです")
          end
        end
      end

      context 'サポートされていないファイル形式のとき' do
        subject { post }
        before { post.images.attach(fixture_file('invalid_file.txt', 'text/plain')) }

        it 'エラーが返る' do
          subject.valid?

          aggregate_failures do
            expect(subject.errors[:images].size).to eq(1)
            expect(subject.errors[:images]).to include('はJPEG, PNG, WebP形式のみアップロードできます')
          end
        end
      end

      context '画像サイズの上限を超えるとき' do
        subject { post }
        before { post.images.attach(fixture_file('oversized.jpg', 'image/jpeg')) }

        it 'エラーが返る' do
          subject.valid?

          aggregate_failures do
            expect(subject.errors[:images].size).to eq(1)
            expect(subject.errors[:images]).to include("のサイズは#{Post::IMAGE_MAX_SIZE_MB}MB以内にしてください")
          end
        end
      end
    end
  end

  describe 'associations' do
    it { should belong_to(:user) }
  end
end
