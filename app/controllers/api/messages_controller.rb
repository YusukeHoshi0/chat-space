class Api::MessagesController < ApplicationController
  def index
    last_id = params[:id]
    group = Group.find(params[:group_id])
    @messages = group.messages.where("id > ?", last_id)
  end
end