Rails.application.routes.draw do

  devise_for :users
  root to: 'single_pages#show'

  scope :api do
    scope :v1 do
      resources :boards, only: [:index, :create, :destroy, :update]
      resources :lists, only: [:create, :destroy, :index, :update]
      resources :cards, only: [:index, :create, :update] do
        resources :memberships, only: [:index, :create, :destroy]
      end
      resources :users, only: [:index]
      resources :subscriptions, only: [:index]
    end
  end

end
