class AddCompletedToActivities < ActiveRecord::Migration[5.0]
  def change
    add_column :cards, :completed, :boolean
  end
end
