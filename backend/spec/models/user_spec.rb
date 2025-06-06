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

  describe '#avatar' do
    it { is_expected.to have_one_attached(:avatar) }
  end
end
