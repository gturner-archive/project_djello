class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

 has_many :boards_users, foreign_key: :user_id
 has_many :boards, through: :boards_users
 has_many :lists, through: :boards
 has_many :cards, through: :lists
 has_many :memberships
 has_many :subscribed_cards, through: :memberships, source: :card
 has_many :activities

end
