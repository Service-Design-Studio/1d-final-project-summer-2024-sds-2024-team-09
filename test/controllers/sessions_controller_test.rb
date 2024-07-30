require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user_params = { username: unique_username, email: 'test@example.com', password: 'password', password_confirmation: 'password' }
    post users_url, params: { user: @user_params }
    @user = User.find_by(email: 'test@example.com')
  end

  test "should get new when not logged in" do
    get new_session_url
    assert_response :success
  end

  test "should redirect to root when already logged in" do
    log_in_as(@user)
    get new_session_url
    assert_redirected_to root_path
  end

  test "should create session with valid credentials" do
    post sessions_create_url, params: { session: { email: @user.email, password: 'password' } }
    assert_redirected_to root_path
    assert is_logged_in?
  end

  test "should not create session with invalid credentials" do
    post sessions_create_url, params: { session: { email: @user.email, password: 'wrong_password' } }
    assert_response :unprocessable_entity
    assert_not is_logged_in?
    assert_select 'div.alert', 'Invalid email/password combination'
  end

  test "should destroy session" do
    log_in_as(@user)
    delete session_url
    assert_redirected_to root_url
    assert_not is_logged_in?
  end

  private

  def log_in_as(user)
    post sessions_create_url, params: { session: { email: user.email, password: 'password' } }
  end

  def is_logged_in?
    !session[:user_id].nil?
  end

  def unique_username
    "testuser_#{SecureRandom.hex(8)}"
  end
end

