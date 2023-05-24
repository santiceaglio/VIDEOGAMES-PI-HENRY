import React from 'react'

import Card from "./Card";

import styles from '../assets/styles/components/Cards.module.css';
const Cards = ({games}) => {
  return (
		<div className={styles.content}>
			{games.length ? (
				games.map(
					({ id, name, genres, background_image }) => {
						return <Card key={id} id={id} name={name} genres={genres} background_image={background_image} />;
					},
				)
			) : (
				<h2 className={styles.titleVacio}>No hay Videojuegos...</h2>
			)}
		</div>
	);
}

export default Cards