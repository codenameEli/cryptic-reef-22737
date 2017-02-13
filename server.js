const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const mongoose   = require('mongoose');
mongoose.connect('');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 4200;
const router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'welcome to the end!'});
});

app.use('/api', router);

app.listen(port);
console.log('this is where the magic happens ' + port);


//
// // Run the app by serving the static files
// // in the dist directory
// app.use(express.static(__dirname + '/dist'));
// // Start the app by listening on the default
// // Heroku port
// app.listen(process.env.PORT || 4200);
//
// app.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname + '/dist/index.html'));
// });
