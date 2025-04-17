RSpec.describe 'Api::V1::Posts', type: :request do
  describe 'GET api/v1/posts' do
    subject { get(api_v1_posts_path(params)) }

    before do
      create_list(:post, Post::POSTS_PER_PAGE * 2, status: :published)
    end

    context 'params がnilのとき' do
      let!(:params) { nil }

      it 'レスポンス ok が返る' do
        subject
        expect(response).to have_http_status(:ok)
      end

      it 'レスポンスの構造が正しい' do
        subject
        res = response.parsed_body

        aggregate_failures do
          expect(res.keys).to eq %w[posts meta]
          expect(res['posts'][0].keys).to eq %w[id content status created_at created_at_from_today updated_at updated_at_from_today user]
          expect(res['posts'][0]['user'].keys).to eq %w[name nickname]
          expect(res['meta'].keys).to eq %w[next_keyset]
          expect(res['meta']['next_keyset'].keys).to eq %w[updated_at id]
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
        last_post = Post.published.order(updated_at: :desc, id: :desc).limit(Post::POSTS_PER_PAGE).last

        aggregate_failures do
          expect(res['meta']['next_keyset']['updated_at']).to eq(
            last_post.updated_at.strftime('%Y-%m-%dT%H:%M:%S.%6N%z'),
          )
          expect(res['meta']['next_keyset']['id']).to eq(last_post.id)
        end
      end
    end

    context "params で#{Post::POSTS_PER_PAGE}件目の updated_at と id を渡すとき" do
      let!(:keyset_post) { Post.published.order(updated_at: :desc, id: :desc).limit(Post::POSTS_PER_PAGE).last }
      let!(:params) { { updated_at: keyset_post.updated_at.strftime('%Y-%m-%dT%H:%M:%S.%6N%z'), id: keyset_post.id } }

      it 'レスポンス ok が返る' do
        subject
        expect(response).to have_http_status(:ok)
      end

      it 'レスポンスの構造が正しい' do
        subject
        res = response.parsed_body

        aggregate_failures do
          expect(res.keys).to eq %w[posts meta]
          expect(res['posts'][0].keys).to eq %w[id content status created_at created_at_from_today updated_at updated_at_from_today user]
          expect(res['posts'][0]['user'].keys).to eq %w[name nickname]
          expect(res['meta'].keys).to eq %w[next_keyset]
          expect(res['meta']['next_keyset'].keys).to eq %w[updated_at id]
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
        last_post = Post.published.order(updated_at: :desc, id: :desc).limit(Post::POSTS_PER_PAGE * 2).last

        aggregate_failures do
          expect(res['meta']['next_keyset']['updated_at']).to eq(
            last_post.updated_at.strftime('%Y-%m-%dT%H:%M:%S.%6N%z'),
          )
          expect(res['meta']['next_keyset']['id']).to eq(last_post.id)
        end
      end

      it "取得されたレコードの1件目がDBの#{Post::POSTS_PER_PAGE + 1}件目である" do
        subject
        res = response.parsed_body
        first_post = Post.published.order(updated_at: :desc, id: :desc).limit(Post::POSTS_PER_PAGE).offset(Post::POSTS_PER_PAGE).first

        expect(res['posts'][0]['id']).to eq(first_post.id)
      end

      it "取得されたレコードの#{Post::POSTS_PER_PAGE}件目がDBの#{Post::POSTS_PER_PAGE * 2}件目である" do
        subject
        res = response.parsed_body
        last_post = Post.published.order(updated_at: :desc, id: :desc).limit(Post::POSTS_PER_PAGE).offset(Post::POSTS_PER_PAGE).last

        expect(res['posts'][Post::POSTS_PER_PAGE - 1]['id']).to eq(last_post.id)
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
          expect(res.keys).to eq %w[posts meta]
          expect(res['posts'].length).to eq(0)
          expect(res['meta'].keys).to eq %w[next_keyset]
          expect(res['meta']['next_keyset']).to be_nil
        end
      end
    end
  end

  describe 'GET api/v1/posts/:id' do
    subject { get(api_v1_post_path(post_id)) }

    context '存在する投稿詳細ページにアクセスするとき' do
      context 'ステータスが published のとき' do
        let!(:published_post) { create(:post, status: :published) }
        let!(:post_id) { published_post.id }

        it 'アクセスに成功する' do
          subject
          res = response.parsed_body

          aggregate_failures do
            expect(response).to have_http_status(:success)
            expect(res.keys).to eq %w[id content status created_at created_at_from_today updated_at updated_at_from_today user]
            expect(res['user'].keys).to eq %w[name nickname]
          end
        end
      end

      context 'ステータスが draft のとき' do
        let!(:draft_post) { create(:post, status: :draft) }
        let!(:post_id) { draft_post.id }

        it '404エラーが返る' do
          subject
          expect(response).to have_http_status(:not_found)
        end
      end
    end

    context '存在しない投稿詳細ページにアクセスするとき' do
      let!(:post_id) { 999_999_999 }

      it '404エラーが返る' do
        subject
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
