const express = require('express');
const router = express.Router();

const teamsController = require('../controllers/teams');
const validation = require('../middleware/validation');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', teamsController.getAll);

router.get('/:id', teamsController.getSingle);

router.post('/', isAuthenticated, validation.saveTeam, teamsController.createTeam);

router.put('/:id', isAuthenticated, validation.saveTeam, teamsController.updateTeam);

router.delete('/:id', isAuthenticated, teamsController.deleteTeam);

module.exports = router;