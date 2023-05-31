DELIMITER //
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

create definer=`root`@`localhost` trigger deleteUsers before delete on users for each row 
begin
	delete from students where username=old.username;
    delete from teachers where username=old.username;
    delete from reservation where username=old.username;
    delete from borrowing where username=old.username;
    delete from borrowrequest where username=old.username;
    delete from rating where username=old.username;
    delete from ratingRequest where username=old.username;
end//

create definer=`root`@`localhost` trigger returningbook after update on borrowing for each row 
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
end //

create definer=`root`@`localhost` trigger makereserve before insert on reservation for each row
set 
new.duedate=DATE_ADD(new.reservationDate, INTERVAL 7 DAY);//

create definer=`root`@`localhost` trigger makeborrow before insert on borrowing for each row
set 
new.duedate=DATE_ADD(new.borrowDate, INTERVAL 7 DAY);//

create definer=`root`@`localhost` event deleteReserve 
on schedule every 1 day STARTS '2023-05-12 00:47:00'
do delete from reservation where current_date>duedate;

create definer=`root`@`localhost` event setOwn1 
on schedule every 1 day STARTS '2023-05-27 15:00:00'
do update users set owns=1 where username in (select username from borrowing where returndate is null && duedate<current_date());

create definer=`root`@`localhost` event setOwn0
on schedule every 1 day STARTS '2023-05-27 15:00:00'
do update users set owns=0 where username not in (select username from borrowing where returndate is null && duedate<current_date());




