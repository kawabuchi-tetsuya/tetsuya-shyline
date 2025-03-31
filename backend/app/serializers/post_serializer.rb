class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :status, :created_at, :from_today
  belongs_to :user, serializer: UserSerializer

  def created_at
    object.created_at.strftime('%Y年%m月%d日 %H時%M分%S秒')
  end

  def from_today
    now = Time.zone.now
    created_at = object.created_at

    return format_years_or_months(created_at, now) if years_or_months_ago?(created_at, now)
    format_days_hours_minutes_or_seconds(created_at, now)
  end

  def status
    object.status_i18n
  end

  private

  def format_days_hours_minutes_or_seconds(created_at, now)
    seconds = (now - created_at).round
    return "#{seconds / (60 * 60 * 24)}日前" if seconds >= 86_400
    return "#{seconds / (60 * 60)}時間前" if seconds >= 3_600
    return "#{seconds / 60}分前" if seconds >= 60
    "#{seconds}秒前"
  end

  def format_years_or_months(created_at, now)
    months = (now.year - created_at.year) * 12 + now.month - created_at.month - ((now.day >= created_at.day) ? 0 : 1)
    years = months / 12

    return "#{years}年前" if years.positive?
    "#{months}ヶ月前"
  end

  def years_or_months_ago?(created_at, now)
    (now.year - created_at.year).positive? || (now.month - created_at.month - ((now.day >= created_at.day) ? 0: 1)).positive?
  end
end
