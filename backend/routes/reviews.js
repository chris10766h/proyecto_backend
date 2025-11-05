const express = require('express');
const Review = require('../models/Review');
const router = express.Router();

// GET - Obtener todas las reseñas
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().populate('juegoId');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Reseñas por juego específico
router.get('/juego/:juegoId', async (req, res) => {
  try {
    const reviews = await Review.find({ juegoId: req.params.juegoId }).populate('juegoId');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Crear nueva reseña
router.post('/', async (req, res) => {
  const review = new Review(req.body);
  try {
    const newReview = await review.save();
    await newReview.populate('juegoId');
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT - Actualizar reseña
router.put('/:id', async (req, res) => {
  try {
    req.body.fechaActualizacion = new Date();
    const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('juegoId');
    res.json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Eliminar reseña
router.delete('/:id', async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reseña eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;