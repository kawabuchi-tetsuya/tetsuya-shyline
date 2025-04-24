def fixture_file(filename, type)
  fixture_path = Rails.root.join('spec/fixtures/files', filename)
  fixture_file_upload(fixture_path, type)
end
