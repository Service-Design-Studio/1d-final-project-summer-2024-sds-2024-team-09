class SignalingChannel < ApplicationCable::Channel
  def subscribed
    stream_from "signaling_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    # Save the signaling data to the database
    ActionCable.server.broadcast("signaling_channel", data)
  end
end
