RSpec.describe 'Overrides::Confirmations', type: :request do
  let(:res) { response.parsed_body }

  describe 'POST api/v1/auth/confirmation' do
    let (:request) { post '/api/v1/auth/confirmation', params: params.to_json, headers: headers }
    let!(:user) { create(:user, confirmed_at: nil) }
    let!(:email) { user.email }
    let!(:headers) { { 'Content-Type': 'application/json' } }
    let!(:params) { { email: email, redirect_url: 'http://localhost:3000/api/v1/sign_in' } }


    context '認証メールの再送ができるとき' do
      before { request }

      include_examples 'レスポンスステータスが', status: :ok
    end

    context '前回の再送リクエストから1分経過していないとき' do
      before do
        user.update!(last_confirmation_sent_at: 30.seconds.ago)
        request
      end

      include_examples 'レスポンスステータスが', status: :too_many_requests
      include_examples 'レスポンスエラーメッセージが', message: '再送は1分後に行えます'
    end

    context '存在しないメールアドレスを指定したとき' do
      let!(:email) { 'nonexistent@example.com' }

      before { request }

      include_examples 'レスポンスステータスが', status: :ok
    end
  end
end
