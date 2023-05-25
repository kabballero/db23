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

-- 3.3.2
CREATE definer=`root`@`localhost` PROCEDURE get_borrowedBooks (IN u_name VARCHAR(50))
select books.title,borrowing.borrowDate
from books join borrowing ON books.bookID = borrowing.bookID 
where borrowing.username = u_name;