RSpec.describe '認証API', type: :request do
  let!(:user) { create(:user, confirmed_at: Time.current) }

  describe 'POST /api/v1/auth/sign_in' do
    it '正しいメールアドレス・パスワードでログインできる' do
      post '/api/v1/auth/sign_in', params: { email: user.email, password: user.password }
      aggregate_failures do
        expect(response).to have_http_status(:success)
        expect(response.headers['access-token']).to be_present
        expect(response.headers['client']).to be_present
        expect(response.headers['uid']).to be_present
      end
    end

    it '誤ったパスワードではログインできない' do
      post '/api/v1/auth/sign_in', params: { email: user.email, password: 'wrong_password' }
      aggregate_failures do
        expect(response).to have_http_status(:unauthorized)
        expect(response.headers['access-token']).to be_blank
        expect(response.headers['client']).to be_blank
        expect(response.headers['uid']).to be_blank
      end
    end
  end

  describe 'DELETE /api/v1/auth/sign_out' do
    it 'ログアウトできる' do
      delete '/api/v1/auth/sign_out', headers: user.create_new_auth_token
      aggregate_failures do
        expect(response).to have_http_status(:success)
        expect(response.headers['access-token']).to be_blank
        expect(response.headers['client']).to be_blank
        expect(response.headers['uid']).to be_blank
      end
    end
  end
end
