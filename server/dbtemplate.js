// this isn't actually used for anything it's for visualizing the db

var ObjectID = require('mongodb').ObjectID;

var databaseName = "scrappedideas";
var exampleData = {
  // The scrap collection, contains all the scraps in our system
  "scraps": {
    {
      "_id": new ObjectID("000000000000000000000001"),
      "url": "scraps/scrapid",
      "path": "some path",
      "finishedDrawings": [],
    }
};
