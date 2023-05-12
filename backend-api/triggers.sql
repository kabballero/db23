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






