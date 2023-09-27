const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Players']  
    const result = await mongodb.getDatabase().db().collection('players').find();
    result.toArray().then((players) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(players);
    });
};

const getSingle = async (req, res, next) => {
  //#swagger.tags=['Players']  
    const playerId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('players').find({_id: playerId})
    result.toArray().then((players) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(players);
    }); 
};

const createPlayer = async (req, res) => {
  //#swagger.tags=['Players']  
    const player = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        playerNumber: req.body.playerNumber,
        playerPosition: req.body.playerPosition,
        email:req.body.email,
        phoneNumber:req.body.phoneNumber,
        birthday:req.body.birthday,
        teamId:req.body.teamId
    };
    const response = await mongodb.getDatabase().db().collection('players').insertOne(player);
    if (response.acknowledged) {
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'Some error occurred while updating the player.')
    }
};

const updatePlayer = async (req, res) => {
  //#swagger.tags=['Players']  
    const playerId = new ObjectId(req.params.id);
    const player = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        playerNumber: req.body.playerNumber,
        playerPosition: req.body.playerPosition,
        email:req.body.email,
        phoneNumber:req.body.phoneNumber,
        birthday:req.body.birthday,
        teamId:req.body.teamId
    };
    const response = await mongodb.getDatabase().db().collection('players').replaceOne({ _id: playerId }, player);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'Some error occurred while updating the player.')
    }
};

const deletePlayer = async (req, res) => {
  //#swagger.tags=['Players']  
    const playerId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('players').deleteOne({ _id: playerId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'Some error occurred while updating the player.')
    }
};

module.exports = {
    getAll,
    getSingle,
    createPlayer,
    updatePlayer,
    deletePlayer
};