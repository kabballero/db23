const http=require('http')
const express=require('express')
const app=express()
const cors=require('cors')
var mysql=require('mysql');
const port=9103;

app.use(cors());

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });

var  con = mysql.createPool({
    multipleStatements: true,
    host: "127.0.0.1",
    user:"root",
    database: "schoolib"
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