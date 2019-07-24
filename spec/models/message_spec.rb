require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do
    context 'can save' do
      it "is valid with a body" do
        expect(build(:message, image: "")).to be_valid
      end
      it 'is valid with a image' do
        expect(build(:message, body: "")).to be_valid
      end
      it 'is valid with a body and a image' do
        expect(build(:message)).to be_valid
      end
    end
    context 'can not save' do
      it 'is invalid without a body and a image' do
        message = build(:message, body: "", image: "")
        message.valid?
        expect(message.errors[:body]).to include('を入力してください')
      end
      it 'is invalid without a group_id' do
        message = build(:message, group_id: "")
        message.valid?
        expect(message.errors[:group]).to include('を入力してください')
      end
      it 'is invalid without a user_id' do
        message = build(:message, user_id: "")
        message.valid?
        expect(message.errors[:user]).to include('を入力してください')
      end
    end
  end
end