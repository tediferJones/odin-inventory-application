var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AccessorySchema = new Schema(
  {
    name: {type: String, required: true, maxLength: 100},
    description: {type: String, required: true},
    // COME BACK TO THIS
    // compatibility is based on 
    // compatible_with: {type:},
    price: {type: Number, required: true, min: 0},
    instock: {type: Number, required: true, min: 0},
  }
);

AccessorySchema
.virtual('url')
.get(function () {
  return '/catalog/accessory/' + this._id;
});

module.exports = mongoose.model('Accessory', AccessorySchema);