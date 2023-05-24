


import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from '../assets/styles/components/views/Detail.module.css';

import axios from 'axios';

const Detail = () => {
  
	const mostrandoMensajeError = (error, mensaje) => {
		setAlerta({ error: error, mensaje: mensaje });
		setTimeout(() => {
			setAlerta({});
		}, 2000);
		return;
	};

	const navigate = useNavigate();

	const [game, setGame] = useState({});
	const { id } = useParams();

	const [alerta, setAlerta] = useState({});
	const { mensaje, error } = alerta;

	

	useEffect(() => {
		axios
			.get(`http://localhost:3001/videogames/${id}`)
			.then((response) => {
        console.log(response.data.name);
				response.data.name
					? setGame(response.data)
					: mostrandoMensajeError(true, 'No esta el ID');
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		<div>
			

			{game.name ? (
				<div className={styles.content}>
					<div className={styles.contentSecondary}>
						<div className={styles.contentImage}>
							<img className={styles.imageGame} src={game.background_image} alt={game.name} />
						</div>
						<div className={styles.contentText}>
							<button
								onClick={() => {
									navigate('/home');
								}}
								className={styles.buttonCreate}
							>
								Go back
							</button>
							<h3 className={styles.smallTitle}>
								Name: 
								<span className={styles.infomation}> {game.name}</span>
							</h3>
							<h3 className={styles.smallTitle}>
								Genre: 
								<span className={styles.infomation}> {game.genres}</span>
							</h3>
							<h3 className={styles.smallTitle}>
								Description: 
								
							</h3>
							<div className={styles.content_description}><span className={styles.infomation}> {game.description}</span></div>
							<h3 className={styles.smallTitle}>
								Released: 
								<span className={styles.infomation}> {game.released}</span>
							</h3>
							<h3 className={styles.smallTitle}>
								Rating: 
								<span className={styles.infomation}> {game.rating}</span>
							</h3>
						</div>
					</div>
				</div>
			) : (
				<h3 className={styles.cargando}>Loading...</h3>
			)}
		</div>
	);
};

export default Detail;