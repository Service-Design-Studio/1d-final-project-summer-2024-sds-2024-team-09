class SignalDataController < ApplicationController
    skip_before_action :verify_authenticity_token
  
    def create
      room = signal_data_params[:room]
      data = signal_data_params[:data]
      signal_data = SignalData.find_or_initialize_by(room: room)
      signal_data.data = data
  
      if signal_data.save
        head :ok
      else
        render json: { errors: signal_data.errors }, status: :unprocessable_entity
      end
    end
  
    def show
      room = params[:room]
      signal_data = SignalData.find_by(room: room)
      if signal_data
        render json: { data: signal_data.data }
      else
        render json: { data: nil }, status: :not_found
      end
    end

    def create_room
      room = params[:room]
      signal_data = SignalData.create(room: room, data: "")
      if signal_data.persisted?
        render json: { room: room }
      else
        render json: { errors: signal_data.errors }, status: :unprocessable_entity
      end
    end
  
    private
  
    def signal_data_params
      params.require(:signal_data).permit(:room, :data)
    end
  end
  