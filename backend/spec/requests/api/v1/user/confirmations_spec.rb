RSpec.describe Api::V1::User::ConfirmationsController, type: :request do
  describe 'PATCH /api/v1/user/confirmations' do
    let!(:user) { create(:user, confirmed_at: nil) }
    let!(:confirmation_token) { user.confirmation_token }
    subject { patch '/api/v1/user/confirmations', params: { confirmation_token: } }

    context 'ユーザーが存在し、未認証であるとき' do
      it 'ユーザーを認証し、レスポンス ok が返る' do
        subject
        aggregate_failures do
          expect(response).to have_http_status(:ok)
          expect(response.parsed_body['message']).to eq('User confirmation succeeded.')
          expect(user.reload.confirmed?).to be_truthy
        end
      end
    end

    context 'ユーザーが存在しないとき' do
      let!(:confirmation_token) { 'invalid_token' }

      it 'レスポンス not found が返る' do
        subject
        aggregate_failures do
          expect(response).to have_http_status(:not_found)
          expect(response.parsed_body['message']).to eq('User record is not found.')
        end
      end
    end

    context 'ユーザーが認証済みのとき' do
      it 'レスポンス bad request が返る' do
        user.update!(confirmed_at: Time.current)
        subject
        aggregate_failures do
          expect(response).to have_http_status(:bad_request)
          expect(response.parsed_body['message']).to eq('User has already been confirmed.')
        end
      end
    end
  end
end
