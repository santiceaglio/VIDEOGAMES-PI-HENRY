const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db.js");

// Esta función recibe el ID de un videojuego y busca en la API o en la base de datos según corresponda.
const getVideogamesById = async (req, res) => {
    const { id } = req.params

    // Determinar si el ID es válido y realizar la búsqueda en la API o en la base de datos.
    const buscar = isNaN(id) ? "db" : "api";
    console.log(id)

    try {
        if (buscar === "api") {
            // Búsqueda en la API
            const { data } = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)

            // Limpiar los datos obtenidos de la API
            const cleanData = {
                id: data.id,
                name: data.name,
                background_image: data.background_image,
                platforms: data.platforms?.map(
                    (platform) => platform.platform.name
                ),
                description: data.description,
                released: data.released,
                rating: data.rating,
                genres: data.genres?.map((genre) => genre.name),
            }
            console.log(typeof (data))

            // Devolver una respuesta con los datos limpios
            return res.status(200).json(cleanData);
        }

        // Búsqueda en la base de datos
        const game = await Videogame.findByPk(id, {
            include: {
                model: Genre,
                attributes: ["name"],
                through: {
                    attributes: [],
                } // Incluye solo el campo 'name' del modelo Genre
            },
        });

        // Limpiar los datos obtenidos de la base de datos
        const cleanVideoBDD = {
            id: game.id,
            name: game.name,
            background_image: game.background_image,
            platforms: game.platforms,
            description: game.description,
            released: game.released,
            rating: game.rating,
            genres: game.genres?.map((genre) => genre.name),
        }

        // Devolver una respuesta con los datos limpios
        res.status(200).json(cleanVideoBDD)
    } catch (error) {
        // En caso de error, devolver una respuesta con el código de estado 400 y un mensaje de error
        res.status(400).json({ error: error.message })
    }
};

module.exports = getVideogamesById;