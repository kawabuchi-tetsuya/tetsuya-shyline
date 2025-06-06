RSpec.describe 'Api::V1::Current::Users', type: :request do
  let(:res) { response.parsed_body }

  describe 'GET /api/v1/current/user' do
    let (:request) { get(api_v1_current_user_path, headers:) }
    let!(:current_user) { create(:user) }

    context 'ヘッダー情報が正常に送られたとき' do
      let!(:headers) { current_user.create_new_auth_token }

      before { request }

      include_examples 'レスポンスステータスが', status: :ok

      it('レスポンスの構造が正しい') { expect(res.keys).to eq %w[name nickname avatar_url email] }
      it('レスポンスの値が正しい') { expect(res['name']).to eq current_user.name }
      it 'avatar_url が nil' do
        aggregate_failures do
          expect(current_user.reload.avatar).not_to be_attached
          expect(res['avatar_url']).to be_nil
        end
      end
    end

    context 'ヘッダー情報が空のままリクエストが送信されたとき' do
      let!(:headers) { nil }

      before { request }

      include_examples 'レスポンスステータスが', status: :unauthorized
      include_examples 'レスポンスエラーメッセージが', message: 'ログインもしくはアカウント登録してください。'
    end
  end

  describe 'PATCH /api/v1/current/user' do
    let(:request) { patch api_v1_current_user_path, params: { user: }, headers: }
    let!(:current_user) { create(:user) }
    let!(:headers) { current_user.create_new_auth_token }

    context '正常なパラメータを送信したとき' do
      let!(:user) { attributes_for(:user) }

      before { request }

      include_examples 'レスポンスステータスが', status: :ok

      it ('nickname が更新される') { expect(current_user.reload.nickname).to eq user[:nickname] }
      it ('email が更新される') { expect(current_user.reload.email).to eq user[:email] }
    end
  end
end
