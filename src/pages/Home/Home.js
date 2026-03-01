import React from 'react';
import styled from 'styled-components';
import Hero from '../../components/Sections/Hero/Hero';
import Features from '../../components/Sections/Features/Features';
import Promotions from '../../components/Sections/Promotions/Promotions';
import CatalogPreview from '../../components/Sections/CatalogPreview/CatalogPreview';
import Testimonials from '../../components/Sections/Testimonials/Testimonials';
import CTA from '../../components/Sections/CTA/CTA';

const HomeContainer = styled.div`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(246, 246, 246, 0.9)),
    repeating-linear-gradient(
      120deg,
      rgba(255, 255, 255, 0.45) 0px,
      rgba(255, 255, 255, 0.45) 14px,
      rgba(242, 242, 242, 0.42) 14px,
      rgba(242, 242, 242, 0.42) 28px
    );

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 999px;
    filter: blur(70px);
    pointer-events: none;
    z-index: 0;
  }

  &::before {
    width: clamp(240px, 32vw, 520px);
    height: clamp(240px, 32vw, 520px);
    top: 14%;
    left: -9%;
    background: rgba(255, 255, 255, 0.75);
  }

  &::after {
    width: clamp(260px, 36vw, 620px);
    height: clamp(260px, 36vw, 620px);
    top: 50%;
    right: -12%;
    background: rgba(232, 232, 232, 0.55);
  }

  > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    &::before {
      width: clamp(180px, 50vw, 280px);
      height: clamp(180px, 50vw, 280px);
      filter: blur(50px);
    }

    &::after {
      width: clamp(200px, 60vw, 320px);
      height: clamp(200px, 60vw, 320px);
      filter: blur(50px);
    }
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <Hero />
      <Features />
      <CatalogPreview />
      <Promotions />
      <Testimonials />
      <CTA />
    </HomeContainer>
  );
};

export default Home;
