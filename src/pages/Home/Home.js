import React from 'react';
import styled from 'styled-components';
import Hero from '../../components/Sections/Hero/Hero';
import Features from '../../components/Sections/Features/Features';
import Promotions from '../../components/Sections/Promotions/Promotions';
import CatalogPreview from '../../components/Sections/CatalogPreview/CatalogPreview';
import CTA from '../../components/Sections/CTA/CTA';

const HomeContainer = styled.div`
  padding-top: 80px; /* Отступ для фиксированного header */
`;

const Home = () => {
  return (
    <HomeContainer>
      <Hero />
      <Features />
      <Promotions />
      <CatalogPreview />
      <CTA />
    </HomeContainer>
  );
};

export default Home;
