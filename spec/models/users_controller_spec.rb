require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  let(:valid_attributes) { { username: 'TestUser', email: 'test@example.com', password: 'password', password_confirmation: 'password' } }
  let(:invalid_attributes) { { username: 'TestUser', email: 'test@example.com', password: 'password', password_confirmation: 'wrong_password' } }
  let(:existing_user) { FactoryBot.create(:user) }

  describe 'GET #new' do
    it 'renders the new template' do
      get :new
      expect(response).to render_template(:new)
      expect(assigns(:user)).to be_a_new(User)
    end
  end

  describe 'POST #create' do
    context 'with valid attributes' do
      it 'creates a new user' do
        expect {
          post :create, params: { user: valid_attributes }
        }.to change(User, :count).by(1)
      end

      it 'redirects to the root path' do
        post :create, params: { user: valid_attributes }
        expect(response).to redirect_to(root_path)
        expect(session[:user_id]).to eq(User.last.id)
      end
    end

    context 'with invalid attributes' do
      it 'does not create a new user' do
        expect {
          post :create, params: { user: invalid_attributes }
        }.not_to change(User, :count)
      end

      it 're-renders the new template with unprocessable entity status' do
        post :create, params: { user: invalid_attributes }
        expect(response).to render_template(:new)
        expect(response).to have_http_status(:unprocessable_entity)
        expect(flash.now[:danger]).to eq('Email already exist or passsword do not match')
      end

      it 'logs a debug message' do
        expect(Rails.logger).to receive(:debug).with("Email already exist or passsword do not match")
        post :create, params: { user: invalid_attributes }
      end
    end

    context 'when email already exists' do
      before { existing_user }

      it 'does not create a new user' do
        expect {
          post :create, params: { user: valid_attributes.merge(email: existing_user.email) }
        }.not_to change(User, :count)
      end

      it 're-renders the new template with unprocessable entity status' do
        post :create, params: { user: valid_attributes.merge(email: existing_user.email) }
        expect(response).to render_template(:new)
        expect(response).to have_http_status(:unprocessable_entity)
        expect(flash.now[:danger]).to eq('Email already exist or passsword do not match')
      end
    end
  end

  describe 'GET #show' do
    let(:user) { FactoryBot.create(:user) }

    it 'renders the show template' do
      get :show, params: { id: user.id }
      expect(response).to render_template(:show)
      expect(assigns(:user)).to eq(user)
    end

    it 'returns a 404 status if the user is not found' do
      expect {
        get :show, params: { id: 'non-existent-id' }
      }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end
end
