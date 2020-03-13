
create database blog;
use blog;
create table USERS (
	user_id int not null auto_increment primary key,
    username varchar(50) unique,
    name varchar(150),
    email varchar(150) unique,
    password varchar(150)
);


create table Posts (
	post_id int not null auto_increment primary key,
	title varchar(100),
    description varchar(100),
	content text,
	author varchar(50),
	foreign key(author) references Users(username)
);