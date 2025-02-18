RSpec.describe User, type: :model do
  describe 'validations' do
    subject { build(:user) }

    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:email).case_insensitive.scoped_to(:provider) }
    it { should validate_presence_of(:password) }
  end

  describe 'associations' do
    it { should have_many(:posts).dependent(:destroy) }
  end

  describe 'メール認証のテスト' do
    let!(:user) { create(:user, confirmed_at: nil) }

    it '未認証のユーザーは confirmed_at が nil である' do
      expect(user.confirmed_at).to be_nil
    end

    it 'メール認証後は confirmed_at がセットされる' do
      user.confirm
      expect(user.confirmed_at).not_to be_nil
    end
  end
end
