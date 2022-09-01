const async = require('async');
const { body, validationResult } = require("express-validator")

const GameConsole = require('../models/gameConsole');
const Game = require('../models/game');
const Accessory = require('../models/accessory');

//SPECIAL
exports.index = (req, res, next) => {
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
  GameConsole.find({}, 'name')
    .sort({title : 1})
    .exec(function (err, gameConsole_list) {
      if (err) { return next(err); }
      res.render('gameConsole_list', { title: 'Game Console List', gameConsole_list })
    })
};

exports.gameConsole_detail = (req, res, next) => {
  async.parallel({
    gameConsole_info(callback) {
      GameConsole.findById(req.params.id)
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
  res.render('gameConsole_form', { title: 'Create Game Console' });
};

exports.gameConsole_create_post = [
  // Sanitize Inputs
  body('name').trim().isLength({ min: 1 }).escape().withMessage('Console name must be specified.'),
  body('description').trim().isLength({ min: 1 }).escape().withMessage('Console description must be specified'),
  body('price').trim().isLength({ min: 1 }).escape().withMessage('Console price must be specified'),
  body('instock').trim().isLength({ min: 1 }).escape().withMessage('In-stock must be specified'),

  (req, res, next) => {
    // Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('gameConsole_form', { title: 'Create', gameConsole: req.body, errors: errors.array() });
      return;
    }

    // if no errors, create and save
    const gameConsole = new GameConsole({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      instock: req.body.instock,
    });
    gameConsole.save((err) => {
      if (err) { return next(err); }
      res.redirect(gameConsole.url);
    })
  }
]

exports.gameConsole_delete_get = (req, res, next) => {
  // res.send('NOT IMPLEMENTED: Game Console Delete Get');
  // doesnt need to be parallel cuz only 1 task
  async.parallel({
    gameConsole(callback) {
      GameConsole.findById(req.params.id)
      .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err); }

    if (results.gameConsole == null) {
      res.redirect('/catalog/gameConsoles')
    }

    res.render('gameConsole_delete', { title: 'Delete Game Console', gameConsole: results.gameConsole })
  })
};

exports.gameConsole_delete_post = (req, res, next) => {
  GameConsole.findByIdAndRemove(req.body.gameConsoleid, function deleteGameConsole(err) {
    if (err) { return next(err); }
    res.redirect('/catalog/gameConsoles')
  })
};

exports.gameConsole_update_get = (req, res, next) => {
  // res.send('NOT IMPLEMENTED: Game Console Update Get');
  // GameConsole.findById(req.params.id).exec(function(err, results) {
  //   if (err) { return next(err); }
  //   console.log(results.gameConsole)
  //   res.render('gameConsole_form', { title: 'Update Game Console', gameConsole: results.gameConsole })
  // })
  async.parallel({
    gameConsole(callback) {
      GameConsole.findById(req.params.id)
      .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err); }

    res.render('gameConsole_form', { title: "Update Game Console", gameConsole: results.gameConsole })
  })
};

exports.gameConsole_update_post = [
  // res.send('NOT IMPLEMENTED: Game Console Update Post');

  // Sanitize Inputs
  body('name').trim().isLength({ min: 1 }).escape().withMessage('Console name must be specified.'),
  body('description').trim().isLength({ min: 1 }).escape().withMessage('Console description must be specified'),
  body('price').trim().isLength({ min: 1 }).escape().withMessage('Console price must be specified'),
  body('instock').trim().isLength({ min: 1 }).escape().withMessage('In-stock must be specified'),

  (req, res, next) => {
    const errors = validationResult(req);

    const gameConsole = new GameConsole({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      instock: req.body.instock,
      _id: req.params.id
    })

    if (!errors.isEmpty()) {
      res.render('gameConsole_form', { title: 'Update Game Console', gameConsole: gameConsole, errors: errors.array() })
    }

    GameConsole.findByIdAndUpdate(req.params.id, gameConsole, {}, function(err, thegameconsole) {
      if (err) { return next(err); }
      res.redirect(gameConsole.url);
    })
  }
];