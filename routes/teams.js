const express = require('express');
const router = express.Router();

const teamsController = require('../controllers/teams');
const validation = require('../middleware/validation');

router.get('/', teamsController.getAll);

router.get('/:id', teamsController.getSingle);

router.post('/', validation.saveTeam, teamsController.createTeam);

router.put('/:id', validation.saveTeam, teamsController.updateTeam);

router.delete('/:id', teamsController.deleteTeam);

module.exports = router;