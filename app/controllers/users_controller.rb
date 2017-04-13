class UsersController < ApplicationController
  def show
    @user = current_user
    @courses = Course.all
  end
end