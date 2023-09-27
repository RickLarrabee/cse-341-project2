const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Teams']  
    const result = await mongodb.getDatabase().db().collection('teams').find();
    result.toArray().then((teams) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(teams);
    });
};

const getSingle = async (req, res, next) => {
  //#swagger.tags=['Teams']  
    const teamId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('teams').find({_id: teamId})
    result.toArray().then((teams) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(teams);
    }); 
};

const createTeam = async (req, res) => {
  //#swagger.tags=['Teams']  
    const team = {
        teamName: req.body.teamName,
        city: req.body.city,
        state: req.body.state,
        level: req.body.level
    };
    const response = await mongodb.getDatabase().db().collection('teams').insertOne(team);
    if (response.acknowledged) {
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'Some error occurred while updating the team.')
    }
};

const updateTeam = async (req, res) => {
  //#swagger.tags=['Teams']  
    const teamId = new ObjectId(req.params.id);
    const team = {
        teamName: req.body.teamName,
        city: req.body.city,
        state: req.body.state,
        level: req.body.level
    };
    const response = await mongodb.getDatabase().db().collection('teams').replaceOne({ _id: teamId }, team);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'Some error occurred while updating the team.')
    }
};

const deleteTeam = async (req, res) => {
  //#swagger.tags=['Teams']  
    const teamId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('teams').deleteOne({ _id: teamId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'Some error occurred while updating the team.')
    }
};

module.exports = {
    getAll,
    getSingle,
    createTeam,
    updateTeam,
    deleteTeam
};