class SignalDataController < ApplicationController
    skip_before_action :verify_authenticity_token
  
    def create
      signal_data = SignalData.new(signal_data_params)
      if signal_data.save
        render json: { status: 'ok', id: signal_data.id }
      else
        render json: { status: 'error', message: signal_data.errors.full_messages }
      end
    end
  
    def show
      signal_data = SignalData.find_by(room: params[:room])
      render json: { status: 'ok', data: signal_data.data }
    end
  
    private
  
    def signal_data_params
      params.require(:signal_data).permit(:room, :data)
    end
  end
  