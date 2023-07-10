import axios from "axios";


export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_VIDEOGAME_BY_ID = "GET_VIDEOGAME_BY_ID";
export const GET_VIDEOGAMES_BY_NAME = "GET_VIDEOGAMES_BY_NAME";
export const GET_GENRES = "GET_GENRES";
export const POST_VIDEOGAME = "POST_VIDEOGAME";
export const ORDER = "ORDER";
export const FILTER = "FILTER";
export const FILTER_BY_NAME = "FILTER_BY_NAME"
export const CLEAR_DETAIL_VIDEOGAME = "CLEAR_DETAIL_VIDEOGAME";
export const GENERATE_COPY = "GENERATE_COPY";
export const CLEAN_DETAIL_BY_ID = "CLEAN_DETAIL_BY_ID";
export const FILTER_ORIGEN ="FILTER_ORIGEN";
export const FILTER_GENRE = "FILTER_GENRE"
export const FILTER_THREE_PLATFORMS = "FILTER_THREE_PLATFORMS"




const URL_BASE = "http://localhost:3001";

// Get All Videogames.
export const getAllVideogames = () => {
  return async (dispatch) => {
    const { data } = await axios.get(`${URL_BASE}/videogames`);

    dispatch({
      type: GET_ALL_VIDEOGAMES,
      payload: data,
    });
  };
};

export const generateCopy = ()=>{
    return{
        type: GENERATE_COPY

    }
}

// Get Videogame by ID.
export const getVideogameById = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`${URL_BASE}/videogames/${id}`);
    dispatch({
      type: GET_VIDEOGAME_BY_ID,
      payload: data,
    });
  };
};

// Get Videogame by Name
export const videogameByName = (name) => {

    return async (dispatch) => {
        try {
            const response = await axios.get(`${URL_BASE}/videogames/name/?name=${name}`)
            dispatch({type: GET_VIDEOGAMES_BY_NAME, payload: response.data})
        } catch (error) {
            console.log(error.message)
        }
    }
   
}


// Filter Videogames by Name.
export const filterByName = (name) => {
  return async (dispatch) => {
    const { data } = await axios.get(`${URL_BASE}/videogames/name/?name=${name}`);
    
    dispatch({
      type: FILTER_BY_NAME, 
    payload: data,
    });
  };
};


export const getAllGenres = (gender) => {
  return async (dispatch) => {
    let url = `${URL_BASE}/genre`;
    if (gender !== 'default') {
      url += `?gender=${gender}`;
    }

    axios.get(url).then((response) => {
      dispatch({ type: GET_GENRES, payload: response.data });
    });
  };
};

export const filterGenres = (genre) =>{
  return{
    type: FILTER_GENRE,
    payload: genre,
  }
}

// Post Videogame.
export const postVideogame = (videogame) => {
  return async (dispatch) => {
    const { data } = await axios.post(`${URL_BASE}/videogames`, videogame);

    dispatch({
      type: POST_VIDEOGAME,
      payload: data,
    });
  };
};


// Order Videogames.
export const orderVideogames = (type) => {
  return (dispatch) => {
    dispatch({
      type: ORDER,
      payload: type,
    });
  };
};

// Filter Videogames.
export const filterVideogames = (type) => {
  return (dispatch) => {
    dispatch({
      type: FILTER,
      payload: type,
    });
  };
};


// Clear Detail Videogame.
export const clearDetailVideogame = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_DETAIL_VIDEOGAME,
    });
  };
}

export const cleanDetailById = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`${URL_BASE}/videogames/detail/${id}`);
    dispatch({
      type: CLEAN_DETAIL_BY_ID,
      payload: data,
    });
  };
};

export const filterOrigen=(origen)=>{
  return {
    type: FILTER_ORIGEN,
    payload:origen}
};


/////////////////////////////
export const getGenres = () => {
  return async (dispatch) => {
      try {
          const response = await axios.get('http://localhost:3001/genre')
          dispatch({type: GET_GENRES, payload: response.data})
      } catch (error) {
          console.log(error.message)
      }
  }
}

export const getThreePlatforms = ()=>{
  return{
    type: FILTER,
    payload: type
  }

  }
