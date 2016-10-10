class ChangeCompletedOnCard < ActiveRecord::Migration[5.0]
  def change
    change_column :cards, :completed, :boolean, :default => false
  end
end
