RSpec.describe UserSerializer, type: :serializer do
  subject { UserSerializer.new(user).as_json }

  let!(:user) { create(:user) }

  describe '属性について' do
    it '含まれる属性が正しい' do
      expect(subject.keys).to include(*%i[name nickname avatar_url])
    end
  end

  describe 'avatar_url' do
    context 'avatar が添付されているとき' do
      before do
        user.avatar.attach(
          io: Rails.root.join('spec/fixtures/files/sample-avatar.png').open,
          filename: 'sample-avatar.png',
          content_type: 'image/png',
        )
      end

      it 'アバターのURLが返る' do
        aggregate_failures do
          expect(subject[:avatar_url]).to be_a(String)
          expect(subject[:avatar_url]).to end_with('/sample-avatar.png')
        end
      end
    end

    context 'avatar が添付されていないとき' do
      it 'nil が返る' do
        expect(subject[:avatar_url]).to be_nil
      end
    end
  end
end
