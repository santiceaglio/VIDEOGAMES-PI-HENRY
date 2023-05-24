const { Videogame } = require("../db.js");
require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");

// Controlador para agregar un nuevo videojuego
const postGames = async (req, res) => {
  const { name, description, background_image, platforms, genres, released, rating } = req.body;
  console.log(name, description, background_image, platforms, genres, released, rating);

  try {
    console.log("Entró al bloque try");
    const gameResponse = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}`
    ); // Realiza una solicitud GET a la API externa para obtener información de los juegos
    console.log("Pasó la petición a la API");

    const cleanGames = gameResponse.data.results.map((game) => {
      return {
        id: game.id,
        name: game.name,
        description: game.description,
        background_image: game.background_image,
        platforms: game.platforms.map((platform) => platform.platform.name),
        genres: game.genres,
        released: game.released,
        rating: game.rating,
      };
    });

    const existingGame = cleanGames.find(
      (game) => game.name.toLowerCase() === name.toLowerCase()
    ); // Verifica si el juego ya existe en la API externa

    console.log("Pasó la búsqueda del juego existente en la API");

    if (existingGame) {
      return res.status(400).send("El videojuego ya existe en la API");
    }
    console.log("Pasó la validación del juego existente en la API");

    const existingGameDB = await Videogame.findOne({
      where: {
        name: name,
      },
    }); // Verifica si el juego ya existe en la base de datos local

    console.log("Pasó la búsqueda del juego existente en la base de datos");

    if (existingGameDB) {
      return res.status(400).send("El videojuego ya existe en la base de datos");
    }
    console.log("Pasó la validación del juego existente en la base de datos");

    const newGame = await Videogame.create({
      name,
      background_image,
      description,
      rating,
      released,
      platforms,
    }); // Crea un nuevo registro de videojuego en la base de datos local

    console.log("Pasó la creación del nuevo juego en la base de datos");

    const newFormatGenre = genres.map((genre) => parseInt(genre)); // Formatea los géneros del videojuego a números enteros

    console.log("Este es el formateo de los géneros");
    console.log(newFormatGenre);

    newGame.addGenres(newFormatGenre); // Asocia los géneros al nuevo videojuego en la base de datos local

    res.status(200).json(newGame); // Devuelve el nuevo videojuego creado
  } catch (error) {
    res.status(404).json({ error: error.message }); // Devuelve un error en caso de falla
  }
};

module.exports = postGames;



