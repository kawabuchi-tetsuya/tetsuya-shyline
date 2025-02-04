RSpec.describe User, type: :model do
  describe 'validations' do
    let!(:user) { create(:user) }

    it { should validate_presence_of(:name) }
    it { should validate_uniqueness_of(:name) }
    it { should validate_presence_of(:screen_name) }
    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:email) }
    it { should have_secure_password }
  end
end
