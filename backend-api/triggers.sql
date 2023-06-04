
delimiter //
create definer=`root`@`localhost` trigger deletereserve before delete on reservation for each row 
begin
	update students
	set Sreservenum=Sreservenum-1
	where (students.username=old.username) ;
    update teachers
	set Treservenum=Treservenum-1
	where (teachers.username=old.username) ;
end//
delimiter //
create definer=`root`@`localhost` trigger makereserve2 after insert on reservation for each row 
begin
	update students
	set Sreservenum=Sreservenum+1
	where (students.username=new.username) ;
    update teachers
	set Treservenum=Treservenum+1
	where (teachers.username=new.username) ;
end//
delimiter //
create definer=`root`@`localhost` trigger getborrowed after insert on borrowing for each row 
begin
	update books
	set availability=availability-1
	where (books.bookID=new.bookID);
	update students
	set studentborrowedbooks=studentborrowedbooks+1
	where (students.username=new.username) ;
    update teachers
	set teacherborrowedbooks=teacherborrowedbooks+1
	where (teachers.username=new.username) ;
end//
delimiter //
create definer=`root`@`localhost` trigger returningbook before update on borrowing for each row 
begin
	update books 
	set availability=availability+1 
	where (books.bookID=new.bookID);
	update students
	set studentborrowedbooks=studentborrowedbooks-1
	where (students.username=new.username) ;
	update teachers
	set teacherborrowedbooks=teacherborrowedbooks-1
	where (teachers.username=new.username) ;
    update users set owns=0 where users.username=new.username;
end //
delimiter //
create definer=`root`@`localhost` trigger makereserve before insert on reservation for each row
set 
new.duedate=DATE_ADD(new.reservationDate, INTERVAL 7 DAY);//

create definer=`root`@`localhost` trigger makeborrow before insert on borrowing for each row
set 
new.duedate=DATE_ADD(new.borrowDate, INTERVAL 7 DAY);//

create definer=`root`@`localhost` event deleteReserve 
on schedule every 1 day STARTS '2023-06-04 17:00:00'
do delete from reservation where current_date>duedate;
delimiter //
create definer=`root`@`localhost` event setOwn1 
on schedule every 1 day STARTS '2023-06-04 17:00:00'
do 
begin
update users set owns=1 where username in (select username from borrowing where returndate is null && duedate<current_date());
end//






