json.body @message.body
json.image @message.image.url
json.name @message.user.name
json.date @message.created_at.strftime("%Y/%m/%d(%a) %X")
json.id @message.id