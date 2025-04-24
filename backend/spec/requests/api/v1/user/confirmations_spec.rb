RSpec.describe Api::V1::User::ConfirmationsController, type: :request do
  let(:res) { response.parsed_body }

  describe 'PATCH /api/v1/user/confirmations' do
    let(:request) { patch '/api/v1/user/confirmations', params: { confirmation_token: } }
    let!(:user) { create(:user, confirmed_at: nil) }
    let!(:confirmation_token) { user.confirmation_token }

    context 'ユーザーが存在し、未認証であるとき' do
      include_examples 'レスポンスステータスが', status: :ok

      it 'ユーザーを認証が成功する' do
        request
        aggregate_failures do
          expect(res['message']).to eq('User confirmation succeeded.')
          expect(user.reload.confirmed?).to be_truthy
        end
      end
    end

    context 'ユーザーが存在しないとき' do
      let!(:confirmation_token) { 'invalid_token' }

      include_examples 'レスポンスステータスが', status: :not_found

      it 'ユーザー認証が失敗する' do
        request
        expect(res['message']).to eq('User record is not found.')
        expect(user.reload.confirmed?).to be_falsey
      end
    end

    context 'ユーザーが認証済みのとき' do
      before { user.update!(confirmed_at: Time.current) }

      include_examples 'レスポンスステータスが', status: :bad_request

      it '認証済みであるメッセージが返る' do
        request
        expect(res['message']).to eq('User has already been confirmed.')
        expect(user.reload.confirmed?).to be_truthy
      end
    end
  end
end
