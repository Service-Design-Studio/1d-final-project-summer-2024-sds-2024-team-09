class AddThumbnailUrlToVideos < ActiveRecord::Migration[7.1]
  def change
    add_column :videos, :thumbnail_url, :string
  end
end
