class DevicesController < ApplicationController
    def assign_uid
      device_id = params[:device_id]
      device = Device.find_or_create_by(device_id: device_id) do |dev|
        dev.uid = generate_uid
      end
      render json: { uid: device.uid }
    end
  
    private
  
    def generate_uid
      last_device = Device.order(:created_at).last
      last_uid = last_device ? last_device.uid.to_i : 0
      new_uid = last_uid + 1
      new_uid.to_s.rjust(5, '0')
    end
  end