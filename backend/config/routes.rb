Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?
  namespace :api do
    namespace :v1 do
      get 'health_check', to: 'health_check#index'
      mount_devise_token_auth_for 'User', at: 'auth'

      namespace :current do
        resource :user, only: %i[show]
        resources :posts, only: %i[create update]
      end
      resources :posts, only: %i[index show]
    end
  end
end
