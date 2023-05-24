const { Router } = require('express');
const getVideogames = require("../controllers/getVideogames");
const getNameVideogame = require("../controllers/getByName")
const getVideogamesById = require("../controllers/getById");
const postGame = require("../controllers/postGames")
const getAllGenres = require("../controllers/getGenres");

const router = Router();

router.get('/videogames', getVideogames);

router.get('/videogames/name', getNameVideogame); // <-- Cambio aquí

router.get('/videogames/:id', getVideogamesById);

router.post('/videogames', postGame);

router.get('/genre', getAllGenres);

module.exports = router;
