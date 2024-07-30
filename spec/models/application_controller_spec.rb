# require 'rails_helper'

# RSpec.describe ApplicationController, type: :controller do
#   controller do
#     before_action :require_login

#     def index
#       render plain: "Hello, world!"
#     end
#   end

#   let(:user) { FactoryBot.create(:user) }

#   context 'when user is logged in' do
#     before do
#       log_in(user)
#       get :index
#     end

#     it 'allows access to the action' do
#       expect(response).to have_http_status(:ok)
#     end
#   end

#   context 'when user is not logged in' do
#     before do
#       get :index
#     end

#     # it 'redirects to the login page' do
#     # #   expect(response).to redirect_to(login_url)
#     #   expect(flash[:error]).to eq("You must be logged in to access this section")
#     # end
#   end
# end
