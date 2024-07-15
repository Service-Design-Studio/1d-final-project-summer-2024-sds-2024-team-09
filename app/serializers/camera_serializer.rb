class CameraSerializer < ActiveModel::Serializer
  attributes :id, :app_id, :channel, :user_id, :created_at, :updated_at, :camera_name, :status
end
