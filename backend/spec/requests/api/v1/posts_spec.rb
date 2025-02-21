RSpec.describe 'Api::V1::Posts', type: :request do
  describe 'GET api/v1/posts' do
    subject { get(api_v1_posts_path) }

    before do
      create_list(:post, 3)
    end

    context '投稿一覧ページにアクセスするとき' do
      it 'アクセスに成功する' do
        subject
        res = response.parsed_body

        aggregate_failures do
          expect(response).to have_http_status(:success)
          expect(res[0].keys).to eq ['id', 'content', 'status', 'created_at', 'from_today', 'user']
          expect(res[0]['user'].keys).to eq ['name']
          expect(res.length).to eq(3)
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
            expect(res.keys).to eq ['id', 'content', 'status', 'created_at', 'from_today', 'user']
            expect(res['user'].keys).to eq ['name']
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
