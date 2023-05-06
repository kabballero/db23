drop schema library;
CREATE DATABASE library;
USE library;
CREATE TABLE school (
schoolID varchar(5),
schoolNAME varchar(50) not null,
streetNAME varchar(40),
zipcode int,
email varchar(50),
phonenumber varchar(15),
city varchar(30),
principal varchar(200),
primary key (schoolID)
);

CREATE TABLE books(
bookID varchar(10),
schoolID varchar(5),
title varchar(100) not null,
publisher varchar(50),
isbn varchar(20) not null,
pages int,
summary varchar(1500),
image blob,
languages varchar(20),
keywords varchar(200),
primary key(bookID),
foreign key(schoolID) references school(schoolID)
);


CREATE TABLE users (
userid int(5),
username varchar(50),
userpassword varchar(50) not null,
named varchar(40),
address varchar(50),
birthdate date not null,
phonenumber char(20) not null,
primary key(userid)
);

CREATE TABLE students(
studentID char(5),
userid int(5),
schoolID varchar(5),
primary key(studentID),
foreign key(userid) references users(userid),
foreign key(schoolID) references school(schoolID));

CREATE TABLE admins(
adminID varchar(5),
userid int(5),
primary key (adminID),
foreign key(userid) references users(userid));

CREATE TABLE teachers(
teacherID varchar(5),
userid int(5),
schoolID varchar(5),
primary key (teacherID),
foreign key(userid) references users(userid),
foreign key(schoolID) references school(schoolID));

CREATE TABLE operator(
operatorID varchar(5),
schoolID varchar(5),
teacherID varchar(5),
primary key (operatorID),
foreign key (schoolID) references school(schoolID),
foreign key (teacherID) references teachers(teacherID));

CREATE TABLE rating(
ratingID varchar(5),
texts varchar(500),
likert int,
userid int(5),
bookID varchar(5),
operatorID varchar(5),
primary key (ratingID),
foreign key (userid) references users(userid),
foreign key (bookID) references books(bookID));

CREATE TABLE bookCategory(
categoryid int,
category varchar(20),
primary key (categoryid));

CREATE TABLE belongs (
categoryid int,
bookID varchar(5),
primary key (categoryid,bookID),
foreign key (categoryid) references bookCategory(categoryid),
foreign key (bookID) references books(bookID));

CREATE TABLE authors(
authorID varchar(10),
authorName varchar(20),
primary key (authorID));

CREATE TABLE written(
authorID varchar(10),
bookID varchar(5),
primary key (authorID, bookID),
foreign key (authorID) references authors(authorID),
foreign key(bookID) references books(bookID));

CREATE TABLE teachersrequests(
requestID varchar(10),
teacherID varchar(5),
primary key (requestID),
foreign key (teacherID) references teachers(teacherID));

CREATE TABLE borrowrequest(
borrowID varchar(20),
dateRequest date,
studentID varchar(5),
teacherID varchar(5),
bookID varchar(5),
primary key (borrowID),
foreign key (studentID) references students(studentID),
foreign key (teacherID) references teachers(teacherID),
foreign key (bookID) references books(bookID));
use library;
CREATE TABLE reservation(
reservationID varchar(20),
reservatonDate date,
duedate date,
studentID varchar(5),
teacherID varchar(5),
bookID varchar(5),
primary key (reservationID),
foreign key (studentID) references students(studentID),
foreign key (teacherID) references teachers(teacherID),
foreign key (bookID) references books(bookID));

CREATE TABLE borrowing(
borrowingID varchar(20),
borrowDate date,
duedate date,
returndate date,
studentID varchar(5),
teacherID varchar(5),
bookID varchar(5),
primary key (borrowingID),
foreign key (studentID) references students(studentID),
foreign key (teacherID) references teachers(teacherID),
foreign key (bookID) references books(bookID));

