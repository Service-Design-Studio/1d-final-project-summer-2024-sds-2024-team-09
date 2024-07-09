# class VideosController < ApplicationController
#     before_action :require_login
    
#     def user
#         @user_setting = current_user.user_setting || current_user.create_user_setting
#         @videos = Video.all # Assuming you have a Video model and you want to list all videos
#       end
    
#     def index
#       @videos = Video.all
#     end
  
#     def create
#       @video = Video.new(video_params)
#       if @video.save
#         redirect_to videos_path, notice: "Video was successfully uploaded."
#       else
#         render :index
#       end
#     end
  
#     private
  
#     def video_params
#       params.require(:video).permit(:title, :file)
#     end
#   end

class VideosController < ApplicationController
  before_action :require_login
  
  def user
      @user_setting = current_user.user_setting || current_user.create_user_setting
      @videos = Video.all # Assuming you have a Video model and you want to list all videos
    end
  
  def index
    @videos = Video.all
  end

  def create
    @video = current_user.videos.build(video_params)
    if @video.save
      redirect_to videos_path, notice: "Video was successfully uploaded."
    else
      render :index
    end
  end

  def update
    if @video.update(video_params)
      render json: @video
    else
      render json: @video.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @video.destroy
    head :no_content
  end

  def api_index
    @videos = current_user.videos.order(created_at: :desc)
    render json: @videos.map { |video| video.as_json.merge(file_path_url: url_for(video.file)) }
  end

  private

  def video_params
    params.require(:video).permit(:title, :file)
  end

  def set_video
    @video = current_user.videos.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Video not found' }, status: :not_found
  end
end