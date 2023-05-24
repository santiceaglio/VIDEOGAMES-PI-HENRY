import {
    CLEAN_DETAIL_BY_ID,
    CLEAR_DETAIL_VIDEOGAME,
    FILTER,
    FILTER_BY_NAME,
    GET_ALL_VIDEOGAMES,
    GET_GENRES,
    GET_VIDEOGAME_BY_ID,
    ORDER,
    POST_VIDEOGAME,
    GENERATE_COPY,
    FILTER_ORIGEN,
    FILTER_GENRE,
    

} from "./actions";

const initialState = {

    genres: [],
    detailVideoGame: {},
    videoGames: [],
    copyVideogames: [],

};


const reducer = (state = initialState, action) => {


    switch (action.type) {

        case CLEAN_DETAIL_BY_ID:
            return {
                ...state,
                detailVideoGame: {}
            }
        case GET_ALL_VIDEOGAMES:
            return {
                ...state,
                videoGames: action.payload,
            };

        case GENERATE_COPY:
            return {
                ...state,
                copyVideogames: state.videoGames
            }

        case GET_VIDEOGAME_BY_ID:
            return {
                ...state,
                detailVideoGame: action.payload,
            };

        case POST_VIDEOGAME:
            return {
                ...state,
                videoGames: [...state.videoGames, action.payload],
            };

        case CLEAR_DETAIL_VIDEOGAME:
            return {
                ...state,
                detailVideoGame: {},
            };

        case FILTER_GENRE:
            return {
                ...state,
                copyVideogames: state.videoGames.filter((game)=> existeGenre(game.genres, action.payload))

            };
        /////////////////////////////////

        case FILTER_ORIGEN:
            if (action.payload !== "Default") {
                if (action.payload == "DB") {
                    return {
                        ...state,
                        copyVideogames: state.videoGames.filter((game) => isNaN(game.id))
                    }
                } else {
                    return {
                        ...state,
                        copyVideogames: state.videoGames.filter((game) => !isNaN(game.id))
                    }
                }
            } else {
                return {
                    ...state,
                    copyVideogames: state.videoGames
                }
            }




        ////////////////////////////////

        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }


/////////////////////////////


        case FILTER:
            if (action.payload === "all") {
                return {
                    ...state,
                    copyVideogames: [...state.videoGames],
                };
            } else if (action.payload === "api") {
                return {
                    ...state,
                    copyVideogames: [
                        ...state.videoGames.filter((videoGame) => {
                            return videoGame.id.toString().length < 6;
                        }),
                    ],
                };
            } else if (action.payload === "created") {
                return {
                    ...state,
                    copyVideogames: [
                        ...state.videoGames.filter((videoGame) => {
                            return videoGame.id.length > 6;
                        }),
                    ],
                };
            } else {
                return {
                    ...state,
                    copyVideogames: [
                        ...state.videoGames.filter((videoGame) => {
                            return videoGame.genres.includes(action.payload);
                        }),
                    ],
                };
            }

            

        
        case FILTER_BY_NAME:

            return {
                ...state,
                copyVideogames: action.payload

            }


        case ORDER:
            return {
                ...state,
                copyVideogames: [
                    ...state.copyVideogames.sort((a, b) => {
                        if (action.payload === "ascendente") {
                            return a.name > b.name ? 1 : -1;
                        } else if (action.payload === "descendente") {
                            return a.name < b.name ? 1 : -1;
                        } else if (action.payload === "mayor a menor") {
                            return a.rating < b.rating ? 1 : -1;
                        } else if (action.payload === "menor a mayor") {
                            return a.rating > b.rating ? 1 : -1;
                        }
                    }),
                ],
            }



        default:
            return { ...state };
    }
};


const existeGenre = (array, genre)=>{

    console.log(array);
    console.log(genre);

    let bandera = false;
    for(let i = 0; i < array.length; i++){
        if(array[i].toLowerCase() == genre.toLowerCase()){
            bandera = true;
            i = array.length;
        }
    }
    return bandera;
}







export default reducer;