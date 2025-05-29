RSpec.describe User, type: :model do
  describe 'validations' do
    subject { build(:user) }

    describe 'avatar について' do
      it { is_expected.to validate_content_type_of(:avatar).allowing(User::ALLOWED_AVATAR_CONTENT_TYPES) }
      it { is_expected.to validate_size_of(:avatar).less_than_or_equal_to(User::AVATAR_MAX_SIZE_MB.megabytes) }
    end

    describe 'email について' do
      it { should validate_presence_of(:email) }
      it { should validate_uniqueness_of(:email).case_insensitive.scoped_to(:provider) }
    end

    describe 'name について' do
      it { should validate_presence_of(:name) }
      it { should validate_uniqueness_of(:name) }
      it { should validate_length_of(:name).is_at_most(User::USERNAME_MAX_LENGTH) }
    end

    describe 'nickname について' do
    it { should validate_presence_of(:nickname) }
    it { should allow_value('卍' * User::NICKNAME_MAX_LENGTH).for(:nickname) }
    it { should_not allow_value('卍' * (User::NICKNAME_MAX_LENGTH + 1)).for(:nickname) }
    end

    describe 'password について' do
      it { should validate_presence_of(:password) }
    end
  end

  describe 'associations' do
    it { should have_many(:posts).dependent(:destroy) }
  end

  describe 'メール認証のテスト' do
    context '未認証ユーザーのとき' do
      let!(:user) { build_stubbed(:user, confirmed_at: nil) }

      it ('confirmed_at が nil である') { expect(user.confirmed_at).to be_nil }
    end

    context '認証済みユーザーのとき' do
      let!(:user) { create(:user, :unconfirmed) }

      before { user.confirm }

      it ('メール認証後は confirmed_at がセットされる') { expect(user.confirmed_at).not_to be_nil }
    end
  end

  describe '#avatar_url' do
    subject { user.avatar_url }

    let(:user) { build(:user) }

    context 'アバター画像がセットされたとき' do
      before do
        user.avatar.attach(io: StringIO.new('fake image'), filename: 'sample-avatar.png', content_type: 'image/png')

        variant_double = double('variant', processed: :resized_image)
        allow(user.avatar).to receive(:variant).with(resize_to_fill: User::AVATAR_SQUARE_SIZE).and_return(variant_double)
        allow(Rails.application.routes.url_helpers).to receive(:rails_representation_url).with(
          :resized_image,
          host: Rails.application.config.x.frontend_host,
        ).and_return('/rails/active_storage/variant/123')
      end

      it 'リサイズされた画像のURLを返す' do
        expect(subject).to eq('/rails/active_storage/variant/123')
      end
    end

    context 'アバター画像がセットされていないとき' do
      it 'デフォルト画像のURLを返す' do
        expect(subject).to eq("#{Rails.application.config.x.frontend_host}/images/default-avatar.png")
      end
    end
  end
end
