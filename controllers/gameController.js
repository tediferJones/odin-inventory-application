const { body, validationResult } = require('express-validator')

const Game = require('../models/game');

exports.game_list = (req, res, next) => {
  Game.find({}, 'name')
  .sort({title : 1})
  .exec(function (err, game_list) {
    if (err) { return next(err); }
    res.render('game_list', { title: 'Game List', game_list })
  })
};

exports.game_detail = (req, res, next) => {
  Game.findById(req.params.id)
  .exec(function (err, game_detail) {
    if (err) { return next(err); }

    if (game_detail == null) {
      const err = new Error('Game Not Found');
      err.status = 404;
      return next(err);
    }

    res.render('game_detail', { title: 'Game Detail', game_detail });
  })

};

exports.game_create_get = (req, res, next) => {
  res.render('game_form', { title: 'Create Game' });
};

exports.game_create_post = [
  body('name').trim().isLength({ min: 1 }).escape().withMessage('Game name must be specified'),
  body('description').trim().isLength({ min: 1 }).escape().withMessage('Game Description must be specified'),
  body('price').trim().isLength({ min: 1 }).escape().withMessage('Game price must be specified'),
  body('instock').trim().isLength({ min: 1 }).escape().withMessage('In-stock must be specified'),

  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      res.render('game_form', {title: 'Create Game', game: req.body, errors: errors.array() });
      return;
    }

    const game = new Game({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      instock: req.body.instock,
    });
    game.save((err) => {
      if (err) { return next(err); }
      res.redirect(game.url)
    })
  }
]

exports.game_delete_get = (req, res, next) => {
  Game.findById(req.params.id)
  .exec(function (err, game) {
    if (err) { return next(err); }

    if (game == null) {
      res.redirect('/catalog/games')
    }

    res.render('game_delete', { title: 'Delete Game', game })
  })
};

exports.game_delete_post = (req, res, next) => {
  Game.findByIdAndRemove(req.body.gameid, function deleteGame(err) {
    if (err) { return next(err); }
    res.redirect('/catalog/games')
  })
};

exports.game_update_get = (req, res, next) => {
  Game.findById(req.params.id)
  .exec(function(err, game) {
    if (err) { return next(err); }
    res.render('game_form', { title: 'Update Game', game })
  })
};

exports.game_update_post = [
  body('name').trim().isLength({ min: 1 }).escape().withMessage('Game name must be specified'),
  body('description').trim().isLength({ min: 1 }).escape().withMessage('Game description must be specified'),
  body('price').trim().isLength({ min: 1 }).escape().withMessage('Game price must be specified'),
  body('instock').trim().isLength({ min: 1 }).escape().withMessage('In-Stock must be specified'),

  (req, res, next) => {
    const errors = validationResult(req);

    const game = new Game({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      instock: req.body.instock,
      _id: req.params.id
    })

    if(!errors.isEmpty()) {
      res.render('game_form', { title: 'Update Game', game, errors: errors.array() });
    }

    Game.findByIdAndUpdate(req.params.id, game, {}, function(err, thegame) {
      if (err) { return next(err); }
      res.redirect(game.url);
    })
  }
];