class ChangeUuidDefaultInVideos < ActiveRecord::Migration[7.1]
  def change
    change_column_default :videos, :uuid, -> { "gen_random_uuid()" }
  end
end
