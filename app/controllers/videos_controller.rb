class VideosController < ApplicationController
  before_action :require_login
  before_action :set_video, only: [:show, :edit, :update, :destroy]

  def user
    @user_setting = current_user.user_setting || current_user.create_user_setting
    @videos = current_user.videos # Fetch videos belonging to the current user
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
    flash.now[:error] = "Unable to fetch crying snippets. Please try again later."
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
      Rails.logger.debug "Video Path after Upload: #{@video.file_path}"
      redirect_to @video, notice: 'Video was successfully created.'
    else
      render :new
    end
  end

  def update
    @video = current_user.videos.find_by(uuid: params[:id]) || current_user.videos.find(params[:id])

    # Preserve the original file path unless explicitly changed
    original_file_path = @video.file_path
    Rails.logger.debug "Original file path: #{original_file_path}"

    if @video.update(video_params.except(:file_path))
      if video_params[:file_path].blank?
        @video.update(file_path: original_file_path)
        Rails.logger.debug "File path preserved: #{original_file_path}"
      end
      respond_to do |format|
        format.json { render json: @video, status: :ok }
        format.html { redirect_to @video, notice: 'Video was successfully updated.' }
      end
    else
      Rails.logger.error "Failed to update video: #{@video.errors.full_messages.join(', ')}"
      respond_to do |format|
        format.json { render json: @video.errors, status: :unprocessable_entity }
        format.html { render :edit }
      end
    end
  end

  def destroy
    @video = current_user.videos.find_by(uuid: params[:id]) || current_user.videos.find(params[:id])
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

    # Fetch videos for the current user, sorted by the specified column and order
    @videos = current_user.videos.order("#{sort_by} #{order}")

    # Map the video attributes to a hash, ensuring we handle cases where the attachment might be nil
    videos_with_urls = @videos.map do |video|
      file_path_url = "https://storage.googleapis.com/video-upload-jya/#{video.title}.webm"

      {
        id: video.id,
        title: video.title,
        created_at: video.created_at,
        duration: video.duration,
        file_path_url: file_path_url,
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
      Rails.logger.debug "Generated signed URL: #{signed_url}"
      signed_url
    else
      Rails.logger.error "File not found: #{file_path}"
      nil
    end
  end

  def upload_to_gcs(video)
    storage = Google::Cloud::Storage.new
    bucket = storage.bucket("video-upload-jya")
    object_name = "videos/#{current_user.id}/#{video.uuid}/#{video.recorded_at.strftime('%Y%m%d%H%M%S')}.webm"
    file = bucket.create_file(video.file_path, object_name)
    video.update_columns(file_path: object_name)
  end

  def delete_from_gcs(file_path)
    storage = Google::Cloud::Storage.new
    bucket = storage.bucket("video-upload-jya")
    file = bucket.file(file_path)

    if file
      file.delete
      Rails.logger.info "File with key #{file_path} deleted from GCS bucket video-upload-jya"
    else
      Rails.logger.error "File with key #{file_path} not found in GCS bucket video-upload-jya"
      false
    end
  end
end
