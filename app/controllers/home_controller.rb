class HomeController < ApplicationController
  def index
    @user = current_user
    @home_props = { user: @user }
  end
end