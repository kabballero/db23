drop database library;
CREATE DATABASE library;

USE library;

CREATE TABLE school (
schoolID int NOT NULL AUTO_INCREMENT, 
schoolNAME varchar(50) not null,
streetNAME varchar(400),
streetNUMBER int,
zipcode int,
email varchar(50) not null,
phonenumber char(10) not null,
city varchar(30),
principal varchar(200),
primary key (schoolID)
);

CREATE TABLE books(
bookID int NOT NULL AUTO_INCREMENT,
schoolID int,
title varchar(100) not null, -- scraped
publisher varchar(50),
isbn varchar(20) not null UNIQUE,
pages int check(pages>0),
summary varchar(2500),
availability int not null check(availability>=0),
image varchar(1000),
languages varchar(20),
keywords varchar(200),
primary key(bookID),
foreign key(schoolID) references school(schoolID));


CREATE TABLE users (
username varchar(50),
password varchar(50) not null,
fullname varchar(30) not null,
streetname varchar(400),
streetNUMBER int,
zipcode int,
birthdate date not null,
phonenumber char(10) not null,
primary key(username));

CREATE TABLE students(
studentID int NOT NULL AUTO_INCREMENT,
username varchar(50) not null,
schoolID int(5) not null,
studentborrowedbooks int not null, -- check if it is right
primary key(studentID),
foreign key(username) references users(username),
foreign key(schoolID) references school(schoolID),
CHECK(studentborrowedbooks<=2));

CREATE TABLE admins( -- χειροκινητα
adminID int NOT NULL AUTO_INCREMENT,
username varchar(50) not null,
primary key (adminID),
foreign key(username) references users(username));

CREATE TABLE teachers(
teacherID int NOT NULL AUTO_INCREMENT,
username varchar(50) not null,
schoolID int(5) not null,
teacherborrowedbooks int not null,
primary key (teacherID),
foreign key(username) references users(username),
foreign key(schoolID) references school(schoolID),
CHECK(teacherborrowedbooks<=1));

CREATE TABLE operators( -- χειροκινητα
operatorID int NOT NULL AUTO_INCREMENT,
schoolID int(5) not null,
teacherID int(5) not null,
primary key (operatorID),
foreign key (schoolID) references school(schoolID),
foreign key (teacherID) references teachers(teacherID));

CREATE TABLE rating(
ratingID int NOT NULL AUTO_INCREMENT,
texts varchar(500) not null,
likert int not null,
username varchar(50) not null,
bookID int(5) not null,
operatorID int(5) not null,
primary key (ratingID),
foreign key (username) references users(username),
foreign key (bookID) references books(bookID),
foreign key (operatorID) references operators(operatorID));

CREATE TABLE bookCategory(
category varchar(20),
primary key (category));

CREATE TABLE belongs (
category varchar(20),
bookID int(5),
primary key (category,bookID),
foreign key (category) references bookCategory(category),
foreign key (bookID) references books(bookID));

CREATE TABLE authors(
authorID int NOT NULL AUTO_INCREMENT,
authorName varchar(20) not null,
primary key (authorID));

CREATE TABLE written(
authorID int(10),
bookID int(5),
primary key (authorID, bookID),
foreign key (authorID) references authors(authorID),
foreign key(bookID) references books(bookID));

CREATE TABLE teachersrequests(
requestID int NOT NULL AUTO_INCREMENT,
teacherID int(5) not null,
primary key (requestID),
foreign key (teacherID) references teachers(teacherID));

CREATE TABLE borrowrequest(
borrowID int NOT NULL AUTO_INCREMENT,
dateRequest date,
username varchar(50),
bookID int(5),
primary key (borrowID),#edw eixame studentID kai teachersID
foreign key (username) references users(username),
foreign key (bookID) references books(bookID));

CREATE TABLE reservation(
reservationID int NOT NULL AUTO_INCREMENT,
reservationDate date not null,
duedate date not null,
username varchar(50) not null,
bookID int(5) not null,
primary key (reservationID),
foreign key (username) references users(username),
foreign key (bookID) references books(bookID));

CREATE TABLE borrowing(
borrowingID int NOT NULL AUTO_INCREMENT,
borrowDate date not null,
duedate date not null,
returndate date,
username varchar(50) not null,
bookID int(5) not null,
operatorID int(5) not null,
primary key (borrowingID),
foreign key (username) references users(username),
foreign key (operatorID) references operators(operatorID),
foreign key (bookID) references books(bookID));

