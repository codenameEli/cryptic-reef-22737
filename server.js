var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var MOVIES_COLLECTION = "movies";

var app = express();
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

var db;

mongodb.MongoClient.connect('mongodb://heroku_wqwm44gc:a3hk0kh9is75h78oi7qov7p4ar@ds151279.mlab.com:51279/heroku_wqwm44gc', function(err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  db = database;
  console.log('database ready');

  var server = app.listen(process.env.PORT || 4200, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});


// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

app.get('/', function(request, response) {
  db.collection(MOVIES_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get movies.");
    } else {
      res.status(200).json(docs);
    }
  });
});

/*  "/api/movies"
 *    GET: finds all movies
 *    POST: creates a new movie
 */

app.get("/api/movies", function(req, res) {
  db.collection(MOVIES_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get movies.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/movies", function(req, res) {
  var newMovie = req.body;
  newMovie.createDate = new Date();

  if (!req.body.title) {
    handleError(res, "Invalid user input", "Must provide a title.", 400);
  }

  db.collection(MOVIES_COLLECTION).insertOne(newMovie, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new movie.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/movies/:id"
 *    GET: find movie by id
 *    PUT: update movie by id
 *    DELETE: deletes movie by id
 */

app.put("/api/movies/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(MOVIES_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update movie");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/movies/:id", function(req, res) {
  db.collection(MOVIES_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete movie");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
