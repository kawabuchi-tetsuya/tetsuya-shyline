RSpec.describe 'Api::V1::HealthCheck', type: :request do
  describe 'GET /api/v1/health_check' do
    subject(:request) { get api_v1_health_check_path }

    it '正常にレスポンスが返る' do
      request
      res = response.parsed_body
      aggregate_failures do
        expect(response).to have_http_status(:success)
        expect(res['message']).to eq 'Success Health Check!'
      end
    end
  end
end
