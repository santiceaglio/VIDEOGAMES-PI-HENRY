
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { getGenres, postVideogame } from '../redux/actions';
import axios from 'axios';
import { validate } from '../utils/validate';
import style from '../assets/styles/components/views/Form.module.css';

export default function Form() {

  
  const gamesByGenre = useSelector((state) => state.genres);
  const [radioRatingValue, setRadioRatingValue] = useState(1);
  const [genreSelected, setGenreSelected] = useState([]);
  const [platformSelected, setPlatformSelected] = useState([]);
  console.log(radioRatingValue);
  console.log(platformSelected);

  function handleRadioChange(event) {
    setRadioRatingValue(parseInt(event.target.value));
  }
  console.log(genreSelected);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: '',
    background_image: '',
    description: '',
    platforms: [],
    released: '',
    rating: '',
    genres: [],
  });
  const [errors, setErrors] = useState({
    name: '',
    background_image: '',
    description: '',
    released: '',
  });
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);
  console.log(gamesByGenre);
  const plataformasObj = [
    { name: 'PlayStation 5' },
    { name: 'Xbox Series S/X' },
    { name: 'PlayStation 4' },
    { name: 'PC' },
    { name: 'PlayStation 3' },
    { name: 'Xbox 360' },
    { name: 'Xbox One' },
    { name: 'Nintendo Switch' },
    { name: 'Linux' },
    { name: 'macOS' },
    { name: 'Android' },
    { name: 'iOS' },
    { name: 'PS Vita' },
    { name: 'Xbox' },
    { name: 'Web' },
    { name: 'Wii U' },
    { name: 'Nintendo 3DS' },
    { name: 'PlayStation 2' },
    { name: 'Dreamcast' },
  ];
  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });

    setErrors(validate({ ...form, [property]: value }, errors));
  };

  const handleChangeOption = (event) => {
    const selectedGenre = event.target.value;
    if (event.target.checked) {
      if (!genreSelected.includes(selectedGenre)) {
        setGenreSelected([...genreSelected, selectedGenre]);
      }
    } else {
      setGenreSelected(genreSelected.filter((genre) => genre !== selectedGenre));
    }
  };

  const handleChangeOptionByPlatform = (event) => {
    const selectedPlatforms = event.target.value;
    if (event.target.checked) {
      if (!platformSelected.includes(selectedPlatforms)) {
        setPlatformSelected([...platformSelected, selectedPlatforms]);
      }
    } else {
      setPlatformSelected(
        platformSelected.filter((platform) => platform !== selectedPlatforms)
      );
    }
  };

  async function createGames({
    name,
    background_image,
    description,
    platforms,
    released,
    rating,
    genres,
  }) {
    const newJuego = {
      name: name,
      background_image: background_image,
      description: description,
      platforms: platformSelected,
      released: released,
      rating: radioRatingValue,
      genres: genreSelected,
    };

    console.log(newJuego);

try {
  await axios
      .post(`http://localhost:3001/videogames`, newJuego)
      
        alert('creado con exito');
        setForm({
          name: '',
          background_image: '',
          description: '',
          platforms: [],
          released: '',
          rating: '',
          genres: [],
        });
        // window.location.reload()
      
  
} catch (error) {
  
    alert('hubo un error');
    console.log(error);
  };
  
}

     
      console.log(setForm)
      
      




const submitHandler = (event) => {
    event.preventDefault();
    if (genreSelected.length === 0) {
      alert('seleciona algun genero');
      return;
    }
    if (radioRatingValue.length === 0) {
      alert('seleciona algun rating');
      return;
    }
    if (platformSelected.length === 0) {
      alert('seleciona alguna plataforma');
      return;
    }

    const hasErrors = Object.values(errors).some((error) => error !== '');
    if (hasErrors) {
      alert('Completa todos los campos del formulario');
      return;
    }

    createGames(form);
  };
  return (
    <div className={style.formulariocontent}>
      <div className={style.formulario}>
        <form className={style.form} onSubmit={submitHandler}>
          <div className={style.labels1}>
            <label>Name:</label>
            <input
              placeholder="Name aqui...."
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={style.inputs}
            />
            <span className={style.errores}>{errors.name}</span>
          </div>
          <div className={style.labels1}>
            <label htmlFor="background_image">Image:</label>
            <input
              placeholder="Image url...."
              type="text"
              name="background_image"
              value={form.background_image}
              onChange={handleChange}
              className={style.inputs}
            />
            <span className={style.errores}>{errors.background_image}</span>
          </div>
          <div className={style.labels1}>
            <label>Description:</label>
            <input
              placeholder="Write description..."
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              className={style.inputs}
            />
            <span className={style.errores}>{errors.description}</span>
          </div>

          <div className={style.labels1}>
            <label>Released:</label>
            <input
              placeholder="Write released date.."
              type="date"
              name="released"
              value={form.released}
              onChange={handleChange}
              className={style.inputs}
            />
            <span className={style.errores}>{errors.released}</span>
          </div>
          <div className={style.labels}>
            <label>Genre:</label>
            <div className={style.allGenre}>
              {gamesByGenre.map((genero) => {
                return (
                  <div key={genero.id}>
                    <input
                      type="checkbox"
                      value={genero.id}
                      onChange={handleChangeOption}
                      className={style.inputs}
                    />
                    <label value={genero.id}>{genero.name}</label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={style.labels}>
            <label> Platforms </label>
            <div className={style.allGenre}>
              {plataformasObj.map((platforma) => {
                return (
                  <div key={platforma.name}>
                    <input
                      className={style.inputs}
                      type="checkbox"
                      value={platforma.name}
                      onChange={handleChangeOptionByPlatform}
                    />
                    <label>{platforma.name}</label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={style.labels}>
            <label>Rating</label>
            <label>
              <input
                type="radio"
                value="1"
                checked={radioRatingValue === 1}
                onChange={handleRadioChange}
                className={style.inputs}
              />
              1
            </label>
            <label>
              <input
                type="radio"
                value="2"
                checked={radioRatingValue === 2}
                onChange={handleRadioChange}
                className={style.inputs}
              />
              2
            </label>
            <label>
              <input
                type="radio"
                value="3"
                checked={radioRatingValue === 3}
                onChange={handleRadioChange}
                className={style.inputs}
              />
              3
            </label>
            <label>
              <input
                type="radio"
                value="4"
                checked={radioRatingValue === 4}
                onChange={handleRadioChange}
                className={style.inputs}
              />
              4
            </label>
            <label>
              <input
                type="radio"
                value="5"
                checked={radioRatingValue === 5}
                onChange={handleRadioChange}
              />
              5
            </label>
          </div>

          <button type="submit" className={style.botonsubmit}>
            Create Game
          </button>
        </form>
      </div>
    </div>
  );
}

