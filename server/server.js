// Imports the express Node module.
var express = require('express');
// Creates an Express server.
var app = express();
// Parses response bodies.
var bodyParser = require('body-parser');
var validate = require('express-jsonschema').validate;
var mongo_express = require('mongo-express/lib/middleware');
// Use default Mongo Express configuration
var mongo_express_config = require('mongo-express/config.default.js');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/scrappedideas';

// Import Node's HTTPS API.
var https = require('https');
// Import Node's file system API.
var fs = require('fs');
var path = require('path');


MongoClient.connect(url, function(err, db) {
  app.use(bodyParser.text());
  app.use(bodyParser.json());
  app.use(express.static('../client/build'));
  app.use('/mongo_express', mongo_express(mongo_express_config));

  // store the image string in the database
  function storeImage(image, callback){
    var newScrap = {
      "image": image,
      "finishedDrawings": []
    }
    db.collection('scraps').insertOne(image, function(err, result){
      if (err) {
        return callback(err);
      }
      newScrap._id = result.insertedId;
      callback(null, newScrap);
    })
  }

  // put a new (scrapid, image, []) into database
  app.post('/scraps', function(req, res) {
    var image = req.params.image;
    var address = req.params.url;
    storeImage(image, function(err, id){
      if (err) {
        res.status(500).send("A database error occured: " + err);
      } else {
        res.send(id);
      }
    });
  });

  // adds an image to the finishedDrawings array of the specified unfinished image
  function addFinishedDrawing(id, image, callback){
    db.collection('scraps').update(
      {_id : id}, {$push: {finishedDrawings: image}},
      function(err, result) {
        if(err) {
          return callback(err);
        }
        callback(null, result);
  }

  // put a new path into the finished path array of an element of the database
  app.post('/scraps/:scrapid/finished', function(req, res) {
    var id = req.params.id
    var image = req.params.image
      addFinishedDrawing(id, image, function(err, result){
        if (err) {
          res.status(500).send("A database error occured: " + err);
        } else {
          res.status(201);
          res.send(result);
        }
      });
  });

  function getFinishedDrawings(id, callback){
    var document = db.collection('scraps').findOne({_id : id}, function(err){
      if(err){
        callback(err);
      }
    });
    callback(null, tojson(document));
  }

  // return each finished image in the array contained by the document with id === scrapid
  app.get('/scraps/:scrapid/finished', function(req, res) {
    var id = req.params.id;
    getFinishedDrawings(id, function(err, result){
      if (err) {
        res.status(500).send("A database error occured: " + err);
      }
      res.send(result);
    }
});

  function getParticularDrawing(id, image, callback){
    var document = db.collection('scraps').findOne({_id : id}, {finishedDrawing: {$elemMatch : ObjectID(image)}}, function(err){
      if(err){
        callback(err);
      }
    });
    callback(null, tojson(document));
  }

  // return finished image specified
  app.get('/folder/:image', function(req, res) {
    var id = req.params.id;
    var image = req.params.image;
    getParticularDrawing(id, image, function(err, result){
      if (err) {
        res.status(500).send("A database error occured: " + err);
      }
      res.send(result);
    })

  });

  app.get('/scraps', function(req, res)) {
    db.collection('scraps').agregate({$sample: {size: 1}}).toArray(function(err, item){
      if (err) {
        res.status(500).send("A database error occured: " + err);
      }
      else if (item[0] === null){
        res.status(500).send("No item was found: " + err);
      }
      var scrap = item[0];
      res.send(scrap);
    })
  }

  // Starts an https server on port 3000!
  app.listen(3000, function() {
    console.log("Server listening on port 3000")
  })
});
