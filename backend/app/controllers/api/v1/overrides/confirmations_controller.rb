module Api
  module V1
    module Overrides
      class ConfirmationsController < DeviseTokenAuth::ConfirmationsController
        def create
          user = resource_class.find_by(email: params[:email])

          return head :ok unless user
            user.reload

            if recently_resent?(user)
              return render json: { errors: %w[再送は1分後に行えます] }, status: :too_many_requests
            end

            user.update!(last_confirmation_sent_at: Time.current)
          super
        end

        private

        def recently_resent?(user)
          user.last_confirmation_sent_at.present? &&
            user.last_confirmation_sent_at > 1.minute.ago
        end
      end
    end
  end
end
