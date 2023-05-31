const http=require('http')
const express=require('express')
const app=express()
const cors=require('cors')
var mysql=require('mysql');
const schedule = require('node-schedule');
const { request } = require('https');
const { exec } = require('child_process');
const port=9103;

app.use(cors());

var  con = mysql.createPool({
    multipleStatements: true,
    host: "127.0.0.1",
    user:"root",
    database: "library"
});  

/*async function deleteOldReservers() {
    try {
      const result = con.query('delete from reservation where current_date>duedate');
      console.log(`Rows deleted`);
    } catch (err) {
      console.error(err);
    } 
  }

const job = schedule.scheduleJob('0 0 * * *', function() {
    deleteOldReservers();
  });*/

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });

app.get('/login/:role/:username/:kodikos', (req,res)=>{
    var myquery;
    const role=req.params.role;
    if(role=='users'){
        myquery="select * from students as t1 right join users as t2 on t1.username=t2.username left join teachers as t3 on t3.username=t2.username where t2.username="+"'"+req.params.username+"'"+" and t2.password="+"'"+req.params.kodikos+"'";
    }
    else if(role=='admins'){
        myquery=`select t1.username,t1.password from users as t1 join admins as t2 on t1.username=t2.username where t1.username='${req.params.username}' and t1.password='${req.params.kodikos}';`
    }
    else if(role=='operator') {
        myquery="select t3.username,password from operators as t1 join teachers as t2 on t1.teacherID=t2.teacherID join users as t3 on t3.username=t2.username where t3.username="+"'"+req.params.username+"'"+" and t3.password="+"'"+req.params.kodikos+"'";
    }
    con.query(myquery, async function(err,result,fields){
        if(err) throw err;
        if(result.length>0){
            var data=[]
            data.push({
                "login":'success'
            })
            res.send(data)
        }
        else{
            var data=[]
            data.push({
                "login":'failed'
            })
            res.send(data)
        }
    });
})

app.get('/books', (req,res)=>{
    var myquery='select * from books'
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.get('/borrowed/:username', (req,res)=>{
    var myquery=`call get_borrowedBooks('${req.params.username}')`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        result[0].forEach(book => {
            book.borrowDate = book.borrowDate.toLocaleDateString();
          });
        res.send(result[0])    
    });
})

app.get('/categories', (req,res)=>{
    var myquery='select * from bookCategory'
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.post('/borrowRequest/:username/:bookID',(req,res)=>{
    var myquery=`insert into borrowrequest(dateRequest,username,bookID) values(current_date(),'${req.params.username}',${req.params.bookID})`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.get('/usersdata/:username',(req,res)=>{
    var myquery=`select t1.username,t1.owns,t2.studentID,t2.studentborrowedbooks,t3.schoolID,t3.teacherID,t3.teacherborrowedbooks from 
    users as t1 left join students as t2 on t1.username=t2.username
    left join teachers as t3 on t1.username=t3.username
    where t1.username='${req.params.username}'`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.get('/profile/:username',(req,res)=>{
    var myquery=`select * from users where username='${req.params.username}'`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.post('/changePassword/:username/:newpassword',(req,res)=>{
    var myquery=`update users set password='${req.params.newpassword}' where username='${req.params.username}'`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.post('/reviewRequest/:username/:bookid/:likert/:text',(req,res)=>{
    var myquery=`insert into rating(texts,likert,username,bookID) values('${req.params.text}',${req.params.likert},'${req.params.username}',${req.params.bookid})`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.post('/updateBookTitle/:bookID/:newtitle',(req,res)=>{
    var myquery=`update books set title='${req.params.newtitle}' where bookID='${req.params.bookID}'`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.post('/updateBookImage/:bookID/:newimage',(req,res)=>{
    var myquery=`update books set image='${req.params.newimage}' where bookID='${req.params.bookID}'`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.post('/updateBookPages/:bookID/:newpage',(req,res)=>{
    var myquery=`update books set pages='${req.params.newpage}' where bookID='${req.params.bookID}'`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.post('/updateBookLanguage/:bookID/:newlanguage',(req,res)=>{
    var myquery=`update books set languages='${req.params.newlanguage}' where bookID='${req.params.bookID}'`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.post('/updateBookSummary/:bookID/:newsummary',(req,res)=>{
    var myquery=`update books set summary='${req.params.newsummary}' where bookID='${req.params.bookID}'`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.post('/updateBookAvailability/:bookID/:newavailability',(req,res)=>{
    var myquery=`update books set availability='${req.params.newavailability}' where bookID='${req.params.bookID}'`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.get('/getoperator/:username',(req,res)=>{
    var myquery=`select schoolID from teachers where username='${req.params.username}'`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.post('/addBook/:title/:summary/:languages/:pages/:availability/:schoolid/:image/:category/:isbn/:author',(req,res)=>{
    var myquery=`
    insert into books(schoolID,title,isbn,pages,summary,availability,image,languages) values(${req.params.schoolid},'${req.params.title}','${req.params.isbn}','${req.params.pages}','${req.params.summary}',${req.params.availability},'${req.params.image}','${req.params.languages}');
    insert into belongs values ('${req.params.category}',(select max(bookID) from books));
    INSERT INTO authors (authorName)
    SELECT '${req.params.author}'
    WHERE NOT EXISTS (
      SELECT 1 FROM authors WHERE authorName = '${req.params.author}'
    );
    INSERT INTO written
    SELECT (
      SELECT authorID FROM authors WHERE authorName = '${req.params.author}'
    ), (select max(bookID) from books)
    WHERE EXISTS (
      SELECT 1 FROM authors WHERE authorName = '${req.params.author}'
    );`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.get('/requests/:schoolid',(req,res)=>{
    var myquery=` select title,dateRequest,username,availability,borrowID,t1.bookID from (select * from borrowrequest where bookID in(select bookID from books where schoolID=${req.params.schoolid})) as t1 join books as t2 on t1.bookID=t2.bookID`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        result.forEach(request => {
            request.dateRequest = request.dateRequest.toLocaleDateString();
          });
        res.send(result)
    });
})

app.get('/getoperatorid/:username',(req,res)=>{
    var myquery=`select operatorid from operators join teachers on operators.teacherid=teachers.teacherid where username='${req.params.username}'`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.post('/makeborrow/:username/:bookid/:date/:operatorid/:requestid',(req,res)=>{
    const parts = req.params.date.split('/');
    const date2 = new Date(parts[2], parts[1] - 1, parts[0]);
    const formattedDate = date2.toLocaleDateString('zh-Hans-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/\//g, '/');
    var myquery=`insert into borrowing(borrowDate,username,bookID,operatorID) values('${formattedDate}','${req.params.username}',${req.params.bookid},${req.params.operatorid}) `
    var myquery2=`delete from borrowrequest where borrowID=${req.params.requestid}`
    con.query(myquery2, async function(err,result,fields){
        if (err) throw err;});
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.post('/makeborrow3/:username/:bookid/:date/:operatorid/:reservationid',(req,res)=>{
    const parts = req.params.date.split('/');
    const date2 = new Date(parts[2], parts[1] - 1, parts[0]);
    const formattedDate = date2.toLocaleDateString('zh-Hans-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/\//g, '/');
    var myquery=`insert into borrowing(borrowDate,username,bookID,operatorID) values('${formattedDate}','${req.params.username}',${req.params.bookid},${req.params.operatorid}) `
    var myquery2=`delete from reservation where reservationID=${req.params.reservationid}`
    con.query(myquery2, async function(err,result,fields){
        if (err) throw err;});
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.post('/makereservation/:username/:bookid/:date/:requestid',(req,res)=>{
    const parts = req.params.date.split('/');
    const date2 = new Date(parts[2], parts[1] - 1, parts[0]);
    const formattedDate = date2.toLocaleDateString('zh-Hans-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/\//g, '/');
    var myquery=`insert into reservation(reservationDate,username,bookID) values('${formattedDate}','${req.params.username}',${req.params.bookid}) `
    var myquery2=`delete from borrowrequest where borrowID=${req.params.requestid}`
    con.query(myquery2, async function(err,result,fields){
        if (err) throw err;});
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.post('/deleterequest/:borrowid',(req,res)=>{
    var myquery=`delete from borrowrequest where borrowID=${req.params.borrowid} `
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.get('/infobook/:title/:schoolid',(req,res)=>{
    var myquery=`select availability,bookID from books where title='${req.params.title}' && schoolid=${req.params.schoolid}`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.post('/makeborrow2/:username/:bookid/:date/:operatorid',(req,res)=>{
    const parts = req.params.date.split('/');
    const date2 = new Date(parts[2], parts[1] - 1, parts[0]);
    const formattedDate = date2.toLocaleDateString('zh-Hans-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/\//g, '/');
    var myquery=`insert into borrowing(borrowDate,username,bookID,operatorID) values('${formattedDate}','${req.params.username}',${req.params.bookid},${req.params.operatorid}) `
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.delete('/deleteuser/:username',(req,res)=>{
    var myquery=`delete from users where username='${req.params.username}'`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.post('/adduser/:username/:date/:password/:fullname/:role/:schoolid/:phone',(req,res)=>{
    if(req.params.role=='t'){
        var myquery=`insert into users(username,password,fullname,birthdate,phonenumber) values('${req.params.username}','${req.params.password}','${req.params.fullname}','${req.params.date}','${req.params.phone}');
        insert into teachers(username,schoolID,teacherborrowedbooks) values('${req.params.username}',${req.params.schoolid},0)`
    }
    if(req.params.role=='s'){
        var myquery=`insert into users(username,password,fullname,birthdate,phonenumber) values('${req.params.username}','${req.params.password}','${req.params.fullname}','${req.params.date}','${req.params.phone}');
        insert into students(username,schoolID,studentborrowedbooks) values('${req.params.username}',${req.params.schoolid},0)`
    }
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.get('/323/:name/:category',(req,res)=>{
    if(req.params.name=='undefined'){
        var myquery=`call getAvg_category('${req.params.category}',@arg);
        select @arg as arg;`
    }
    else if(req.params.category=='undefined'){
        var myquery=`call getAvg_borrower('${req.params.name}',@arg);
        select @arg as arg;`
    }
    else{
        var myquery=`call getAvg_c_b('${req.params.category}','${req.params.name}',@arg);
        select @arg as arg;`
    }
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.get('/reviewReq',(req,res)=>{   
    var myquery=`select books.title,rating.texts,rating.ratingID,rating.likert,rating.username from rating join books on rating.bookID=books.bookID where operatorID is null`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.post('/approveRating/:opid/:ratid',(req,res)=>{   
    var myquery=`update rating set operatorid=${req.params.opid} where ratingID=${req.params.ratid}`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.get('/322_1/:name',(req,res)=>{   
    var myquery=`call overdue_borrowing('${req.params.name}');`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.get('/322_2/:days',(req,res)=>{   
    var myquery=`call overdue_borrowing2('${req.params.days}');`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.get('/322_3/:name/:days',(req,res)=>{   
    var myquery=`call overdue_borrowing('${req.params.name}');
    call overdue_borrowing2('${req.params.days}');`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.get('/reserves/:sid',(req,res)=>{   
    var myquery=`select books.bookID,books.title,books.availability,reservation.username,reservation.reservationDate,reservation.duedate,reservation.reservationID from reservation join books on reservation.bookID=books.bookID where books.bookID in(select bookID from books where schoolID=${req.params.sid})`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        result.forEach(book => {
            book.reservationDate = book.reservationDate.toLocaleDateString();
            book.duedate = book.duedate.toLocaleDateString();
          });
        res.send(result)
    });
})

app.post('/deletereserve/:reid',(req,res)=>{   
    var myquery=`delete from reservation where reservationID=${req.params.reid}`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.get('/321/:t/:c/:w/:s',(req,res)=>{   
    const tValue = req.params.t !== 'undefined'? `'${req.params.t}'` : null;
    const cValue = req.params.c !== 'undefined' ? `'${req.params.c}'` : null;
    const wValue = req.params.w !== 'undefined' ? `'${req.params.w}'` : null;
    const sValue = req.params.s !== 'undefined' ? `'${req.params.s}'` : null;
    var myquery=`call query_3_2_1(${tValue},${cValue},${wValue},${sValue})`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.get('/331/:n/:c/:t',(req,res)=>{   
    const nValue = req.params.n !== 'undefined'? `'${req.params.n}'` : null;
    const cValue = req.params.c !== 'undefined' ? `'${req.params.c}'` : null;
    const tValue = req.params.t !== 'undefined' ? `'${req.params.t}'` : null;
    var myquery=`call find_books(${tValue},${cValue},${nValue})`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.get('/userReserves/:u',(req,res)=>{   
    var myquery=`select * from reservation join books on reservation.bookID=books.bookID where username='${req.params.u}'`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        result.forEach(book => {
            book.reservationDate = book.reservationDate.toLocaleDateString();
            book.duedate = book.duedate.toLocaleDateString();
          });
        res.send(result)
    });
})

app.get('/311/:m/:y',(req,res)=>{   
    var myquery=`call schoolBorrow('${req.params.y}','${req.params.m}')`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.get('/312A/:category',(req,res)=>{   
    var myquery=`call authorCategory('${req.params.category}')`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.get('/312B/:category',(req,res)=>{   
    var myquery=`call teacherBorrowCategory('${req.params.category}')`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.get('/313/',(req,res)=>{   
    var myquery=`select * from mostActiveTeach`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        result.forEach(book => {
            book.birthdate = book.birthdate.toLocaleDateString();
          });
        res.send(result)
    });
})

app.get('/316',(req,res)=>{   
    var myquery=`select t3.ca,t3.cb,count(t3.bookID) as count
    from
    (select t1.ca,t2.cb,t1.bookID 
    from
    (select bookID,category as ca
    from belongs) as t1
    inner join (select bookID,category as cb
    from belongs) as t2 on t1.ca < t2.cb and t1.bookID = t2.bookID) as t3
    inner join borrowing as t4 on t3.bookID = t4.bookID
    group by t3.ca,t3.cb
    order by count(t3.bookID) desc limit 3;`;
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.get('/314',(req,res)=>{   
    var myquery=`select authorName from authors 
    where authorID not in
    (select authorID from written as t1 
    join borrowing as t2 
    on t1.bookID=t2.bookID);`;
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.get('/315',(req,res)=>{   
    var myquery=`select fullname
    from users
    inner join teachers on users.username = teachers.username
    inner join operators on teachers.teacherID = operators.teacherID
    inner join
    (select q1.operatorID
    from
    (select operatorID, count(bookID) as cnt1 -- finding the borrowing of each operator
    from borrowing 
    where year(borrowDate) > year(current_date()) - 1
    group by operatorID
    having cnt1 > 20) as q1
    inner join (select operatorID, count(bookID) as cnt1
    from borrowing 
    where year(borrowDate) > year(current_date()) - 1
    group by operatorID
    having cnt1 > 20) as q2 on q1.cnt1 = q2.cnt1 and q1.operatorID <> q2.operatorID) as d1 on d1.operatorID = operators.operatorID;`;
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.get('/317',(req,res)=>{   
    var myquery=`select authorName
    from authors
    inner join
    (select authorID,count(bookID) as cnt6
    from written
    group by authorID
    having cnt6 <= 
    (select max(x1.cnt5) 
    from
    (select authorID,count(bookID) as cnt5
    from written
    group by authorID) as x1) - 5) as q50 on q50.authorID = authors.authorID;`;
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.post('/addSchool/:name/:phone/:mail',(req,res)=>{   
    var myquery=`insert into school(schoolNAME,email,phonenumber) values ('${req.params.name}','${req.params.phone}','${req.params.mail}')`;
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.get('/getschools',(req,res)=>{   
    var myquery=`select schoolNAME,schoolID from school`;
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.post('/addoperator/:tid/:sid',(req,res)=>{   
    var myquery=`insert into operators (schoolID,teacherID) values(${req.params.sid},${req.params.tid})`;
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.get('/borrowed2/:name',(req,res)=>{   
    var myquery=`select t2.title,t1.bookID,t1.borrowDate,t1.borrowingID from borrowing as t1 join books as t2 on t1.bookID=t2.bookID where username='${req.params.name}' and returndate is null;`;
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        result.forEach(book => {
            book.borrowDate = book.borrowDate.toLocaleDateString();
          });
        res.send(result)
    });
})

app.post('/return/:bid',(req,res)=>{   
    var myquery=`update borrowing set returndate=current_date() where borrowingID=${req.params.bid}`;
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.post('/deleteoperator/:n',(req,res)=>{   
    var myquery=`delete from operators where teacherID in(select teacherID from teachers where username='${req.params.n}')`;
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})

app.get('/backup', (req, res) => {
    const backupCommand = `mysqldump -u root library > C:/baseis/backup`;
    
    exec(backupCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error creating database backup: ${error.message}`);
        res.status(500).json({ error: 'Database backup failed' });
      } else {
        //console.log('Database backup created successfully');
        res.json({ message: 'Database backup created' });
      }
    });
  });

  app.get('/restore', (req, res) => {
    const restoreCommand = `mysqldump -u root library > C:/baseis/backup`;
  
    exec(restoreCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error restoring database backup: ${error.message}`);
        res.status(500).json({ error: 'Database restore failed' });
      } else {
        //console.log('Database restored successfully');
        res.json({ message: 'Database restored' });
      }
    });
  });