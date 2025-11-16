# Backend - GameTracker

## 📌 Descripción

Este es el **backend** del proyecto **GameTracker**, una API REST creada con **Node.js**, **Express** y **MongoDB**. Se encarga de gestionar videojuegos y reseñas, permitiendo al frontend realizar operaciones CRUD.

---

## 🚀 Tecnologías utilizadas

* **Node.js**
* **Express**
* **MongoDB**
* **Mongoose**
* **Nodemon** (en desarrollo)

---

## 📁 Estructura del proyecto

```
backend/
├── models/
│   ├── Game.js
│   └── Review.js
├── routes/
│   ├── games.js
│   └── reviews.js
├── server.js
├── package.json
└── package-lock.json
```

---

## 🔧 Instalación y configuración

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/chris10766h/proyecto_backend.git
```

### 2️⃣ Entrar a la carpeta del backend

```bash
cd backend
```

### 3️⃣ Instalar dependencias

```bash
npm install
```

### 4️⃣ Crear archivo `.env`

Agrega lo siguiente:

```
MONGO_URI=tu_url_de_mongodb
PORT=5000
```

---

## ▶️ Scripts

```bash
node server.js   # Inicia el servidor 

```

---

## 🔗 Endpoints principales

### 📚 Juegos

| Método | Endpoint     | Descripción              |
| ------ | ------------ | ------------------------ |
| GET    | `/juegos`     | Obtener todos los juegos |
| POST   | `/juegos`     | Crear un nuevo juego     |
| PUT    | `/juegos/:id` | Actualizar un juego      |
| DELETE | `/juegos/:id` | Eliminar un juego        |

### 📝 Reseñas

| Método | Endpoint                   | Descripción               |
| ------ | -------------------------- | ------------------------- |
| GET    |`/resenas/juego/:juegoId`   | Obtener todas las reseñas |
| POST   | `/resenas`                 | Crear una reseña          |
| PUT    | `/resenas/:id`             | Actualizar una reseña     |
| DELETE | `/resenas/:id`             | Eliminar una reseña       |

---

## 🛠️ Dependencias principales

* express
* mongoose
* cors
* dotenv
* nodemon *(dev)*

---

##  app 

https://proyecto-backend-zkdj.onrender.com

---

## 👤 Autor

Proyecto desarrollado por **[cristian david acosta hernadez]**.
