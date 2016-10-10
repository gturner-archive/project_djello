class Card < ApplicationRecord
  belongs_to :list
  has_many :memberships, dependent: :destroy
  has_many :subscribed_users, through: :memberships, source: :user
  has_many :activities, dependent: :destroy

end
