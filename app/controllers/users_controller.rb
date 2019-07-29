class UsersController < ApplicationController

  def index
    @group = Group.find(params[:group_id])
    @users = @group.users.where('name LIKE(?)', "#{params[:keyword]}%")
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
