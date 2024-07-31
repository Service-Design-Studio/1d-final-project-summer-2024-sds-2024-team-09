class VideoSerializer < ActiveModel::Serializer
  attributes :id, :title, :duration, :created_at, :is_critical, :uuid

  belongs_to :camera
  # Add other associations or custom attributes/methods here
end
