require('dotenv').config();
const { Sequelize } = require('sequelize');

const fs = require('fs');
const path = require('path');

// Variables de entorno
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

// Creación de una instancia de Sequelize

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`, {
  logging: false, // Desactiva el registro de logs en la consola
  native: false, // Usa el cliente JavaScript puro en lugar del cliente nativo de PostgreSQL
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Carga de modelos de la carpeta "models"
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

 // Asociación de los modelos a la instancia de Sequelize
modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// Obtención de los modelos individuales
const { Videogame, Genre } = sequelize.models;

// Definición de las relaciones entre los modelos
Genre.belongsToMany(Videogame, {through: 'Videogames_Genres'})
Videogame.belongsToMany(Genre, {through: 'Videogames_Genres'})

// Exportación de los modelos y la instancia de Sequelize
module.exports = {
  ...sequelize.models, 
  conn: sequelize,     
};

