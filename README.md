# README

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, index: true|
|email|string|null: false, unique: true|
|password|string|null: false|

### Association
- has_many :user_groups
- has_many :groups, through: :user_groups
- has_many :messages


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|

### Association
- has_many :user_groups
- has_many :users, through: :user_groups
- has_many :messages


## user_groupsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|foreign_key|
|group_id|references|foreign_key|

### Association
- belongs_to :user
- belongs_to :group


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user_id|references|foreign_key|
|group_id|references|foreign_key|

### Association
- belongs_to :user
- belongs_to :group