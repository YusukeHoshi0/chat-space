class Api::MessagesController < ApplicationController
  def index
    last_id = params[:id]
    @messages = Message.where("id > ?", last_id).where(group_id: params[:group_id])
  end
end