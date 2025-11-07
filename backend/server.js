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
    console.log('🎮 Forzando creación de juegos de prueba...');
    
    await Game.deleteMany({});
    
    const juegosPrueba = [
      {
        titulo: 'Minecraft',
        genero: 'Sandbox',
        plataforma: 'Multiplataforma',
        añoLanzamiento: 2011,
        desarrollador: 'Mojang Studios',
        imagenPortada: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2ZZccAoBC38_tPjrEHta4MjjzF5Jkd_61IDgwm3hCmdOz0VSvVBPiFvU-lviqjOPYWbJdkmIJBJcBkWBnx7lawX3Wf1-rNxionOepvm9Ojg&s=10',
        descripcion: 'Juego de construcción y aventura en un mundo de bloques infinito',
        completado: false
      },
      {
        titulo: 'Roblox',
        genero: 'MMO',
        plataforma: 'Multiplataforma',
        añoLanzamiento: 2006,
        desarrollador: 'Roblox Corporation',
        imagenPortada: 'https://images.rbxcdn.com/5348266ea6c5e67b19d6a814cbbb70f6.jpg',
        descripcion: 'Plataforma de juegos en línea donde los usuarios pueden crear y compartir experiencias',
        completado: true
      },
      {
        titulo: 'Armageddon',
        genero: 'Shooter',
        plataforma: 'PC',
        añoLanzamiento: 2020,
        desarrollador: 'Team Armageddon',
        imagenPortada: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEzG-RUf0RjcyNeJ73AtYEqT-sWOm2-TI19Q&s',
        descripcion: 'Juego de disparos táctico en primera persona con modo battle royale',
        completado: false
      },
      {
        titulo: 'Super Mario Odyssey',
        genero: 'Plataformas',
        plataforma: 'Nintendo Switch',
        añoLanzamiento: 2017,
        desarrollador: 'Nintendo',
        imagenPortada: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVnxUccI8aAJRZug5RrERBb1qnhfZbLtsjLw&s',
        descripcion: 'Aventura épica de Mario a través de diferentes reinos para rescatar a la Princesa Peach',
        completado: true
      },
      {
        titulo: 'Spider-Man: Miles Morales',
        genero: 'Acción-Aventura',
        plataforma: 'PlayStation',
        añoLanzamiento: 2020,
        desarrollador: 'Insomniac Games',
        imagenPortada: 'https://image.api.playstation.com/vulcan/ap/rnd/202008/1020/T45iRN1bhiWcJUzST6UFGBvO.png',
        descripcion: 'Aventura del Hombre Araña Miles Morales defendiendo Nueva York',
        completado: false
      },
      {
        titulo: 'Grand Theft Auto V',
        genero: 'Acción-Aventura',
        plataforma: 'Multiplataforma',
        añoLanzamiento: 2013,
        desarrollador: 'Rockstar Games',
        imagenPortada: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5utOgQBzVsiZaDfhFAkf3c6S2ZKPmgIcZ9g&s',
        descripcion: 'Historia criminal en la ciudad de Los Santos con tres protagonistas',
        completado: true
      },
      {
        titulo: 'Plants vs Zombies',
        genero: 'Estrategia',
        plataforma: 'Multiplataforma',
        añoLanzamiento: 2009,
        desarrollador: 'PopCap Games',
        imagenPortada: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyxaVYUd616trVj3RcVasCTsUx-m8z36f8gg&s',
        descripcion: 'Juego de defensa de torres donde plantas defienden contra zombies',
        completado: true
      },
      {
        titulo: 'Haikyuu!! Touch the Dream',
        genero: 'Deportes',
        plataforma: 'Mobile',
        añoLanzamiento: 2020,
        desarrollador: 'Bandai Namco',
        imagenPortada: 'https://static.wixstatic.com/media/5f3158_a05c2a7af7ff4f9ebeb1396af81f7654~mv2.png/v1/fill/w_1200,h_628,al_c/5f3158_a05c2a7af7ff4f9ebeb1396af81f7654~mv2.png',
        descripcion: 'Juego de voleibol basado en el anime Haikyuu con personajes icónicos',
        completado: false
      },
      {
        titulo: 'The Legend of Zelda: Breath of the Wild',
        genero: 'Aventura',
        plataforma: 'Nintendo Switch',
        añoLanzamiento: 2017,
        desarrollador: 'Nintendo',
        imagenPortada: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdbuC7wWPigvAHqIYVwLKUdFTNdh6lmGAKiQ&s',
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
    return true;
  } catch (error) {
    console.log('❌ Error creando datos de prueba:', error);
    return false;
  }
};

const crearResenasPrueba = async () => {
  try {
    console.log('📝 Creando reseñas de prueba...');
    
    await Review.deleteMany({});
    
    const juegos = await Game.find();
    console.log(`🔍 Encontrados ${juegos.length} juegos para crear reseñas`);
    
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
      const juego = juegos.find(j => j._id.equals(reseñaData.juegoId));
      if (juego) {
        const reseña = new Review(reseñaData);
        await reseña.save();
        console.log(`✅ Reseña creada para: ${juego.titulo}`);
      } else {
        console.log(`❌ No se encontró el juego para la reseña`);
      }
    }

    console.log('📚 Todas las reseñas de prueba creadas!');
  } catch (error) {
    console.log('❌ Error creando reseñas:', error);
  }
};

// EJECUTAR EN ORDEN CORRECTO
const inicializarDatos = async () => {
  console.log('🚀 Inicializando datos de prueba...');
  const juegosCreados = await crearDatosPrueba();
  if (juegosCreados) {
    await crearResenasPrueba();
  }
  console.log('🎯 Datos inicializados correctamente!');
};

inicializarDatos();

app.use('/api/juegos', require('./routes/games'));
app.use('/api/resenas', require('./routes/reviews'));

app.get('/', (req, res) => {
  res.json({ mensaje: '🚀 Servidor GameTracker funcionando!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🎯 Servidor ejecutándose en http://localhost:${PORT}`);
});