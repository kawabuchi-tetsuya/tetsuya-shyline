class PostSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  include ActionView::Helpers::AssetUrlHelper
  Rails.application.routes.default_url_options[:host] = ENV.fetch('APP_HOST', Settings.api_domain)

  attributes :id, :content, :status, :created_at, :created_at_from_today, :updated_at, :updated_at_from_today, :original_image_urls, :thumbnail_urls
  belongs_to :user, serializer: UserSerializer

  def created_at
    object.created_at.strftime('%Y年%m月%d日 %H時%M分%S秒')
  end

  def created_at_from_today
    from_today(object.created_at)
  end

  def original_image_urls
    return [] unless object.images.attached?

    object.images.map do |img|
      Rails.application.routes.url_helpers.url_for(img)
    end
  end

  def thumbnail_urls
    return [] unless object.images.attached?

    object.images.map do |img|
      Rails.application.routes.url_helpers.rails_representation_url(
        img.variant(:thumb),
      )
    end
  end

  def updated_at
    object.updated_at.strftime('%Y年%m月%d日 %H時%M分%S秒')
  end

  def updated_at_from_today
    from_today(object.updated_at)
  end

  def status
    object.status_i18n
  end

  private

  def format_days_hours_minutes_or_seconds(datetime, now)
    seconds = (now - datetime).round
    return "#{seconds / (60 * 60 * 24)}日前" if seconds >= 86_400
    return "#{seconds / (60 * 60)}時間前" if seconds >= 3_600
    return "#{seconds / 60}分前" if seconds >= 60
    "#{seconds}秒前"
  end

  def format_years_or_months(datetime, now)
    months = (now.year - datetime.year) * 12 + now.month - datetime.month - ((now.day >= datetime.day) ? 0 : 1)
    years = months / 12

    return "#{years}年前" if years.positive?
    "#{months}ヶ月前"
  end

  def from_today(datetime)
    now = Time.zone.now

    return format_years_or_months(datetime, now) if years_or_months_ago?(datetime, now)
    format_days_hours_minutes_or_seconds(datetime, now)
  end

  def years_or_months_ago?(datetime, now)
    (now.year - datetime.year).positive? || (now.month - datetime.month - ((now.day >= datetime.day) ? 0: 1)).positive?
  end
end
