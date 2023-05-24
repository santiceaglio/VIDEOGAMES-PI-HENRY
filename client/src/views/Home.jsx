

import React, { useEffect } from 'react';
// import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cards from "../components/Cards"

import AllFilters from "../components/AllFilters";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

import styles from '../assets/styles/components/views/HomePage.module.css';
import {
	getAllVideogames,
  filterByName,
  clearDetailVideogame,
  generateCopy
} from '../redux/actions';
import { Link } from 'react-router-dom';

const HomePage = () => {
  
  const stateGlobal = useSelector((state) => state.videoGames);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getAllVideogames());
  }, []);

  useEffect(() => {
    dispatch(generateCopy());
  }, [stateGlobal]);

  return (
    <div className={styles.content}>
      <div className={styles.contentFilters}>
        <SearchBar />
        <AllFilters />
      </div>

      <div className={styles.contentPagination}>
      <Link to="/form" className={styles.form}>Create Videogame</Link>
        <h1 className={styles.titleMain}>All Videogames</h1>
    
        
        <Pagination />
      </div>
    </div>
  );
}

export default HomePage;