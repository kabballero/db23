const http=require('http')
const express=require('express')
const app=express()
const cors=require('cors')
var mysql=require('mysql');
const schedule = require('node-schedule');
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
    if(role!='operator'){
        myquery="select * from "+""+req.params.role+""+" as t1 join users as t2 on t1.username=t2.username where t2.username="+"'"+req.params.username+"'"+" and t2.password="+"'"+req.params.kodikos+"'";
    }
    else {
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
    var myquery=`select t1.username,t2.studentID,t2.studentborrowedbooks,t3.teacherID,t3.teacherborrowedbooks from 
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
    var myquery=`insert into ratingRequest(texts,likert,username,bookID) values('${req.params.text}',${req.params.likert},'${req.params.username}',${req.params.bookid})`
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})