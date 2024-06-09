class VideoFeedChannel < ApplicationCable::Channel
  def subscribed
    stream_from "video_feed_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    # Process the incoming frame data
    frame = data['frame']
    # Broadcast the frame to all subscribers (for demo purposes)
    ActionCable.server.broadcast 'video_feed_channel', frame: frame
  end
end
