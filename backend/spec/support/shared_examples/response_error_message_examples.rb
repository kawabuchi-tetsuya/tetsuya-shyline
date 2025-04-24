RSpec.shared_examples 'レスポンスエラーメッセージが' do |message:|
  it "レスポンスエラーメッセージ #{message} が含まれる" do
    request
    expect(res['errors']).to eq([message])
  end
end
