class RecordingsController < ApplicationController
    require 'net/http'
    require 'json'
  
    skip_before_action :verify_authenticity_token, only: [:start, :stop]
  
    AGORA_APP_ID = 'd543c7c876734c4a82da72a588edd047'
    AGORA_APP_CERTIFICATE = 'YOUR_AGORA_APP_CERTIFICATE'
    CUSTOMER_ID = 'YOUR_CUSTOMER_ID'
    CUSTOMER_CERTIFICATE = 'YOUR_CUSTOMER_CERTIFICATE'
  
    def start
      resource_id = acquire_resource
      sid = start_recording(resource_id)
      render json: { resourceId: resource_id, sid: sid }
    end
  
    def stop
      resource_id = params[:resourceId]
      sid = params[:sid]
      stop_recording(resource_id, sid)
      render json: { message: 'Recording stopped successfully' }
    end
  
    private
  
    def acquire_resource
      uri = URI("https://api.agora.io/v1/apps/#{AGORA_APP_ID}/cloud_recording/acquire")
      request = Net::HTTP::Post.new(uri, 'Content-Type' => 'application/json')
      request.basic_auth(CUSTOMER_ID, CUSTOMER_CERTIFICATE)
      request.body = {
        cname: params[:channel],
        uid: params[:uid],
        clientRequest: {}
      }.to_json
  
      response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(request) }
      JSON.parse(response.body)['resourceId']
    end
  
    def start_recording(resource_id)
      uri = URI("https://api.agora.io/v1/apps/#{AGORA_APP_ID}/cloud_recording/resourceid/#{resource_id}/mode/mix/start")
      request = Net::HTTP::Post.new(uri, 'Content-Type' => 'application/json')
      request.basic_auth(CUSTOMER_ID, CUSTOMER_CERTIFICATE)
      request.body = {
        cname: params[:channel],
        uid: params[:uid],
        clientRequest: {
          recordingConfig: {
            maxIdleTime: 30,
            streamTypes: 2,
            audioProfile: "audio_profile_high_quality_stereo",
            channelType: 1,
            videoStreamType: 1,
            transcodingConfig: {
              height: 640,
              width: 360,
              bitrate: 500,
              fps: 15,
              mixedVideoLayout: 1,
              backgroundColor: "#FFFFFF"
            }
          },
          storageConfig: {
            vendor: 1, # 1: Amazon S3, 2: Qiniu Cloud, 3: Alibaba Cloud, 4: Tencent Cloud, 5: Kingsoft Cloud
            region: 0, # The region of the storage
            bucket: "rotten-bucket-t",
            accessKey: "YOUR_ACCESS_KEY",
            secretKey: "db9c28bff51cfe0cf54aaf5bd11af9a5d3b79e71d0f146c9b5c7febd6a7a5215172a57d7b27dd35a9e42cec454f183713ac4aa965ca614ba0a775d963575380e",
            fileNamePrefix: ["directory1", "directory2"]
          }
        }
      }.to_json
  
      response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(request) }
      JSON.parse(response.body)['sid']
    end
  
    def stop_recording(resource_id, sid)
      uri = URI("https://api.agora.io/v1/apps/#{AGORA_APP_ID}/cloud_recording/resourceid/#{resource_id}/sid/#{sid}/mode/mix/stop")
      request = Net::HTTP::Post.new(uri, 'Content-Type' => 'application/json')
      request.basic_auth(CUSTOMER_ID, CUSTOMER_CERTIFICATE)
      request.body = {
        cname: params[:channel],
        uid: params[:uid],
        clientRequest: {}
      }.to_json
  
      response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(request) }
      JSON.parse(response.body)
    end
  end
  