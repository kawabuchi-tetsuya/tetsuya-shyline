RSpec.describe 'Api::V1::Current::User::Avatars', type: :request do
  let(:res) { response.parsed_body }
  let!(:current_user) { create(:user) }
  let!(:headers) { current_user.create_new_auth_token }

  describe 'PATCH /api/v1/current/user/avatars' do
    let(:request) { patch api_v1_current_user_avatar_path, params: { avatar: }, headers: }

    context 'avatar を送信したとき' do
      let!(:avatar) { fixture_file_upload('sample.jpg') }

      before { request }

      include_examples 'レスポンスステータスが', status: :ok

      it('アバターがアップロードされる') { expect(current_user.reload.avatar.attached?).to be true }
      it('アバターのURLが返る') { expect(res['avatar_url']).to end_with('/sample.jpg') }
    end

    context 'avatar が未送信のとき' do
      let!(:avatar) { nil }

      before { request }

      include_examples 'レスポンスステータスが', status: :unprocessable_entity

      it ('アバターがアップロードされない') { expect(current_user.reload.avatar.attached?).to be false }
      it ('エラーメッセージが返る') { expect(res['errors'].length).to eq 1 }
    end
  end
end
