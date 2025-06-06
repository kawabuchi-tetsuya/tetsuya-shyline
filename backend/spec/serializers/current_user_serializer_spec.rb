RSpec.describe CurrentUserSerializer, type: :serializer do
  subject { CurrentUserSerializer.new(user).as_json }

  let!(:user) { create(:user) }

  it '含まれる属性が正しい' do
    expect(subject.keys).to include(*%i[name nickname avatar_url email])
  end
end
