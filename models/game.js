var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GameSchema = new Schema (
  {
    name: {type: String, required: true, maxLength: 100},
    description: {type: String, required: true},
    release_year: {type: Number, min: 1950, max: 2030},
    // CONSIDER ADDING TYPE (i.e. game format such as GB, GBC, or GBA)
    price: {type: Number, required: true, min: 0},
    instock: {type: Number, required: true, min: 0}
  }
);

GameSchema
.virtual('url')
.get(function () {
  return '/catalog/game/' + this._id;
});

module.exports = mongoose.model('Game', GameSchema);