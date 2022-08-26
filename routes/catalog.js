const express = require('express');
const router = express.Router();

const accessory_controller = require('../controllers/accessoryController');
const gameConsole_controller = require('../controllers/gameConsoleController');
const game_controller = require('../controllers/gameController');

// Get Home Page
// SPECIAL
router.get('/', gameConsole_controller.index);


// ACCESSORY ROUTES
router.get('/accessories', accessory_controller.accessory_list);

// THE "create" PARAMETER WILL BE READ AS AN id UNLESS PLACED BEFORE
// ALL ROUTES CONTAINING :id
router.get('/accessory/create', accessory_controller.accessory_create_get);
router.post('/accessory/create', accessory_controller.accessory_create_post);

router.get('/accessory/:id', accessory_controller.accessory_detail);
router.get('/accessory/:id/delete', accessory_controller.accessory_delete_get);
router.post('/accessory/:id/delete', accessory_controller.accessory_delete_post);
router.get('/accessory/:id/update', accessory_controller.accessory_update_get);
router.post('/accessory/:id/update', accessory_controller.accessory_update_post);


// GAME CONSOLE ROUTES
router.get('/gameConsoles', gameConsole_controller.gameConsole_list);

// THE "create" PARAMETER WILL BE READ AS AN id UNLESS PLACED BEFORE
// ALL ROUTES CONTAINING :id
router.get('/gameConsole/create', gameConsole_controller.gameConsole_create_get);
router.post('/gameConsole/create', gameConsole_controller.gameConsole_create_post);

router.get('/gameConsole/:id', gameConsole_controller.gameConsole_detail);
router.get('/gameConsole/:id/delete', gameConsole_controller.gameConsole_delete_get);
router.post('/gameConsole/:id/delete', gameConsole_controller.gameConsole_delete_post);
router.get('/gameConsole/:id/update', gameConsole_controller.gameConsole_update_get);
router.post('/gameConsole/:id/update', gameConsole_controller.gameConsole_update_post);


// GAME ROUTES
router.get('/games', game_controller.game_list);

// THE "create" PARAMETER WILL BE READ AS AN id UNLESS PLACED BEFORE
// ALL ROUTES CONTAINING :id
router.get('/game/create', game_controller.game_create_get);
router.post('/game/create', game_controller.game_create_post);

router.get('/game/:id', game_controller.game_detail);
router.get('/game/:id/delete', game_controller.game_delete_get);
router.post('/game/:id/delete', game_controller.game_delete_post);
router.get('/game/:id/update', game_controller.game_update_get);
router.post('/game/:id/update', game_controller.game_update_post);

module.exports = router;