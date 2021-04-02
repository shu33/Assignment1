const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const json2xls = require('json2xls');

const app= express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(json2xls.middleware);


app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
});




app.post("/",function(req,res){
    let empName = (req.body.empName)
    let empLocation = (req.body.empLocation)
    let empBank = (req.body.empBank)
    console.log(empName);
  
    fs.readFile(__dirname+"/details.json", function(err, data) {
        if (err) throw err
        var users = JSON.parse(data)
        users.details.push({
            empName: empName,
            empLocation: empLocation,
            empBank: empBank
        }
    )
    console.log(users)
        fs.writeFile(__dirname+"/details.json", JSON.stringify(users, null,2), function(err) {
            if (err) throw err
            console.log('Done!')
        })
})
    res.redirect("/output");    
});


app.get("/output",function(req,res){
    res.sendFile(__dirname+"/output.html");
})

app.post("/JSONbtn",function(req,res){
    res.sendFile(__dirname+"/details.json");

})

app.post("/EXCELbtn",function(req,res){
    var arrayj  = [];
    fs.readFile(__dirname+"/details.json", function(err, data) {
        if (err) throw err
        var usersinfo = JSON.parse(data);
        console.log(usersinfo);
        console.log(usersinfo.details.length);
        usersinfo.details.forEach(element => {
            arrayj.push(element)
        });
        
    res.xls('data.xls', arrayj);
})
})

app.post("/HOMEbtn",function(req,res){
    res.redirect("/");
})

app.listen(2000,function(){
    console.log("server started at port 2000");
});
