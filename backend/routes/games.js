const express = require('express');
const Game = require('../models/Game');
const router = express.Router();

// GET - Obtener todos los juegos
router.get('/', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Crear nuevo juego
router.post('/', async (req, res) => {
  const game = new Game(req.body);
  try {
    const newGame = await game.save();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;