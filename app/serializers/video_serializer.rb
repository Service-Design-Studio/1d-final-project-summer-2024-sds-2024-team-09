class VideoSerializer < ActiveModel::Serializer
  attributes :id, :title, :duration, :created_at, :is_critical, :uuid
  # Add other associations or custom attributes/methods here
end
