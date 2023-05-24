import styles from '../assets/styles/components/Card.module.css';
import { Link, useLocation } from "react-router-dom"

const Card = ({ id, name, background_image, genres }) => {

	const pathname = useLocation();

    return (
		<div className={styles.content}>
			

			<div className={styles.contentImage}>
				<img
					src={background_image}
					className={styles.image}
					alt={name}
					genres={genres}
					title="Haz click en el nombre"
				/>
			</div>
			<div className={styles.contentText}>
				{pathname !== '/home' ? (
					<Link to={`/detail/${id}`} className={styles.name}>
						{name}
					</Link>
				) : (
					<h3 className={styles.name}>{name}</h3>
					)}
					<p className={styles.genres}>{genres}</p>

				
			</div>
		</div>
	);
};

export default Card;