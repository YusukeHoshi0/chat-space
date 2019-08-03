class UsersController < ApplicationController

  def index
    if params[:keyword].length == 0
      @users = []
    else
      @users = User.where.not(id: params[:added_member]).where('name LIKE(?)', "#{params[:keyword]}%")
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
