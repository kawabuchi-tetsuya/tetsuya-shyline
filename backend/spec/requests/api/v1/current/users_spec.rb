RSpec.describe 'Api::V1::Current::Users', type: :request do
  let(:res) { response.parsed_body }

  describe 'GET /api/v1/current/user' do
    let (:request) { get(api_v1_current_user_path, headers:) }
    let!(:current_user) { create(:user) }

    context 'ヘッダー情報が正常に送られたとき' do
      let!(:headers) { current_user.create_new_auth_token }

      before { request }

      include_examples 'レスポンスステータスが', status: :ok

      it('レスポンスの構造が正しい') { expect(res.keys).to eq %w[id name nickname email] }
      it('レスポンスの値が正しい') { expect(res['id']).to eq current_user.id }
    end

    context 'ヘッダー情報が空のままリクエストが送信されたとき' do
      let!(:headers) { nil }

      before { request }

      include_examples 'レスポンスステータスが', status: :unauthorized
      include_examples 'レスポンスエラーメッセージが', message: 'ログインもしくはアカウント登録してください。'
    end
  end
end
