const express = require('express')
const app = express();
const mongoose = require('mongoose')
const bodyparser = require('body-parser')


mongoose.connect('mongodb://127.0.0.1:27017/logindb')
var db = mongoose.connection;
db.on('error' ,()=>console.log("error occured"))
db.once('open' ,()=>console.log("connected to db"))

app.use(bodyparser.json())
app.use(express.static('public'))
app.use(bodyparser.urlencoded({
    extended:true
}))

app.post('/login' , (req , res) =>{
    var username = req.body.username;
    var password = req.body.password;

    var data = {
        "username" : username,
        "password": password
    }

    db.collection('user').insertOne(data , (err , collection)=>{
        if(err){
            throw  err;
        }
        console.log("record insert successfully");
    })
    return res.redirect('login.html')
})



app.get('/' , (req , res) => {
    res.send({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect('index.html')
})
app.listen(3000, console.log('server is running on port:3000'))