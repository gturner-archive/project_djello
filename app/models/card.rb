class Card < ApplicationRecord
  belongs_to :list
  has_many :memberships
  has_many :subscribed_users, through: :memberships, source: :user
end
