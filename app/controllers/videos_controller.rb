class VideosController < ApplicationController
  before_action :require_login
  before_action :set_video, only: [:show, :edit, :update, :destroy]

  def user
    @user_setting = current_user.user_setting || current_user.create_user_setting
    @videos = current_user.videos
  end

  def index
    @videos = Video.all
    case params[:sort_by]
    when 'title'
      @videos = @videos.order(title: params[:order] == 'desc' ? :desc : :asc)
    when 'duration'
      @videos = @videos.order(duration: params[:order] == 'desc' ? :desc : :asc)
    else
      @videos = @videos.order(created_at: params[:order] == 'desc' ? :desc : :asc)
    end
  rescue ActiveRecord::ActiveRecordError => e
    flash.now[:error] = "Unable to fetch videos. Please try again later."
    @videos = []
  end

  def show
    @video = current_user.videos.find_by(title: CGI.unescape(params[:title]))
    if @video
      signed_url = generate_signed_url_for(@video.file_path)
      render json: { signed_url: signed_url }, status: :ok
    else
      render json: { error: 'Video not found' }, status: :not_found
    end
  end

  def new
    @video = Video.new
  end

  def edit
  end

  def create
    @video = current_user.videos.new(video_params)
    if @video.save
      upload_to_gcs(@video)
      redirect_to @video, notice: 'Video was successfully created.'
    else
      render :new
    end
  end

  def update
    if @video.update(video_params.except(:file_path))
      respond_to do |format|
        format.json { render json: @video, status: :ok }
        format.html { redirect_to @video, notice: 'Video was successfully updated.' }
      end
    else
      respond_to do |format|
        format.json { render json: @video.errors, status: :unprocessable_entity }
        format.html { render :edit }
      end
    end
  end

  def destroy
    if @video.destroy
      delete_from_gcs(@video.file_path)
      head :no_content
    else
      render json: { error: 'Failed to destroy the video.' }, status: :unprocessable_entity
    end
  end

  def history
    @videos = current_user.videos.order(created_at: :desc)
  end

  def list
    @videos = Video.all
    @headers = Video.column_names
  end

  def api_index
    sort_by = params[:sort_by] || 'created_at'
    order = params[:order] || 'asc'

    @videos = current_user.videos.order("#{sort_by} #{order}")

    videos_with_urls = @videos.map do |video|
      file_path_url = "https://storage.googleapis.com/video-upload-jya/#{video.file_path}"
      thumbnail_url = video.thumbnail_url.present? ? video.thumbnail_url : "https://storage.googleapis.com/video-upload-jya/default_thumbnail.jpg"

      {
        id: video.id,
        title: video.title,
        created_at: video.created_at,
        duration: video.duration,
        file_path_url: file_path_url,
        thumbnail_url: thumbnail_url,
        uuid: video.uuid
      }
    end
    render json: videos_with_urls
  end

  private

  def video_params
    params.require(:video).permit(:title, :file, :file_path, :duration, :user_id, :recorded_at)
  end

  def set_video
    @video = current_user.videos.find_by(uuid: params[:id]) || current_user.videos.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Video not found' }, status: :not_found
  end

  def generate_signed_url_for(file_path)
    storage = Google::Cloud::Storage.new
    bucket = storage.bucket("video-upload-jya")
    file = bucket.file(file_path)

    if file
      signed_url = file.signed_url(
        method: "GET",
        expires: 600, # URL expires in 10 minutes
        headers: { "Access-Control-Allow-Origin" => "*" } # Allow CORS
      )
      signed_url
    else
      nil
    end
  end

  def upload_to_gcs(video)
    temp_file_path = save_temp_video_file(video)

    storage = Google::Cloud::Storage.new
    bucket = storage.bucket("video-upload-jya")
    object_name = "#{current_user.id}/#{video.uuid}/#{video.title}.webm"
    file = bucket.create_file(temp_file_path, object_name)
    video.update_columns(file_path: object_name)

    generate_and_upload_thumbnail(video)

    File.delete(temp_file_path) if File.exist?(temp_file_path)
  end

  def save_temp_video_file(video)
    temp_file_path = "#{Rails.root}/tmp/#{video.uuid}.webm"
    File.open(temp_file_path, 'wb') do |file|
      file.write(video.file.download)
    end
    temp_file_path
  end

  def generate_and_upload_thumbnail(video)
    input_file_path = "#{Rails.root}/tmp/#{video.uuid}.webm"
    output_file_path = "#{Rails.root}/tmp/#{video.uuid}_thumbnail.jpg"

    begin
      FFMPEG.ffmpeg_binary = 'C:/Users/Lee Jya Yin/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg.Essentials_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-7.0.1-essentials_build/bin/ffmpeg.exe'
      FFMPEG.ffprobe_binary = 'C:/Users/Lee Jya Yin/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg.Essentials_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-7.0.1-essentials_build/bin/ffprobe.exe'

      movie = FFMPEG::Movie.new(input_file_path)
      movie.screenshot(output_file_path, seek_time: 0)
      
      storage = Google::Cloud::Storage.new
      bucket = storage.bucket("video-upload-jya")
      thumbnail_name = "#{current_user.id}/#{video.uuid}/thumbnail.jpg"
      file = bucket.create_file(output_file_path, thumbnail_name)
      
      video.update_columns(thumbnail_url: file.public_url)
    rescue => e
      Rails.logger.error "Failed to generate/upload thumbnail: #{e.message}"
    ensure
      File.delete(output_file_path) if File.exist?(output_file_path)
    end
  end

  def delete_from_gcs(file_path)
    storage = Google::Cloud::Storage.new
    bucket = storage.bucket("video-upload-jya")
    file = bucket.file(file_path)

    if file
      file.delete
    else
      Rails.logger.error "File not found in GCS: #{file_path}"
    end
  end
end
