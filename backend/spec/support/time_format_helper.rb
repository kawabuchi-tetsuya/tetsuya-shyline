module TimeFormatHelper
  def formatted_time(time)
    time.strftime('%Y-%m-%dT%H:%M:%S.%6N%z')
  end
end
