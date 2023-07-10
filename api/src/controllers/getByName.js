const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db.js");
const { Op } = require("sequelize");

// Controlador para buscar juegos por nombre
async function getNameVideogame(req, res) {
  const { name } = req.query; // Obtiene el parámetro de consulta "name" de la solicitud
  let url = `https://api.rawg.io/api/games?key=${API_KEY}`; // Construye la URL de la API externa
  let results = []; // Inicializa una matriz vacía para almacenar los resultados de la búsqueda

  try {
    // Busca juegos en la base de datos local que coincidan con el nombre proporcionado. uso op ilike me ayuda a buscar el nombre, como el toLowerCase.
    const videoGameFound = await Videogame.findAll({
      where: { name:{
        [Op.iLike]: `%${name}%` 
      },
    },
      include: [
        {
          model: Genre,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });

    console.log("Búsqueda en la base de datos completada");

    // Realiza solicitudes a la API externa hasta obtener todos los resultados o alcanzar un límite
    while (url) {
      let response = await axios.get(url); // Realiza una solicitud GET a la URL actual utilizando Axios

      results = results.concat(
        // Concatena los resultados de la respuesta actual a la matriz "results"
        response.data.results.map((game) => {
          return {
            id: game.id,
            name: game.name,
            background_image: game.background_image,
            platforms: game.platforms?.map(
              (platform) => platform.platform.name
            ),
            description: game.description,
            released: game.released,
            rating: game.rating,
            genres: game.genres?.map((genre) => genre.name),
          };
        })
      );

      url = response.data.next; // Actualiza la URL a la siguiente página de resultados en la API externa

      if (results.length >= 100 || !url) {
        break; // Si se alcanza el límite de resultados o no hay más páginas, se sale del bucle
      }
    }
    console.log("Búsqueda en la API completada");

    results = results.concat(videoGameFound); // Concatena los resultados de la búsqueda en la API con los juegos encontrados en la base de datos local

    // Filtra los juegos por nombre (insensible a mayúsculas y minúsculas)
    const allGamesByName = results.filter((game) =>
      game.name.toLowerCase().includes(name.toLowerCase())
    );

    if (allGamesByName.length > 15) {
      // Si hay más de 15 juegos encontrados, se limita el resultado a 15 juegos
      console.log("Se limitó el resultado a 15 juegos");
      const nameLimitAllGamesByName = allGamesByName.slice(0, 15);
      return res.status(200).json(nameLimitAllGamesByName);
    }

    res.status(200).json(allGamesByName); // Devuelve todos los juegos encontrados
  } catch (error) {
    res.status(500).json({ error: error.message }); // Devuelve un error en caso de falla
  }
}

module.exports = getNameVideogame;