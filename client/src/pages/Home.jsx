import React from 'react';
import Hero from '../components/Hero.jsx';
import LatestCollection from '../components/LatestCollection.jsx';
import BestSeller from '../components/BestSeller.jsx';
import OurPolicy from '../components/OurPolicy.jsx';
import NewsLetter from '../components/NewsLetter.jsx';

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsLetter />
    </div>
  );
}

export default Home;