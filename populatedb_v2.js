#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')

var GameConsole = require('./models/gameConsole')
var Game = require('./models/game')
var Accessory = require('./models/accessory')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var gameConsoles = []
var games = []
var accessories = []

function gameConsoleCreate(name, description, price, instock, cb) {
  var gameConsole = new GameConsole({
    name,
    description,
    price,
    instock,
  })

  gameConsole.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Game Console: ' + gameConsole);
    gameConsoles.push(gameConsole)
    cb(null, gameConsole);
  });
}

function gameCreate(name, description, release_date, price, instock, cb) {
  var game = new Game({
    name,
    description,
    release_date,
    price,
    instock,
  });

  game.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    };
    console.log('New Game: ' + game);
    games.push(game)
    cb(null, game);
  })
}

function accessoryCreate(name, description, price, instock, cb) {
  var accessory = new Accessory({
    name,
    description,
    price,
    instock,
  })

  accessory.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    };
    console.log('New Accessory: ' + accessory);
    accessories.push(accessory);
    cb(null, accessory)
  })
}

function createGameConsoles(cb) {
  async.series([
    function(callback) {
      gameConsoleCreate('Game Boy', 'The classic and original DMG Game Boy', 89.99, 12, callback);
    },
    function(callback) {
      gameConsoleCreate('Game Boy Color', 'Now with color!', 79.99, 78, callback);
    },
    function(callback) {
      gameConsoleCreate('Game Boy Advance', 'With a backlit screen and a new landscape orientation for superior grip!', 69.99, 152, callback);
    },
    function(callback) {
      gameConsoleCreate('Game Boy Advance SP', 'All the good things about the Game Boy Advance in a more compact size', 74.99, 99, callback);
    },    
  ],
  cb);
}

function createGames(cb) {
  async.series([
    function(callback) {
      gameCreate('Metroid Zero Mission', 'A modern remake of the classic Metroid for then NES', 2004, 19.99, 48, callback);
    },
    function(callback) {
      gameCreate('Metroid Fusion', 'Samus returns from SR388 but a nasty surprise awaits', 2002, 14.99, 69, callback);
    },
    function(callback) {
      gameCreate('Pokemon Yellow', 'The enhanced version of the original Pokemon Red and Pokemon Blue', 1998, 17.99, 45, callback);
    },
    function(callback) {
      gameCreate('Pokemon Crystal', 'The enhacned version of the 2nd generation pokemon games, gold and silver', 2000, 16.99, 62, callback);
    },
    function(callback) {
      gameCreate('Pokemon Emerald', 'The enhanced version of the 3rd generation Pokemon games, ruby and sapphire', 2004, 14.99, 106, callback);
    },
    function(callback) {
      gameCreate('Wario Land 4', 'Follow Wario in his 4th adventure of the Ninetendo series', 2001, 11.99, 98, callback);
    },
    function(callback) {
      gameCreate(`Spider-Man Myserio's Menace`, 'Play as spider-man in this classic game brought to you by Sony', 2001, 11.99, 42, callback);
    },
  ],
  cb);
}

function createAccessories(cb) {
  async.series([
    function(callback) {
      accessoryCreate('Game Boy Link Cable', 'Connect two (or more) gameboys to enable multiplier battles and/or trading!', 9.99, 157, callback);
    },
    function(callback) {
      accessoryCreate('Super Game Boy', 'Play your favorite Game Boy games on the big screen by using this cartridge with a SNES ', 14.99, 82, callback);
    },
    function(callback) {
      accessoryCreate('Game Boy Camera', 'You can now take bad photos with a bad camera, WOW!', 19.99, 36, callback);
    },
    function(callback) {
      accessoryCreate('Game Boy Printer', 'Wanna see how bad those photos turned out?  Try this!', 24.99, 22, callback);
    },
    function(callback) {
      accessoryCreate('Bar Code Boy', `I can't even pretend like this actually useful but please buy it`, 99.99, 3, callback);
    },

  ],
  cb);
}

async.series([
    createGameConsoles,
    createGames,
    createAccessories
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('IDK I GUESS DONE');
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});
