# 投稿一覧用の正常レスポンス構造
RSpec.shared_examples '投稿一覧の正常レスポンス構造' do
  it '投稿一覧とメタ情報の構造が正しい' do
    aggregate_failures do
      expect(res.keys).to eq %w[posts meta]
      expect(res['posts'][0].keys).to eq %w[
        id content status created_at created_at_from_today updated_at updated_at_from_today
        original_image_urls thumbnail_urls user
      ]
      expect(res['posts'][0]['user'].keys).to eq %w[name nickname avatar_url]
      expect(res['meta'].keys).to eq %w[next_keyset]
      expect(res['meta']['next_keyset'].keys).to eq %w[updated_at id]
    end
  end
end

RSpec.shared_examples '表示する投稿がないときの正常レスポンス構造' do
  it 'レスポンスの構造が正しい' do
    request
    aggregate_failures do
      expect(res.keys).to eq %w[posts meta]
      expect(res['posts'].length).to eq(0)
      expect(res['meta'].keys).to eq %w[next_keyset]
      expect(res['meta']['next_keyset']).to be_nil
    end
  end
end

RSpec.shared_examples '投稿件数が正しい' do |count:|
  it "#{count}件のレコードが取得される" do
    expect(res['posts'].length).to eq(count)
  end
end

RSpec.shared_examples 'next_keyset の値が正しい' do
  it 'next_keyset が期待通りの値を返す' do
    aggregate_failures do
      expect(res['meta']['next_keyset']['updated_at']).to eq(formatted_time(expected_post.updated_at))
      expect(res['meta']['next_keyset']['id']).to eq(expected_post.id)
    end
  end
end

# 投稿単体用の正常レスポンス構造
RSpec.shared_examples '投稿の正常レスポンス構造' do
  it '投稿とユーザーの構造が正しい' do
    request

    aggregate_failures do
      expect(res.keys).to eq %w[
        id content status created_at created_at_from_today updated_at updated_at_from_today
        original_image_urls thumbnail_urls user
      ]
      expect(res['user'].keys).to eq %w[name nickname avatar_url]
    end
  end
end
