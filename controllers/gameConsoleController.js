const async = require('async');
const GameConsole = require('../models/gameConsole');
const Game = require('../models/game');
const Accessory = require('../models/accessory');
const gameConsole = require('../models/gameConsole');

//SPECIAL
exports.index = (req, res, next) => {
  // res.send('NOT IMPLEMENTED: Site Home Page');
  async.parallel({
    gameConsole_count(callback) {
      GameConsole.countDocuments({}, callback);
    },
    game_count(callback) {
      Game.countDocuments({}, callback);
    },
    accessory_count(callback) {
      Accessory.countDocuments({}, callback);
    }
  }, (err, results) => {
    res.render('index', { title: "The Game Boy Store", error: err, data: results });
  });
};


exports.gameConsole_list = (req, res, next) => {
  // res.send('NOT IMPLEMENTED: Game Console List');
  GameConsole.find({}, 'name')
    .sort({title : 1})
    .exec(function (err, gameConsole_list) {
      if (err) { return next(err); }
      res.render('gameConsole_list', { title: 'Game Console List', gameConsole_list })
    })
};

exports.gameConsole_detail = (req, res, next) => {
  // res.send('NOT IMPLEMENTED: Game Console Detail');
  async.parallel({
    gameConsole_info(callback) {
      gameConsole.findById(req.params.id)
      .exec(callback);
    }
  }, (err, results) => {
    if (err) { return next(err); }

    if (results.gameConsole_info == null) {
      // No Results found
      const err = new Error('Game Console Not Found');
      err.status = 404;
      return next(err);
    }

    res.render('gameConsole_detail', {title: 'Game Console Details', gameConsole_info: results.gameConsole_info })
  })
};

exports.gameConsole_create_get = (req, res, next) => {
  res.send('NOT IMPLEMENTED: Game Console Create Get');
};

exports.gameConsole_create_post = (req, res, next) => {
  res.send('NOT IMPLEMENTED: Game Console Create Post');
};

exports.gameConsole_delete_get = (req, res, next) => {
  res.send('NOT IMPLEMENTED: Game Console Delete Get');
};

exports.gameConsole_delete_post = (req, res, next) => {
  res.send('NOT IMPLEMENTED: Game Console Delete Post');
};

exports.gameConsole_update_get = (req, res, next) => {
  res.send('NOT IMPLEMENTED: Game Console Update Get');
};

exports.gameConsole_update_post = (req, res, next) => {
  res.send('NOT IMPLEMENTED: Game Console Update Post');
};