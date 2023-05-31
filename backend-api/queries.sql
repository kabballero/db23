-- 3.1.1 
create definer=`root`@`localhost` procedure schoolBorrow(in borrowYear int, in borrowMonth int)
select month(t3.borrowDate) borrorMonth,year(t3.borrowDate) borrorYear,t4.schoolNAME,count(t4.schoolID) borrowNum
from( 
(select t2.schoolID, t1.borrowDate from(
(select borrowDate,bookID from borrowing where month(borrowDate)=borrowMonth and year(borrowDate)=borrowYear) as t1
join 
(select bookID,schoolID from books) as t2
on t1.bookID=t2.bookID)) as t3
join 
(select schoolID,schoolNAME from school) as t4
on 
t3.schoolID=t4.schoolID)
group by t4.schoolID ;

-- 3.1.2
create definer=`root`@`localhost` procedure authorCategory (in categoryIN varchar(50))
select t6.authorName,t5.category from ((
select t3.category,t4.authorID from( 
select t1.category,t2.bookID from (select * from bookCategory where category=categoryIN) as t1 
join 
belongs as t2 on t1.category=t2.category) as t3 
join 
written as t4 on t3.bookID=t4.bookID) as t5 
join 
authors as t6 on t5.authorID=t6.authorID)
group by t6.authorName;

create definer=`root`@`localhost` procedure teacherBorrowCategory(in categoryIN varchar(50))
select t2.category,t1.username from
(select username,bookID,borrowDate from borrowing where username in (select username from teachers)) as t1 
join
belongs as t2 on t1.bookID=t2.bookID
where t2.category=categoryIN and borrowDate > date_sub(current_date(), interval 1 year) 
group by username;

-- 3.1.3

create definer=`root`@`localhost` view mostActiveTeach (named,birthdate,numBorrows)
as
select t3.username,t3.birthdate,count(t3.username) as numBorrows from 
(select t2.username,t2.birthdate,t1.teacherID from 
teachers as t1 
join 
(select username,birthdate from  users where birthdate > date_sub(current_date(), interval 40 year)) as t2 
on t1.username=t2.username) as t3 
join 
(select username from borrowing where username in (select username from teachers)) as t4 on t3.username=t4.username
group by t3.username
order by numBorrows desc ;

-- 3.1.4
use library;
select authorName from authors 
where authorID not in
(select authorID from written as t1 
join borrowing as t2 
on t1.bookID=t2.bookID);

-- 3.1.6

select t3.ca,t3.cb,count(t3.bookID)
from
(select t1.ca,t2.cb,t1.bookID 
from
(select bookID,category as ca
from belongs) as t1
inner join (select bookID,category as cb
from belongs) as t2 on t1.ca < t2.cb and t1.bookID = t2.bookID) as t3
inner join borrowing as t4 on t3.bookID = t4.bookID
group by t3.ca,t3.cb
order by count(t3.bookID) desc limit 3;

-- 3.2.1

DELIMITER //
CREATE definer=`root`@`localhost` PROCEDURE query_3_2_1 (in titlos varchar(150),in katigoria varchar(150),in siggrafeas varchar(150), in antitipa int)
 BEGIN
	IF titlos IS NOT NULL THEN
	select title,group_concat(authorName) as an
	from books
    inner join written on books.bookID = written.bookID
    inner join authors on written.authorID = authors.authorID
	where title = titlos
    group by title;-- and (category like katigoria) and (authorName like siggrafeas) and (availability like antitipa));
    
ELSEIF katigoria IS NOT NULL THEN
	select title,group_concat(authorName) as an
	from books
    inner join written on books.bookID = written.bookID
    inner join authors on written.authorID = authors.authorID
	where category = katigoria
    group by title;
ELSEIF siggrafeas IS NOT NULL THEN
	select title,group_concat(authorName) as an
	from books
    inner join written on books.bookID = written.bookID
    inner join authors on written.authorID = authors.authorID
	where authorName = siggrafeas
    group by title;
ELSEIF antitipa IS NOT NULL THEN
	select title,group_concat(authorName) as an
	from books
    inner join written on books.bookID = written.bookID
    inner join authors on written.authorID = authors.authorID
	where availability = antitipa
    group by title;
	END IF;
END;
//
DELIMITER ;

-- 3.2.2

DELIMITER $$
CREATE definer=`root`@`localhost` PROCEDURE overdue_borrowing (IN fullname VARCHAR(30))
BEGIN 
	select DATEDIFF(current_date(), borrowing.duedate) as days
	from users join borrowing ON users.username = borrowing.username
	where users.fullname = fullname AND borrowing.duedate < current_date()
		    AND borrowing.returndate is NULL;
END $$
DELIMITER ;

DELIMITER $$
CREATE definer=`root`@`localhost` PROCEDURE overdue_borrowing2 (IN daysofdelay INT)
BEGIN 
	select users.fullname  
	from users join borrowing ON users.username = borrowing.username
	where  borrowing.duedate < current_date()  AND borrowing.returndate is NULL 
	AND DATEDIFF(current_date(), borrowing.duedate)  = daysofdelay;
END $$
DELIMITER ;

-- 3.2.3

CREATE definer=`root`@`localhost` PROCEDURE getAvg_borrower (IN username VARCHAR(50), OUT avg NUMERIC(2.1) )
	SELECT AVG(likert) INTO avg
	FROM rating join users ON rating.username = users.username
	WHERE rating.username = username;

CREATE definer=`root`@`localhost` PROCEDURE getAvg_category (IN b_category VARCHAR(50), OUT avg NUMERIC(3.1) )
	SELECT AVG(likert) INTO avg
	FROM rating join belongs ON rating.bookID = belongs.bookID
	WHERE belongs.category = b_category;
    
CREATE definer=`root`@`localhost` PROCEDURE getAvg_c_b (IN b_category VARCHAR(50),IN username VARCHAR(50), OUT avg NUMERIC(3.1) )
	SELECT AVG(likert) INTO avg
	FROM rating join belongs ON rating.bookID = belongs.bookID
    join users ON rating.username = users.username
	WHERE belongs.category = b_category and rating.username = username;

-- 3.3.1
delimiter //
CREATE definer=`root`@`localhost` PROCEDURE find_books( 
	IN b_title VARCHAR(100), IN b_category VARCHAR(20), IN b_author VARCHAR(20) )
BEGIN
    IF b_title IS NOT NULL and b_category is not null and b_author is not null then
    SELECT *
    FROM books
    JOIN belongs ON books.bookID = belongs.bookID
    JOIN written ON books.bookID = written.bookID
    JOIN authors ON written.authorID = authors.authorID
    WHERE books.title = b_title and belongs.category=b_category and authorName=b_author;
    elseif b_title IS NOT NULL and b_category is not null then
    SELECT *
    FROM books
    JOIN belongs ON books.bookID = belongs.bookID
    JOIN written ON books.bookID = written.bookID
    JOIN authors ON written.authorID = authors.authorID
    WHERE books.title = b_title and belongs.category=b_category;
    ELSEIF b_title IS NOT NULL and b_author is not null then
    SELECT *
    FROM books
    JOIN belongs ON books.bookID = belongs.bookID
    JOIN written ON books.bookID = written.bookID
    JOIN authors ON written.authorID = authors.authorID
    WHERE books.title = b_title and authorName=b_author;
    ELSEIF b_category is not null and b_author is not null then
    SELECT *
    FROM books
    JOIN belongs ON books.bookID = belongs.bookID
    JOIN written ON books.bookID = written.bookID
    JOIN authors ON written.authorID = authors.authorID
    WHERE belongs.category=b_category and authorName=b_author;
  ELSEIF b_title IS NOT NULL THEN
    SELECT *
    FROM books
    JOIN belongs ON books.bookID = belongs.bookID
    JOIN written ON books.bookID = written.bookID
    JOIN authors ON written.authorID = authors.authorID
    WHERE books.title = b_title;
  ELSEIF b_category IS NOT NULL THEN
    SELECT *
    FROM books
    JOIN belongs ON books.bookID = belongs.bookID
    JOIN written ON books.bookID = written.bookID
    JOIN authors ON written.authorID = authors.authorID
    WHERE belongs.category = b_category;
  ELSEIF b_author IS NOT NULL THEN
    SELECT *
    FROM books
    JOIN belongs ON books.bookID = belongs.bookID
    JOIN written ON books.bookID = written.bookID
    JOIN authors ON written.authorID = authors.authorID
    WHERE authors.authorName = b_authorName;
  END IF;
END//


-- 3.3.2
CREATE definer=`root`@`localhost` PROCEDURE get_borrowedBooks (IN u_name VARCHAR(50))
select books.title,borrowing.borrowDate
from books join borrowing ON books.bookID = borrowing.bookID 
where borrowing.username = u_name;