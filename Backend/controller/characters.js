const Character = require('../models/Character');

async function index(req, res) {
    try{
        const characters = await Character.getAll();
        res.status(200).json(characters);
    } catch(err) {
        res.status(500).json({error: err.message})
    }
}

async function show (req, res) {
    try {
        let id = req.params.id;
        const character = await Character.getOneByID(id);
        res.status(200).json(character)
    } catch(err) {
        res.status(404).json({error: err.message})
    }
}

module.exports = { index, show }