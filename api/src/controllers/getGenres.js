const axios = require("axios");
require('dotenv').config();
const { API_KEY } = process.env;
const { Genre } = require("../db.js");

// Esta función obtiene todos los géneros existentes.
const getAllGenres = async (req, res) => {
    try {
        // Buscar un género específico por su ID (en este caso, el 16)
        const genre = await Genre.findByPk(16)

        if (!genre) {
            let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
            let results = [];

            while (url) {
                // Obtener datos de la API.
                let response = await axios.get(url);

                // Mapear los datos de la API y agregarlos a los resultados.
                results = results.concat(
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

                // Obtener la URL (siguiente) para la próxima iteración.
                url = response.data.next;

                // Romper el ciclo si results.length >= 100 o si la URL es falsa.
                if (results.length >= 100 || !url) {
                    break;
                }
            }

            // Mapear los resultados y crear o encontrar los géneros correspondientes en la base de datos.
            results.map(async (game) => {
                if (game.genres) {
                    item = game.genres
                    console.log(item)

                    for (let element of item) {
                        const [genre, created] = await Genre.findOrCreate({
                            where: {
                                name: element.trim()
                            },
                        });
                    }
                }
            })

            // Obtener todos los géneros de la base de datos y enviarlos como respuesta.
            const genres = await Genre.findAll()
            return res.json(genres).status(200)

        }

        // Si ya se ha buscado el género específico anteriormente, obtener todos los géneros de la base de datos y enviarlos como respuesta.
        const genres = await Genre.findAll()
        res.json(genres).status(200)

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = getAllGenres;