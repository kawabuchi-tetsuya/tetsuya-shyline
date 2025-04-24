RSpec.describe Post, type: :model do
  context 'factory のデフォルト設定に従ったとき' do
    subject { create(:post) }

    it '正常にレコードを新規作成できる' do
      expect { subject }.to change { Post.count }.by(1)
    end
  end

  describe 'validations' do
    shared_examples '1つのエラーメッセージが返る' do |field:, message:|
      it { expect(subject.errors[field].size).to eq(1) }
      it { expect(subject.errors[field]).to eq([message]) }
    end

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

        before { subject.valid? }

        include_examples '1つのエラーメッセージが返る', field: :content, message: 'を入力してください'
      end
    end

    describe '未保存 (unsaved) の投稿について' do
      let!(:user) { create(:user) }
      let!(:post) { create(:post, user:, status: :unsaved) }

      context '同じユーザーが2つ以上同時に保存しようとしたとき' do
        subject { build(:post, user:, status: :unsaved) }

        before { subject.valid? }

        include_examples '1つのエラーメッセージが返る', field: :base, message: '未保存の投稿は複数保有できません'
      end
    end

    describe '画像について' do
      let!(:user) { create(:user) }
      let!(:post) { build(:post, user:) }

      context '画像が正しく添付されているとき' do
        subject { post }
        before do
          post.images.attach(fixture_file('sample.jpg', 'image/jpeg'))
          subject.valid?
        end

        it ('有効である') { expect(subject).to be_valid }
      end

      context '画像枚数の上限を超えるとき' do
        subject { post }
        before do
          (Post::IMAGES_MAX_COUNT + 1).times do
            post.images.attach(fixture_file('sample.jpg', 'image/jpeg'))
          end

          subject.valid?
        end

        include_examples '1つのエラーメッセージが返る', field: :images, message: "は最大#{Post::IMAGES_MAX_COUNT}枚までです"
      end

      context 'サポートされていないファイル形式のとき' do
        subject { post }
        before do
          post.images.attach(fixture_file('invalid_file.txt', 'text/plain'))
          subject.valid?
        end

        include_examples '1つのエラーメッセージが返る', field: :images, message: 'はJPEG, PNG, WebP形式のみアップロードできます'
      end

      context '画像サイズの上限を超えるとき' do
        subject { post }
        before do
          post.images.attach(fixture_file('oversized.jpg', 'image/jpeg'))
          subject.valid?
        end

        include_examples '1つのエラーメッセージが返る', field: :images, message: "のサイズは#{Post::IMAGE_MAX_SIZE_MB}MB以内にしてください"
      end
    end
  end

  describe 'associations' do
    it { should belong_to(:user) }
  end
end
