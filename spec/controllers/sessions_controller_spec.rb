require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  render_views

  let(:user) { create(:user) }

  describe 'GET #new' do
    context 'when not logged in' do
      it 'returns a success response' do
        get :new
        expect(response).to have_http_status(:success)
      end
    end

    context 'when logged in' do
      before { log_in user }

      it 'redirects to root_path' do
        get :new
        expect(response).to redirect_to(root_path)
      end
    end
  end

  describe 'POST #create' do
    context 'with valid credentials' do
      it 'logs in the user and redirects to root_path' do
        post :create, params: { session: { email: user.email, password: user.password } }
        expect(session[:user_id]).to eq(user.id)
        expect(response).to redirect_to(root_path)
      end
    end

    context 'with invalid credentials' do
      it 're-renders the new template with unprocessable_entity status' do
        post :create, params: { session: { email: user.email, password: 'wrongpassword' } }
        expect(session[:user_id]).to be_nil
        expect(response).to render_template(:new)
        expect(response).to have_http_status(422) # Use numeric status code
      end
    end
  end

  describe 'DELETE #destroy' do
    before { log_in user }

    it 'logs out the user and redirects to root_url' do
      delete :destroy
      expect(session[:user_id]).to be_nil
      expect(response).to redirect_to(root_url)
    end
  end
end
