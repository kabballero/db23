create definer=`root`@`localhost` trigger getborrowed after insert on borrowing for each row 
update books
set availability=availability-1
where (books.bookID=new.bookID);


create definer=`root`@`localhost` trigger returningbook after update on borrowing for each row 
update books 
set availability=availability+1 
where (books.bookID=new.bookID);

create definer=`root`@`localhost` trigger makereserve before insert on reservation for each row
set 
new.duedate=DATE_ADD(new.reservatonDate, INTERVAL 14 DAY);

create definer=`root`@`localhost` trigger makeborrow before insert on borrowing for each row
set 
new.duedate=DATE_ADD(new.borrowDate, INTERVAL 14 DAY);






