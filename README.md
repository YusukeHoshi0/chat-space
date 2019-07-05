# README

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, index: true|
|email|string|null: false, unique: true|
|password|string|null: false|

### Association
- has_many :users_groups, dependent: :destroy
- has_many :groups, through: :users_groups
- has_many :messages, dependent: :destroy


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|

### Association
- has_many :users_groups, dependent: :destroy
- has_many :users, through: :users_groups
- has_many :messages, dependent: :destroy


## users_groupsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true, index: true|
|group_id|references|null: false, foreign_key: true, index: true|

### Association
- belongs_to :user
- belongs_to :group


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|string|null: false|
|image|string||
|user_id|references|null: false, foreign_key: true, index: true|
|group_id|references|null: false, foreign_key: true, index: true|

### Association
- belongs_to :user
- belongs_to :group