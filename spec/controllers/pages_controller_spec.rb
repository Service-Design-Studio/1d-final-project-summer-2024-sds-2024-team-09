require 'rails_helper'

RSpec.describe PagesController, type: :controller do
  render_views

  let(:user) { create(:user) }

  describe 'GET #camera' do
    context 'when not logged in' do
      it 'redirects to the login page' do
        get :camera
        expect(response).to redirect_to(login_path) # Assuming your login path is named login_path
      end
    end

    context 'when logged in' do
      before { log_in user }

      it 'returns a success response' do
        get :camera
        expect(response).to have_http_status(:success)
      end

      it 'assigns @user_setting' do
        get :camera
        expect(assigns(:user_setting)).to eq(user.user_setting || user.create_user_setting)
      end
    end
  end
end
