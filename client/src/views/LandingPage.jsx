import React from 'react';
import styles from "../assets/styles/components/views/Landing.module.css"
import { useNavigate } from 'react-router-dom';

const LeandingPage = () => {

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/home');
  };
  return (
    <div className={styles.background}>
      <div className={styles.content}>
        <h1>VIDEOGAMES APP</h1>
        <button className={styles.button} onClick={handleButtonClick}>
          Let's play!
        </button>
      </div>
      <div className={styles.lorem}>
        
      </div>
      <div className={styles.footer}>
        <p className={styles.footerText}>&copy; 2023 Santiago Ceaglio. Todos los derechos reservados.</p>
        {/* <p className={styles.footerText}>Contacto: santiceagliohf@gmail.com</p> */}
      </div>

    </div>
  );
};

export default LeandingPage;
