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

conectarDB();

// ======== AGREGAR AQUÍ LOS DATOS DE PRUEBA ========
const Game = require('./models/Game');
const Review = require('./models/Review');

const crearDatosPrueba = async () => {
  try {
    const juegosExistentes = await Game.countDocuments();
    if (juegosExistentes === 0) {
      const zelda = new Game({
        titulo: 'The Legend of Zelda: Breath of the Wild',
        genero: 'Aventura',
        plataforma: 'Nintendo Switch',
        añoLanzamiento: 2017,
        desarrollador: 'Nintendo',
        imagenPortada: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7y.jpg',
        descripcion: 'Un épico juego de aventuras en mundo abierto',
        completado: true
      });
      await zelda.save();

      const minecraft = new Game({
        titulo: 'Minecraft',
        genero: 'Sandbox',
        plataforma: 'PC',
        añoLanzamiento: 2011,
        desarrollador: 'Mojang',
        imagenPortada: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2cay.jpg',
        descripcion: 'Juego de construcción y aventura en un mundo de bloques',
        completado: false
      });
      await minecraft.save();

      console.log('✅ Datos de prueba creados');
    }
  } catch (error) {
    console.log('Error creando datos:', error);
  }
};
crearDatosPrueba();
// ======== FIN DATOS DE PRUEBA ========

app.use('/api/juegos', require('./routes/games'));
app.use('/api/resenas', require('./routes/reviews'));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: '🚀 Servidor GameTracker funcionando!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🎯 Servidor ejecutándose en http://localhost:${PORT}`);
});