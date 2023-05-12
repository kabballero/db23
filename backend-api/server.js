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
        myquery="select * from "+""+req.params.role+""+" as t1 join users as t2 on t1.userid=t2.userid where t2.username="+"'"+req.params.username+"'"+" and t2.userpassword="+"'"+req.params.kodikos+"'";
    }
    else {
        myquery="select username,userpassword from operator as t1 join teachers as t2 on t1.teacherID=t2.teacherID join users as t3 on t3.userid=t2.userid where t3.username="+"'"+req.params.username+"'"+" and t3.userpassword="+"'"+req.params.kodikos+"'";
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

app.get('/books/img', (req,res)=>{
    var data=[]
    var myquery='select image from books'
    con.query(myquery, async function(err,result,fields){
        if (err) throw err;
        res.send(result)
    });
})