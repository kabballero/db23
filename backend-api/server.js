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

async function deleteOldReservers() {
    try {
      const result = con.query('delete from reservation where current_date>duedate');
      console.log(`Rows deleted`);
    } catch (err) {
      console.error(err);
    } 
  }

const job = schedule.scheduleJob('0 0 * * *', function() {
    deleteOldReservers();
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });

app.get('/login/:role/:username/:kodikos', (req,res)=>{
    let myquery="select * from "+""+req.params.role+""+" where username="+"'"+req.params.username+"'"+" and kodikos="+"'"+req.params.kodikos+"'";
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