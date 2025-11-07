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

const Game = require('./models/Game');
const Review = require('./models/Review');

const crearDatosPrueba = async () => {
  try {
    const juegosExistentes = await Game.countDocuments();
    if (juegosExistentes === 0) {
      console.log('🎮 Creando juegos de prueba...');
      
      const juegosPrueba = [
        {
          titulo: 'Minecraft',
          genero: 'Sandbox',
          plataforma: 'Multiplataforma',
          añoLanzamiento: 2011,
          desarrollador: 'Mojang Studios',
          imagenPortada: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2cay.jpg',
          descripcion: 'Juego de construcción y aventura en un mundo de bloques infinito',
          completado: false
        },
        {
          titulo: 'Roblox',
          genero: 'MMO',
          plataforma: 'Multiplataforma',
          añoLanzamiento: 2006,
          desarrollador: 'Roblox Corporation',
          imagenPortada: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2rxa.jpg',
          descripcion: 'Plataforma de juegos en línea donde los usuarios pueden crear y compartir experiencias',
          completado: true
        },
        {
          titulo: 'Armageddon',
          genero: 'Shooter',
          plataforma: 'PC',
          añoLanzamiento: 2020,
          desarrollador: 'Team Armageddon',
          imagenPortada: 'https://via.placeholder.com/300x400/34495e/ecf0f1?text=Armageddon',
          descripcion: 'Juego de disparos táctico en primera persona con modo battle royale',
          completado: false
        },
        {
          titulo: 'Super Mario Odyssey',
          genero: 'Plataformas',
          plataforma: 'Nintendo Switch',
          añoLanzamiento: 2017,
          desarrollador: 'Nintendo',
          imagenPortada: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7z.jpg',
          descripcion: 'Aventura épica de Mario a través de diferentes reinos para rescatar a la Princesa Peach',
          completado: true
        },
        {
          titulo: 'Spider-Man: Miles Morales',
          genero: 'Acción-Aventura',
          plataforma: 'PlayStation',
          añoLanzamiento: 2020,
          desarrollador: 'Insomniac Games',
          imagenPortada: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2lbe.jpg',
          descripcion: 'Aventura del Hombre Araña Miles Morales defendiendo Nueva York',
          completado: false
        },
        {
          titulo: 'Grand Theft Auto V',
          genero: 'Acción-Aventura',
          plataforma: 'Multiplataforma',
          añoLanzamiento: 2013,
          desarrollador: 'Rockstar Games',
          imagenPortada: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1t8u.jpg',
          descripcion: 'Historia criminal en la ciudad de Los Santos con tres protagonistas',
          completado: true
        },
        {
          titulo: 'Plants vs Zombies',
          genero: 'Estrategia',
          plataforma: 'Multiplataforma',
          añoLanzamiento: 2009,
          desarrollador: 'PopCap Games',
          imagenPortada: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1s8d.jpg',
          descripcion: 'Juego de defensa de torres donde plantas defienden contra zombies',
          completado: true
        },
        {
          titulo: 'Haikyuu!! Touch the Dream',
          genero: 'Deportes',
          plataforma: 'Mobile',
          añoLanzamiento: 2020,
          desarrollador: 'Bandai Namco',
          imagenPortada: 'https://via.placeholder.com/300x400/e74c3c/ecf0f1?text=Haikyuu',
          descripcion: 'Juego de voleibol basado en el anime Haikyuu con personajes icónicos',
          completado: false
        },
        {
          titulo: 'The Legend of Zelda: Breath of the Wild',
          genero: 'Aventura',
          plataforma: 'Nintendo Switch',
          añoLanzamiento: 2017,
          desarrollador: 'Nintendo',
          imagenPortada: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7y.jpg',
          descripcion: 'Aventura épica en mundo abierto donde Link explora Hyrule',
          completado: true
        }
      ];

      for (const juegoData of juegosPrueba) {
        const juego = new Game(juegoData);
        await juego.save();
        console.log(`✅ Creado: ${juegoData.titulo}`);
      }

      console.log('🎉 Todos los juegos de prueba creados exitosamente!');
    }
  } catch (error) {
    console.log('❌ Error creando datos de prueba:', error);
  }
};

const crearResenasPrueba = async () => {
  try {
    const reseñasExistentes = await Review.countDocuments();
    if (reseñasExistentes === 0) {
      console.log('📝 Creando reseñas de prueba...');
      
      const juegos = await Game.find();
      
      const reseñasPrueba = [
        {
          juegoId: juegos.find(j => j.titulo === 'Minecraft')._id,
          puntuacion: 5,
          textoReseña: 'Increíble juego de creatividad y aventura. Las posibilidades son infinitas!',
          horasJugadas: 150,
          dificultad: 'Normal',
          recomendaria: true
        },
        {
          juegoId: juegos.find(j => j.titulo === 'Grand Theft Auto V')._id,
          puntuacion: 4,
          textoReseña: 'Historia épica y mundo abierto impresionante, pero un poco violento.',
          horasJugadas: 80,
          dificultad: 'Normal',
          recomendaria: true
        },
        {
          juegoId: juegos.find(j => j.titulo === 'Plants vs Zombies')._id,
          puntuacion: 5,
          textoReseña: 'Divertidísimo y adictivo. Perfecto para jugar en ratos libres.',
          horasJugadas: 25,
          dificultad: 'Fácil',
          recomendaria: true
        },
        {
          juegoId: juegos.find(j => j.titulo === 'Super Mario Odyssey')._id,
          puntuacion: 5,
          textoReseña: 'Mario en su mejor momento. Gráficos hermosos y jugabilidad perfecta.',
          horasJugadas: 45,
          dificultad: 'Normal',
          recomendaria: true
        },
        {
          juegoId: juegos.find(j => j.titulo === 'Roblox')._id,
          puntuacion: 3,
          textoReseña: 'Mucha variedad pero la calidad de los juegos es muy irregular.',
          horasJugadas: 60,
          dificultad: 'Fácil',
          recomendaria: false
        }
      ];

      for (const reseñaData of reseñasPrueba) {
        const reseña = new Review(reseñaData);
        await reseña.save();
        console.log(`✅ Reseña creada para: ${juegos.find(j => j._id.equals(reseñaData.juegoId)).titulo}`);
      }

      console.log('📚 Todas las reseñas de prueba creadas!');
    }
  } catch (error) {
    console.log('❌ Error creando reseñas:', error);
  }
};

crearDatosPrueba();
crearResenasPrueba();

app.use('/api/juegos', require('./routes/games'));
app.use('/api/resenas', require('./routes/reviews'));

app.get('/', (req, res) => {
  res.json({ mensaje: '🚀 Servidor GameTracker funcionando!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🎯 Servidor ejecutándose en http://localhost:${PORT}`);
});