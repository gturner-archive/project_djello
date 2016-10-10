class Board < ApplicationRecord

  has_many :boards_users, foreign_key: :board_id, dependent: :destroy
  has_many :users, through: :boards_users

  has_many :lists, dependent: :destroy

end
