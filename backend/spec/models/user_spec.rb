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
    describe 'デフォルトアバターの添付' do
      let(:user) { create(:user) }

      context 'アバターが添付されていないとき' do
        it 'デフォルトアバターのURLが返される' do
          aggregate_failures do
            expect(user.avatar).not_to be_attached
            expect(user.avatar_url).to eq("#{Rails.application.config.x.frontend_host || 'http://localhost:3000'}/images/default-avatar.png")
          end
        end
      end

      context 'アバターがすでに添付されているとき' do
        before do
          user.avatar.attach(fixture_file_upload(Rails.root.join('spec/fixtures/files/sample-avatar.png'), 'image/png'))
        end

        it '既存のアバターを維持する' do
          aggregate_failures do
            expect(user.avatar).to be_attached
            expect(user.avatar.filename.to_s).to eq('sample-avatar.png')
          end
        end
      end
    end
  end

  describe '#avatar_url' do
    subject { user.avatar_url }

    let(:user) { create(:user) }

    context 'アバター画像が attach されたとき' do
      let(:image) { fixture_file_upload(Rails.root.join('spec/fixtures/files/sample-avatar.png'), 'image/png') }

      before do
        user.avatar.attach(image)
      end

      it 'アバター画像のURLを返す' do
        url = URI(subject)
        expect(url.to_s).to start_with("#{Rails.application.config.x.frontend_host || 'http://localhost:3000'}/rails/active_storage")
      end
    end

    context 'アバター画像が attach されていないとき' do
      it('デフォルト画像のURLを返す') { expect(subject).to eq("#{Rails.application.config.x.frontend_host || 'http://localhost:3000'}/images/default-avatar.png") }
    end
  end
end
