class ChangeUuidDefaultInVideos < ActiveRecord::Migration[6.0]
  def change
    change_column_default :videos, :uuid, -> { "gen_random_uuid()" }
  end
end
