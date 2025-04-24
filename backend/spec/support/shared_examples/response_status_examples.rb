RSpec.shared_examples 'レスポンスステータスが' do |status:|
  it "レスポンス #{status} が返る" do
    request
    expect(response).to have_http_status(status)
  end
end
