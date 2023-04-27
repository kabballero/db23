create definer=`root`@`localhost` trigger getborrowed after insert on borrowing for each row 
update books
set availability=availability-1
where (books.bookID=new.bookID);


create definer=`root`@`localhost` trigger returningbook after update on borrowing for each row 
update books 
set availability=availability+1 
where (books.bookID=new.bookID);




