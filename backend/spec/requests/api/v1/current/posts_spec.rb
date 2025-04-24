RSpec.describe 'Api::V1::Current::Posts', type: :request do
  let(:res) { response.parsed_body }
  let!(:current_user) { create(:user) }
  let!(:headers) { current_user.create_new_auth_token }

  describe 'GET api/v1/current/posts' do
    let(:request) { get(api_v1_current_posts_path(params), headers:) }

    before { create_list(:post, 2, user: create(:user)) }

    context 'ログインユーザーの投稿が存在するとき' do
      before { create_list(:post, Post::POSTS_PER_PAGE * 2, user: current_user) }

      let!(:current_user_posts) { current_user.posts.not_unsaved.order(updated_at: :desc, id: :desc) }

      context 'params を指定しないとき' do
        let!(:params) { nil }
        let!(:expected_post) { current_user_posts[Post::POSTS_PER_PAGE - 1] }

        before { request }

        include_examples 'レスポンスステータスが', status: :ok
        include_examples '投稿一覧の正常レスポンス構造'
        include_examples '投稿件数が正しい', count: Post::POSTS_PER_PAGE
        it_behaves_like 'next_keyset の値が正しい'
      end

      context "params で#{Post::POSTS_PER_PAGE}件目の updated_at と id を渡すとき" do
        let!(:keyset_post) { current_user_posts[Post::POSTS_PER_PAGE - 1] }
        let!(:params) { { updated_at: formatted_time(keyset_post.updated_at), id: keyset_post.id } }
        let!(:expected_post) { current_user_posts[Post::POSTS_PER_PAGE * 2 - 1] }

        before { request }

        include_examples 'レスポンスステータスが', status: :ok
        include_examples '投稿一覧の正常レスポンス構造'
        include_examples '投稿件数が正しい', count: Post::POSTS_PER_PAGE
        it_behaves_like 'next_keyset の値が正しい'
      end

      context 'params で指定した条件を満たすレコードがないとき' do
        let!(:params) { { updated_at: formatted_time(Time.zone.local(1900, 1, 1)), id: 1 } }

        before { request }

        include_examples 'レスポンスステータスが', status: :ok
        include_examples '表示する投稿がないときの正常レスポンス構造'
      end
    end

    context 'ログインユーザーの投稿が存在しないとき' do
      let!(:params) { nil }

      before { request }

      include_examples 'レスポンスステータスが', status: :ok
      include_examples '表示する投稿がないときの正常レスポンス構造'
    end

    context 'ユーザーが認証されていないとき' do
      let!(:headers) { {} }
      let!(:params) { nil }

      before { request }

      include_examples 'レスポンスステータスが', status: :unauthorized
    end
  end

  describe 'GET api/v1/current/posts/:id' do
    let(:request) { get(api_v1_current_post_path(post_id), headers:) }

    context 'ログインユーザーの投稿の場合' do
      let!(:current_user_post) { create(:post, user: current_user) }
      let!(:post_id) { current_user_post.id }

      include_examples 'レスポンスステータスが', status: :ok
      include_examples '投稿の正常レスポンス構造'
    end

    context 'ログインユーザー以外の投稿の場合' do
      let!(:post_id) { create(:post).id }

      include_examples 'レスポンスステータスが', status: :not_found
    end

    context 'ユーザーが認証されていないとき' do
      let!(:headers) { {} }
      let!(:post_id) { create(:post).id }

      include_examples 'レスポンスステータスが', status: :unauthorized
    end
  end

  describe 'POST api/v1/current/posts' do
    let(:request) { post(api_v1_current_posts_path, headers:) }

    context 'ログインユーザーがステータス unsaved の投稿を保有していないとき' do
      it 'ステータス unsaved の投稿を作成する' do
        aggregate_failures do
          expect { request }.to change { current_user.posts.count }.by(1)
          expect(current_user.posts.last).to be_unsaved
        end
      end

      include_examples 'レスポンスステータスが', status: :ok
      include_examples '投稿の正常レスポンス構造'
    end

    context 'ログインユーザーがステータス unsaved の投稿を保有していたとき' do
      before { create(:post, user: current_user, status: :unsaved) }

      it ('新たな投稿は作成されない') { expect { request }.not_to change { current_user.posts.count } }

      include_examples 'レスポンスステータスが', status: :ok
      include_examples '投稿の正常レスポンス構造'
    end

    context 'ユーザーが認証されていないとき' do
      let!(:headers) { {} }

      include_examples 'レスポンスステータスが', status: :unauthorized
    end
  end

  describe 'PATCH api/v1/current/posts/:id' do
    let(:request) { patch(api_v1_current_post_path(post_id), params:, headers:) }
    let!(:params) { { "post": { "content": "updated content", "status": "published" } } }

    context '投稿がログインユーザーに紐づくものであるとき' do
      let!(:current_user_post) { create(:post, content: 'current user post', user: current_user, status: :draft) }
      let!(:post_id) { current_user_post.id }

      it '投稿の内容が更新される' do
        expect { request }.to change { current_user_post.reload.content }.from('current user post').to('updated content') and
          change { current_user_post.reload.status }.from('draft').to('published')
      end

      include_examples 'レスポンスステータスが', status: :ok
      include_examples '投稿の正常レスポンス構造'
    end

    context '投稿がログインユーザーのものではないとき' do
      let!(:other_user_post) { create(:post, content: 'other user post', status: :draft) }
      let!(:post_id) { other_user_post.id }

      it ('投稿の内容は更新されない') { expect { request }.not_to change { other_user_post.reload.content } }

      include_examples 'レスポンスステータスが', status: :not_found
    end

    context '不正なパラメータを送信したとき' do
      let!(:current_user_post) { create(:post, user: current_user, status: :draft) }
      let!(:post_id) { current_user_post.id }
      let!(:params) { { post: { status: 'invalid_status' } } }

      include_examples 'レスポンスステータスが', status: :unprocessable_entity
    end

    context 'リクエストボディが空のとき' do
      let!(:current_user_post) { create(:post, user: current_user, status: :draft) }
      let!(:post_id) { current_user_post.id }
      let!(:params) { {} }

      include_examples 'レスポンスステータスが', status: :bad_request
    end

    context 'ユーザーが認証されていないとき' do
      let!(:headers) { {} }
      let!(:post_id) { create(:post).id }

      include_examples 'レスポンスステータスが', status: :unauthorized
    end
  end
end
