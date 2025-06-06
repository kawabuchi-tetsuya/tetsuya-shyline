RSpec.describe PostSerializer, type: :serializer do
  subject { PostSerializer.new(post).as_json }

  let!(:user) { create(:user) }
  let!(:post) { create(:post, user: user) }

  before do
    post.images.attach(
      io: Rails.root.join('spec/fixtures/files/sample.jpg').open,
      filename: 'sample.jpg',
      content_type: 'image/jpeg',
    )
  end

  it '含まれる属性が正しい' do
    expect(subject.keys).to include(*%i[
      id content status created_at created_at_from_today updated_at updated_at_from_today original_image_urls thumbnail_urls user
    ])
  end

  it('id が post.id と一致する') { expect(subject[:id]).to eq(post.id) }
  it('content が post.content と一致する') { expect(subject[:content]).to eq(post.content) }
  it('status が post.status と一致する') { expect(subject[:status]).to eq(post.status_i18n) }
  it('created_at の形式が正しい') { expect(subject[:created_at]).to match(%r{\d{4}年\d{2}月\d{2}日 \d{2}時\d{2}分\d{2}秒}) }
  it('updated_at の形式が正しい') { expect(subject[:updated_at]).to match(%r{\d{4}年\d{2}月\d{2}日 \d{2}時\d{2}分\d{2}秒}) }
  it('created_at_from_today が文字列である') { expect(subject[:created_at_from_today]).to be_a(String) }
  it('updated_at_from_today が文字列である') { expect(subject[:updated_at_from_today]).to be_a(String) }

  it 'original_image_urls に画像URLが含まれる' do
    aggregate_failures do
      expect(subject[:original_image_urls]).to all(be_a(String))
      expect(subject[:original_image_urls].first).to match(%r{http://})
    end
  end

  it 'thumbnail_urls にサムネイルURLが含まれる' do
    aggregate_failures do
      expect(subject[:thumbnail_urls]).to all(be_a(String))
      expect(subject[:thumbnail_urls].first).to match(%r{http://})
    end
  end

  it 'user が含まれる' do
    aggregate_failures do
      expect(subject[:user]).to include(
        name: user.name,
        nickname: user.nickname,
        avatar_url: nil,
      )
    end
  end
end
