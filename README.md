# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|text|null: false|
|e_mail|string|null: false, add_index|
|password|string|null: false|

### Association
- has_many :messages
- has_many :groups, through: :group_users


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|text|null: false|
|group_users_id|integer|null: false, foreign_key: true|
|message_id|integer|foreign_key: true|

### Association
- has_many :messages
- has_many :users, through: :group_users


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
