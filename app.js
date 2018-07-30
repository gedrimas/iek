var express = require("express");
var bodyParser = require("body-parser");

//var uri = 'mongodb://localhost:27017/';

var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://Tomged:slonopotam15@cluster0-shard-00-00-zoyjb.mongodb.net:27017,cluster0-shard-00-01-zoyjb.mongodb.net:27017,cluster0-shard-00-02-zoyjb.mongodb.net:27017/iekdb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
/*MongoClient.connect(uri, function(err, db) {
    db.close();
});*/



var app = express();
var jsonParser = bodyParser.json();

app.use(express.static(__dirname + "/public"));

app.post("/feature", jsonParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);

    var current = req.body.cur;
    var pole = req.body.pol;
    var feature = req.body.fe;
MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client){

    if(err) throw err;
    var db = client.db('iekbasa');
    var regPol = new RegExp(`\\s${pole}Р.*\\s${current}А.*${feature}`);

    var query = {name:{$regex:regPol}};
    db.collection('price').find(query).toArray(function(err, itm){
        if (err) throw err;
        console.log(current);
        res.send(itm);
        client.close();
   });
});

});

app.listen(3000, function(){
    console.log("connect...");
});