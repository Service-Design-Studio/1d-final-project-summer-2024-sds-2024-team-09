# class DropVideosTable < ActiveRecord::Migration[7.0]
#   def change
#     drop_table :videos
#   end
# end
class DropVideosTable < ActiveRecord::Migration[7.1]
  def up
    drop_table :videos
  end

  def down
    create_table :videos do |t|
      t.string :title
      t.integer :duration
      t.timestamps
    end
  end
end
