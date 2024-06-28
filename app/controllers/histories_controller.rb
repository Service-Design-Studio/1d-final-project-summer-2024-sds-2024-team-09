class HistoriesController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:create, :update]
  
    def index
      @histories = History.all
    end
  
    def create
      @history = History.new(history_params)
      if @history.save
        render json: @history, status: :created
      else
        render json: @history.errors, status: :unprocessable_entity
      end
    end
  
    def update
      @history = History.find(params[:id])
      if @history.update(history_params)
        render json: @history, status: :ok
      else
        render json: @history.errors, status: :unprocessable_entity
      end
    end
  
    private
  
    def history_params
      params.require(:history).permit(:start_time, :end_time, :video_path)
    end
  end
  