

var express = require("express");
var bodyParser = require("body-parser");
var uri = 'mongodb://Tomged:slonopotam1@ds233320.mlab.com:33320/iek2';
var MongoClient = require('mongodb').MongoClient;
var Search = require('./search.js');

var app = express();
var jsonParser = bodyParser.json();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + "/public"));

app.post("/feature", jsonParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);

    var formData = req.body;
    var searchFunc = new Search(formData);
    var regPol = searchFunc.getReg();
    var collectionType = searchFunc.getCollection();

    MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client){
        if(err) throw err;
        var db = client.db('iek2');

        var query = {name:{$regex:regPol}};
        db.collection(collectionType).find(query).toArray(function(err, itm){
            if (err) throw err;
            res.send(itm);
            client.close();
   });
});

});

app.listen(app.get('port'), function(){
    console.log("connect...");
});