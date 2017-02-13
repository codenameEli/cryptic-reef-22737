var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BearSchema   = new Schema({
  title: string,
  overview: string,
  released: Date,
  rating: number
});

module.exports = mongoose.model('Bear', BearSchema);
