require 'rails_helper'

RSpec.describe PagesController, type: :controller do
  describe "GET #home" do
    it "returns a success response" do
      get :home
      puts response.body # Add this line to see the response body in the test output
      expect(response).to be_successful
    end
  end

  describe "GET #user" do
    it "returns a success response" do
      get :user
      puts response.body # Add this line to see the response body in the test output
      expect(response).to be_successful
    end
  end

  describe "GET #camera" do
    it "returns a success response" do
      get :camera
      puts response.body # Add this line to see the response body in the test output
      expect(response).to be_successful
    end
  end

  describe "GET #camera_broadcast" do
    it "returns a success response" do
      get :camera_broadcast
      puts response.body # Add this line to see the response body in the test output
      expect(response).to be_successful
    end
  end
end
