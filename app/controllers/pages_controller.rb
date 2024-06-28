class PagesController < ApplicationController

  def record
    @histories = History.all
  end
  def home
  end

  def user
  end

  def camera
  end

  def camera_broadcast
  end
end
