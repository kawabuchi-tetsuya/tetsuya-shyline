RSpec.describe 'Overrides::Confirmations', type: :request do
  describe 'POST api/v1/auth/confirmation' do
    let!(:user) { create(:user, confirmed_at: nil) }
    let!(:email) { user.email }
    let!(:headers) { { 'Content-Type': 'application/json' } }
    let!(:params) { { email: email, redirect_url: 'http://localhost:3000/api/v1/sign_in' } }

    subject { post '/api/v1/auth/confirmation', params: params.to_json, headers: headers }

    context '認証メールの再送ができるとき' do
      it 'レスポンス ok が返る' do
        subject
        expect(response).to have_http_status(:ok)
      end
    end

    context '前回の再送リクエストから1分経過していないとき' do
      before do
        user.update!(last_confirmation_sent_at: 30.seconds.ago)
      end

      it 'too_many_requests エラーを返す' do
        subject
        expect(response).to have_http_status(:too_many_requests)
        expect(response.parsed_body['errors']).to include('再送は1分後に行えます')
      end
    end

    context '存在しないメールアドレスを指定したとき' do
      let!(:email) { 'nonexistent@example.com' }

      it 'does not return error' do
        subject
        expect(response).to have_http_status(:ok)
      end
    end
  end
end
