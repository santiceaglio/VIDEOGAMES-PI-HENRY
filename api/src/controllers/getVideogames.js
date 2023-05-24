const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db.js");

// Controlador para obtener todos los videojuegos
async function getVideogame(req, res) {
  let url = `https://api.rawg.io/api/games?key=${API_KEY}`; // Construye la URL de la API externa
  let results = []; // Inicializa una matriz vacía para almacenar los resultados de la búsqueda

  try {
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

    // Obtiene todos los videojuegos de la base de datos local
    const videoGamesBDD = await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    // Limpia los datos de los videojuegos obtenidos de la base de datos local
    const cleanVideoBDD = videoGamesBDD.map((game) => {
      return {
        id: game.id,
        name: game.name,
        background_image: game.background_image,
        platforms: game.platforms,
        description: game.description,
        released: game.released,
        rating: game.rating,
        genres: game.genres?.map((genre) => genre.name),
      };
    });

    console.log(videoGamesBDD);

    // Combina los videojuegos de la base de datos local con los obtenidos de la API externa
    const allVideogames = [...cleanVideoBDD, ...results];

    res.status(200).json(allVideogames); // Devuelve todos los videojuegos
  } catch (error) {
    res.status(500).json({ error: error.message }); // Devuelve un error en caso de falla
  }
}

module.exports = getVideogame;




























// const axios = require("axios");
// require("dotenv").config();
// const { API_KEY } = process.env;

// async function getVideogame(req, res) {
//   const limit = 15; // Cantidad de tarjetas por página
//   const totalPages = 100 / limit; // Total de páginas
//   const currentPage = req.params.page || 1; // Obtener el número de página desde req.params o req.query

//   try {
//     let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
//     let results = [];

//     // Obtener todos los videojuegos de la API
//     while (url) {
//       const response = await axios.get(url);

//       results = results.concat(
//         response.data.results.map((game) => ({
//           id: game.id,
//           name: game.name,
//           background_image: game.background_image,
//           platforms: game.platforms?.map((platform) => platform.platform.name),
//           description: game.description,
//           released: game.released,
//           rating: game.rating,
//           genres: game.genres?.map((genre) => genre.name),
//         }))
//       );

//       url = response.data.next;

//       if (results.length >= totalPages * limit || !url) {
//         break;
//       }
//     }

//     // Calcular los índices de los resultados para la página actual
//     const startIndex = (currentPage - 1) * limit;
//     const endIndex = currentPage * limit;
//     const paginatedResults = results.slice(startIndex, endIndex);

//     res.status(200).json({
//       totalPages,
//       currentPage,
//       videogames: paginatedResults,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// module.exports = getVideogame;