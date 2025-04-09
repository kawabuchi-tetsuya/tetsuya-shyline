RSpec.describe 'Api::V1::Current::Posts', type: :request do
  describe 'GET api/v1/current/posts' do
    subject { get(api_v1_current_posts_path(params), headers:) }

    let!(:current_user) { create(:user) }
    let!(:headers) { current_user.create_new_auth_token }
    let!(:other_user) { create(:user) }

    before { create_list(:post, 2, user: other_user) }

    context 'ログインユーザーの投稿が存在するとき' do
      before { create_list(:post, Post::POSTS_PER_PAGE * 2, user: current_user) }

      let!(:current_user_posts) { current_user.posts.not_unsaved.order(updated_at: :desc, id: :desc) }

      context 'params を指定しないとき' do
        let!(:params) { nil }
        let!(:got_posts) { current_user_posts[0, Post::POSTS_PER_PAGE] }

        it 'レスポンス ok が返る' do
          subject
          expect(response).to have_http_status(:ok)
        end

        it 'レスポンスの構造が正しい' do
          subject
          res = response.parsed_body

          aggregate_failures do
            expect(res.keys).to eq ['posts', 'meta']
            expect(res['posts'][0].keys).to eq ['id', 'content', 'status', 'created_at', 'created_at_from_today', 'updated_at', 'updated_at_from_today', 'user']
            expect(res['posts'][0]['user'].keys).to eq ['name', 'nickname']
            expect(res['meta'].keys).to eq ['next_keyset']
            expect(res['meta']['next_keyset'].keys).to eq ['updated_at', 'id']
          end
        end

        it "#{Post::POSTS_PER_PAGE}件のレコードが取得される" do
          subject
          res = response.parsed_body

          expect(res['posts'].length).to eq(Post::POSTS_PER_PAGE)
        end

        it 'next_keyset の値が正しい' do
          subject
          res = response.parsed_body
          last_post = got_posts.last

          aggregate_failures do
            expect(res['meta']['next_keyset']['updated_at']).to eq(
              last_post.updated_at.strftime('%Y-%m-%dT%H:%M:%S.%6N%z'),
            )
            expect(res['meta']['next_keyset']['id']).to eq(last_post.id)
          end
        end
      end

      context "params で#{Post::POSTS_PER_PAGE}件目の updated_at と id を渡すとき" do
        let!(:keyset_post) { current_user_posts[Post::POSTS_PER_PAGE - 1] }
        let!(:got_posts) { current_user_posts[Post::POSTS_PER_PAGE, Post::POSTS_PER_PAGE] }
        let!(:params) { { updated_at: keyset_post.updated_at.strftime('%Y-%m-%dT%H:%M:%S.%6N%z'), id: keyset_post.id } }

        it 'レスポンス ok が返る' do
          subject
          expect(response).to have_http_status(:ok)
        end

        it 'レスポンスの構造が正しい' do
          subject
          res = response.parsed_body

          aggregate_failures do
            expect(res.keys).to eq ['posts', 'meta']
            expect(res['posts'][0].keys).to eq ['id', 'content', 'status', 'created_at', 'created_at_from_today', 'updated_at', 'updated_at_from_today', 'user']
            expect(res['posts'][0]['user'].keys).to eq ['name', 'nickname']
            expect(res['meta'].keys).to eq ['next_keyset']
            expect(res['meta']['next_keyset'].keys).to eq ['updated_at', 'id']
          end
        end

        it "#{Post::POSTS_PER_PAGE}件のレコードが取得される" do
          subject
          res = response.parsed_body

          expect(res['posts'].length).to eq(Post::POSTS_PER_PAGE)
        end

        it 'next_keyset の値が正しい' do
          subject
          res = response.parsed_body
          last_post = got_posts.last

          aggregate_failures do
            expect(res['meta']['next_keyset']['updated_at']).to eq(
              last_post.updated_at.strftime('%Y-%m-%dT%H:%M:%S.%6N%z'),
            )
            expect(res['meta']['next_keyset']['id']).to eq(last_post.id)
          end
        end
      end

      context 'params で指定した条件を満たすレコードがないとき' do
        let!(:params) { { updated_at: Time.zone.local(1900, 1, 1, 0, 0, 0).strftime('%Y-%m-%dT%H:%M:%S.%6N%z'), id: 1 } }

        it 'レスポンス ok が返る' do
          subject
          expect(response).to have_http_status(:ok)
        end

        it 'レスポンスの構造が正しい' do
          subject
          res = response.parsed_body

          aggregate_failures do
            expect(res.keys).to eq ['posts', 'meta']
            expect(res['posts'].length).to eq(0)
            expect(res['meta'].keys).to eq ['next_keyset']
            expect(res['meta']['next_keyset']).to be_nil
          end
        end
      end
    end

    context 'ログインユーザーの投稿が存在しないとき' do
      let!(:params) { nil }

      it 'レスポンス ok が返る' do
        subject
        expect(response).to have_http_status(:ok)
      end

      it 'レスポンスの構造が正しい' do
        subject
        res = response.parsed_body

        aggregate_failures do
          expect(res.keys).to eq ['posts', 'meta']
          expect(res['posts'].length).to eq(0)
          expect(res['meta'].keys).to eq ['next_keyset']
          expect(res['meta']['next_keyset']).to be_nil
        end
      end
    end
  end

  describe 'GET api/v1/current/posts/:id' do
    subject { get(api_v1_current_post_path(post_id), headers:) }

    let!(:current_user) { create(:user) }
    let!(:headers) { current_user.create_new_auth_token }

    context 'ログインユーザーの投稿の場合' do
      let!(:current_user_post) { create(:post, user: current_user) }
      let!(:post_id) { current_user_post.id }

      it '投稿を取得する' do
        aggregate_failures do
          subject
          res = response.parsed_body
          expect(res.keys).to eq ['id', 'content', 'status', 'created_at', 'created_at_from_today', 'updated_at', 'updated_at_from_today', 'user']
          expect(res['user'].keys).to eq ['name', 'nickname']
          expect(response).to have_http_status(:ok)
        end
      end
    end

    context 'ログインユーザー以外の投稿の場合' do
      let!(:other_user_post) { create(:post) }
      let!(:post_id) { other_user_post.id }

      it '投稿を取得できない' do
        aggregate_failures do
          subject
          expect(response).to have_http_status(:not_found)
        end
      end
    end
  end

  describe 'POST api/v1/current/posts' do
    subject { post(api_v1_current_posts_path, headers:) }

    let!(:current_user) { create(:user) }
    let!(:headers) { current_user.create_new_auth_token }

    context 'ログインユーザーがステータス unsaved の投稿を保有していないとき' do
      it 'ステータス unsaved の投稿を作成する' do
        aggregate_failures do
          expect { subject }.to change { current_user.posts.count }.by(1)
          expect(current_user.posts.last).to be_unsaved
          res = response.parsed_body
          expect(res.keys).to eq ['id', 'content', 'status', 'created_at', 'created_at_from_today', 'updated_at', 'updated_at_from_today', 'user']
          expect(res['user'].keys).to eq ['name', 'nickname']
          expect(response).to have_http_status(:ok)
        end
      end
    end

    context 'ログインユーザーがステータス unsaved の投稿を保有していたとき' do
      before { create(:post, user: current_user, status: :unsaved) }

      it '新たな投稿は作成されない' do
        aggregate_failures do
          expect { subject }.not_to change { current_user.posts.count }
          res = response.parsed_body
          expect(res.keys).to eq ['id', 'content', 'status', 'created_at', 'created_at_from_today', 'updated_at', 'updated_at_from_today', 'user']
          expect(res['user'].keys).to eq ['name', 'nickname']
          expect(response).to have_http_status(:ok)
        end
      end
    end
  end

  describe 'PATCH api/v1/current/posts/:id' do
    subject { patch(api_v1_current_post_path(post_id), params:, headers:) }

    let!(:current_user) { create(:user) }
    let!(:headers) { current_user.create_new_auth_token }
    let!(:other_user) { create(:user) }
    let!(:params) { { "post": { "content": "updated content", "status": "published" } } }

    context '投稿がログインユーザーに紐づくものであるとき' do
      let!(:current_user_post) { create(:post, content: 'current user post', user: current_user, status: :draft) }
      let!(:post_id) { current_user_post.id }

      it '投稿の内容が更新される' do
        aggregate_failures do
          expect { subject }.to change { current_user_post.reload.content }.from('current user post').to('updated content') and
            change { current_user_post.reload.status }.from('draft').to('published')
          res = response.parsed_body
          expect(res.keys).to eq ['id', 'content', 'status', 'created_at', 'created_at_from_today', 'updated_at', 'updated_at_from_today', 'user']
          expect(res['user'].keys).to eq ['name', 'nickname']
          expect(response).to have_http_status(:ok)
        end
      end
    end

    context '投稿がログインユーザーのものではないとき' do
      let!(:other_user_post) { create(:post, content: 'other user post', user: other_user, status: :draft) }
      let!(:post_id) { other_user_post.id }

      it '投稿の内容は更新されない' do
        aggregate_failures do
          expect { subject }.not_to change { other_user_post.reload.content }
          expect(response).to have_http_status(:not_found)
        end
      end
    end
  end
end
