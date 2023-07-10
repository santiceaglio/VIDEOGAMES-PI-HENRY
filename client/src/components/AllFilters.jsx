import React from 'react';
import { useDispatch } from 'react-redux';
import styles from '../assets/styles/components/AllFilters.module.css';
import {
    orderVideogames,
    filterOrigen,
    filterGenres,
    getThreePlatforms,
} from '../redux/actions';
const AllFilters = () => {
    const dispatch = useDispatch();

    const handleOrderName = (event) => {
        let order = '';
        switch (event.target.value) {
            case 'ascendente':
                order = 'ascendente';
                break;
            case 'descendente':
                order = 'descendente';
                break;
            default:
                order = 'default';
        }
        dispatch(orderVideogames(order));
    };

    const handleGetPlatforms = (event)=>{
        let platform = "";
        switch(event.target.value){
            case "3 o mas platform":
                platform = "3 o mas plarform";
                break;
                default:
                    platform = "default";
        }
        dispatch(getThreePlatforms(platform));
    }

    const handleOrderRating = (event) => {
        let order = ''
        switch (event.target.value) {
            case 'mayor a menor':
                order = 'mayor a menor';
                break;
            case 'menor a mayor':
                order = 'menor a mayor';
                break;
            default:
                order = 'default';
                break;
        }
        dispatch(orderVideogames(order))
    }

    const handleChangeOrigen = (event) => {
		const value = event.target.value;
		let origen = '';
		switch (value) {
			case 'Default':
				origen = 'Default';
				break;
			case 'Creados':
				origen = 'DB';
				break;
			case 'Originales':
				origen = 'API';
				break;
			default:
				origen = 'Default';
		}
		dispatch(filterOrigen(origen));
	};

    const handleFilterByGender = (event) => {

        let gender = '';
        switch (event.target.value) {
            case 'Adventure':
                gender = 'Adventure';
                break;
            case 'RPG':
                gender = 'RPG';
                break;
            case 'Indie':
                gender = 'Indie';
                break;
            case 'Strategy':
                gender = 'Strategy';
                break;
            case 'Puzzle':
                gender = 'Puzzle';
                break;
            case 'Massively Multiplayer':
                gender = 'Massively Multiplayer';
                break;
            case 'Racing':
                gender = 'Racing';
                break;
            case 'Platformer':
                gender = 'Platformer';
                break;
            case 'Simulation':
                gender = 'Simulation';
                break;
            case 'Arcade':
                gender = 'Arcade';
                break;
            case 'Fighting':
                gender = 'Fighting';
                break;
            case 'Family':
                gender = 'Family';
                break;
            case 'Casual':
                gender = 'Casual';
                break;
            case 'Action':
                gender = 'Action';
                break;
            case 'Shooter':
                gender = 'Shooter';

                break;
            default:
                gender = 'default';
        }
        dispatch(filterGenres(gender));
    };

    const restorePage = (event) => {
        event.preventDefault();
        window.location.reload();
    }

    return (
        <div className={styles.content}>
            <button className={styles.button} onClick={restorePage}>
                Restore
            </button>
            <div className={styles.contentFilterBox}>
                <h3 className={styles.filterTitle}>Order by Name</h3>
                <select name="" id="" onChange={handleOrderName}>
                    <option value="default">Default</option>
                    <option value="ascendente">Upward</option>
                    <option value="descendente">Falling</option>
                </select>
            </div>

            <div className={styles.contentFilterBox}>
                <h3 className={styles.filterTitle}>Order by Rating</h3>
                <select name="" id="" onChange={handleOrderRating}>
                    <option value="default">Default</option>
                    <option value="mayor a menor">Upward</option>
                    <option value="menor a mayor">Falling</option>
                </select>
            </div>


            <div className={styles.contentFilterBox}>
				<h3 className={styles.filterTitle}>Filter by Origin</h3>
				<select name="" id="" onChange={handleChangeOrigen}>
					<option value="default">Default</option>
					<option value="Creados">DB</option>
					<option value="Originales">API</option>
					
				</select>
			</div>
            <div>
                <h2>PLATFORM MAYOR A 3</h2>
                <select name= "" id= "" onChange={handleGetPlatforms}>
                <option value = "default">default</option>
                <option value = "3 o mas platform">3 o mas platform</option>

                </select>
            </div>

            

            <div className={styles.contentFilterBox}>
                <h3 className={styles.filterTitle}>Filter by Genre</h3>
                <select name="" id="" onChange={handleFilterByGender}>
                    <option value="default">Default</option>
                    <option value="Adventure">Adventure</option>
                    <option value="RPG">RPG</option>
                    <option value="Indie">Indie</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="Massively Multiplayer">Massively Multiplayer</option>
                    <option value="Racing">Racing</option>
                    <option value="Platformer">Platformer</option>
                    <option value="Simulation">Simulation</option>
                    <option value="Arcade">Arcade</option>
                    <option value="Fighting">Fighting</option>
                    <option value="Family">Family</option>
                    <option value="Casual">Casual</option>
                    <option value="Action">Action</option>
                    <option value="Shooter">Shooter</option>


                </select>
            </div>
        </div>
    );
};



export default AllFilters;

