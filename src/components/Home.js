import React from 'react';
import imageFirst from '../assets/barraca-1.jpg';
import imageSecond from '../assets/barraca-2.jpg';
import imageThird from '../assets/barraca-3.jpg';
import imageFourth from '../assets/barraca-4.jpg';
import Head from './Head';
import styles from './Home.module.css';

const Home = () => {
  return (
    <>
      <Head title="Home" description="Conhaça nossas barracas" />
      <div className="container">
        <h1 className={styles.homeTitle}>As melhores barracas:</h1>
        <ul className={styles.home}>
          <li>
            <img src={imageFirst} alt="" />
          </li>
          <li>
            <img src={imageSecond} alt="" />
          </li>
          <li>
            <img src={imageThird} alt="" />
          </li>
          <li>
            <img src={imageFourth} alt="" />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Home;
