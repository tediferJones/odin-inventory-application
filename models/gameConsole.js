var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ConsoleSchema = new Schema (
  {
    name: {type: String, required: true, maxLength: 100},
    description: {type: String, required: true},
    // CONSIDER ADDING A "CONDITION" ATTR, could use simple scale of 1/10 - 10/10
    price: {type: Number, required: true},
    instock: {type: Number, required: true}
  }
);

// Virtual for Console's URL
ConsoleSchema
.virtual('url')
.get(function () {
  return '/catalog/gameConsole/' + this._id;
});

module.exports = mongoose.model('Console', ConsoleSchema);