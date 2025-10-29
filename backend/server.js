const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

const MONGODB_URI = 'mongodb+srv://jacobogarcesoquendo:aFJzVMGN3o7fA38A@cluster0.mqwbn.mongodb.net/cristian_acosta';

// Conectar a MongoDB
const conectarDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Base de datos conectada");
  } catch (error) {
    console.log("❌ Error conectando a la base de datos:", error);
   process.exit(1);
  }
};

// Llamar la función para conectar
conectarDB();

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: '🚀 Servidor GameTracker funcionando!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🎯 Servidor ejecutándose en http://localhost:${PORT}`);
});