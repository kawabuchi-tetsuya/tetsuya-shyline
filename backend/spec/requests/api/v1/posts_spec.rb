RSpec.describe 'Api::V1::Posts', type: :request do
  let(:res) { response.parsed_body }

  describe 'GET api/v1/posts' do
    let(:request) { get(api_v1_posts_path(params)) }
    let(:ordered_posts) { Post.order(updated_at: :desc, id: :desc) }

    before { create_list(:post, Post::POSTS_PER_PAGE * 2, status: :published) }

    context 'params がnilのとき' do
      let!(:params) { nil }
      let!(:expected_post) { ordered_posts[Post::POSTS_PER_PAGE - 1] }

      before { request }

      include_examples 'レスポンスステータスが', status: :ok
      include_examples '投稿一覧の正常レスポンス構造'
      include_examples '投稿件数が正しい', count: Post::POSTS_PER_PAGE
      it_behaves_like 'next_keyset の値が正しい'
    end

    context "params で#{Post::POSTS_PER_PAGE}件目の updated_at と id を渡すとき" do
      let!(:keyset_post) { ordered_posts.limit(Post::POSTS_PER_PAGE).last }
      let!(:params) { { updated_at: formatted_time(keyset_post.updated_at), id: keyset_post.id } }
      let!(:expected_post) { ordered_posts[Post::POSTS_PER_PAGE * 2 - 1] }

      before { request }

      include_examples 'レスポンスステータスが', status: :ok
      include_examples '投稿一覧の正常レスポンス構造'
      include_examples '投稿件数が正しい', count: Post::POSTS_PER_PAGE
      it_behaves_like 'next_keyset の値が正しい'

      it "取得されたレコードの1件目がDBの#{Post::POSTS_PER_PAGE + 1}件目である" do
        first_post = ordered_posts[Post::POSTS_PER_PAGE]

        expect(res['posts'][0]['id']).to eq(first_post.id)
      end

      it "取得されたレコードの#{Post::POSTS_PER_PAGE}件目がDBの#{Post::POSTS_PER_PAGE * 2}件目である" do
        last_post = ordered_posts[Post::POSTS_PER_PAGE * 2 - 1]

        expect(res['posts'][Post::POSTS_PER_PAGE - 1]['id']).to eq(last_post.id)
      end
    end

    context 'params で指定した条件を満たすレコードがないとき' do
      let!(:params) { { updated_at: formatted_time(Time.zone.local(1900, 1, 1)), id: 1 } }

      before { request }

      include_examples 'レスポンスステータスが', status: :ok
      include_examples '表示する投稿がないときの正常レスポンス構造'
    end
  end

  describe 'GET api/v1/posts/:id' do
    let(:request) { get(api_v1_post_path(post_id)) }

    context '存在する投稿詳細ページにアクセスするとき' do
      context 'ステータスが published のとき' do
        let!(:published_post) { create(:post, status: :published) }
        let!(:post_id) { published_post.id }

        before { request }

        include_examples 'レスポンスステータスが', status: :ok
        include_examples '投稿の正常レスポンス構造'
      end

      context 'ステータスが draft のとき' do
        let!(:draft_post) { create(:post, status: :draft) }
        let!(:post_id) { draft_post.id }

        before { request }

        include_examples 'レスポンスステータスが', status: :not_found
      end
    end

    context '存在しない投稿詳細ページにアクセスするとき' do
      let!(:post_id) { Post.last&.id.to_i + 1000 }

      before { request }

      include_examples 'レスポンスステータスが', status: :not_found
    end
  end
end
