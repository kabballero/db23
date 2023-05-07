-- 3.1
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

-- 3.2

create definer=`root`@`localhost` procedure authorCategory (in categoryIN varchar(50))
select t6.authorName,t5.category from ((
select t3.category,t4.authorID from( 
select t1.categoryid,t1.category,t2.bookID from (select * from bookCategory where category=categoryIN) as t1 
join 
belongs as t2 on t1.categoryid=t2.categoryid) as t3 
join 
written as t4 on t3.bookID=t4.bookID) as t5 
join 
authors as t6 on t5.authorID=t6.authorID);

create definer=`root`@`localhost` procedure teacherBorrowCategory(in categoryIN varchar(50))
select t8.named,t7.category from
(select t5.category,t6.userid from 
(select t4.category,t3.teacherID from 
(select t2.categoryid,t1.teacherID,t1.borrowDate from 
(select teacherID,bookID,borrowDate from borrowing where studentID is null) as t1 
join
belongs as t2 on t1.bookID=t2.bookID) as t3
join bookCategory as t4 on t3.categoryid=t4.categoryid
where t4.category=categoryIN and borrowDate > date_sub(current_date(), interval 1 year) group by t3.teacherID )as t5
join  (select userid,teacherID from teachers) as t6 on t5.teacherID=t6.teacherID) as t7
join (select userid,named from users) as t8 on t7.userid=t8.userid
;

-- 3.3

create definer=`root`@`localhost` view mostActiveTeach (named,birthdate,numBorrows)
as 
select t3.named,t3.birthdate,count(t3.teacherID) as numBorrows from 
(select t2.named,t2.birthdate,t1.teacherID from 
teachers as t1 
join 
(select named,birthdate,userid from  users where birthdate > date_sub(current_date(), interval 40 year)) as t2 
on t1.userid=t2.userid) as t3 
join 
(select teacherID from borrowing where teacherID is not null) as t4 on t3.teacherID=t4.teacherID
group by t3.teacherID
order by numBorrows desc
;

-- 3.4
use library;
select authorName from authors 
where authorID not in
(select authorID from written as t1 
left join borrowing as t2 
on t1.bookID=t2.bookID 
where borrowingID is not null);