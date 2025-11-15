const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI = 'mongodb+srv://jacobogarcesoquendo:aFJzVMGN3o7fA38A@cluster0.mqwbn.mongodb.net/cristian_david_acosta_hernandez';

const conectarDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Base de datos conectada");
  } catch (error) {
    console.log("❌ Error conectando a la base de datos:", error);
    process.exit(1);
  }
};

conectarDB();

app.use('/api/juegos', require('./routes/games'));
app.use('/api/resenas', require('./routes/reviews'));

// Ruta para verificar servidor
app.get('/', (req, res) => {
  res.json({ mensaje: '🚀 Servidor GameTracker funcionando!' });
});

// ❗ Ruta OPCIONAL para borrar TODO (juegos + reseñas)
app.delete('/api/borrarTodo', async (req, res) => {
  try {
    const Game = require('./models/Game');
    const Review = require('./models/Review');

    await Game.deleteMany({});
    await Review.deleteMany({});

    res.json({ message: '🔥 Todos los juegos y reseñas fueron eliminados' });
  } catch (error) {
    res.status(500).json({ message: 'Error al borrar datos', error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🎯 Servidor ejecutándose en http://localhost:${PORT}`);
});
