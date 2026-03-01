import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useModal } from '../../../hooks/useModal';

const HeroOuter = styled.div`
  padding: 0 ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.white};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 8px;
  }
`;

const HeroContainer = styled.section`
  min-height: 100vh;
  background: ${props => props.theme.colors.primary};
  display: flex;
  align-items: stretch;
  position: relative;
  overflow: hidden;
  border-radius: 24px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    border-radius: 16px;
    min-height: auto;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${props => props.theme.spacing['5xl']} ${props => props.theme.spacing['3xl']};
  color: ${props => props.theme.colors.white};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing['4xl']} ${props => props.theme.spacing.xl};
    min-height: 60vh;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing['3xl']} ${props => props.theme.spacing.lg};
    min-height: auto;
  }
`;

const Overline = styled(motion.div)`
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 10px;
    margin-bottom: ${props => props.theme.spacing.md};
    letter-spacing: 0.16em;
  }
`;

const Title = styled(motion.h1)`
  font-size: ${props => props.theme.fontSizes['7xl']};
  font-weight: 400;
  line-height: 1.0;
  margin-bottom: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.white};
  letter-spacing: -0.03em;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: ${props => props.theme.fontSizes['5xl']};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: clamp(32px, 8.5vw, 40px);
    line-height: 1.1;
    margin-bottom: ${props => props.theme.spacing.lg};
  }
`;

const TitleItalic = styled.em`
  font-style: italic;
  font-weight: 400;
`;

const Subtitle = styled(motion.p)`
  font-size: ${props => props.theme.fontSizes.md};
  line-height: 1.8;
  margin-bottom: ${props => props.theme.spacing['2xl']};
  color: rgba(255, 255, 255, 0.6);
  max-width: 460px;
  font-weight: 300;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes.sm};
    line-height: 1.65;
    margin-bottom: ${props => props.theme.spacing.xl};
    max-width: 100%;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    width: 100%;
    gap: ${props => props.theme.spacing.sm};
  }
`;

const PrimaryButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    background: transparent;
    color: ${props => props.theme.colors.white};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: center;
    padding: ${props => props.theme.spacing.lg};
    font-size: 11px;
  }
`;

const SecondaryButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  background: transparent;
  color: ${props => props.theme.colors.white};
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    border-color: ${props => props.theme.colors.white};
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.primary};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: center;
    padding: ${props => props.theme.spacing.lg};
    font-size: 11px;
  }
`;

const CarouselSection = styled.div`
  position: relative;
  overflow: hidden;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    height: 50vh;
    min-height: 360px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    height: 42vh;
    min-height: 320px;
  }
`;

const CarouselImage = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url(${props => props.$src}) center/cover no-repeat;
`;

const CarouselOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${props => props.theme.spacing['2xl']};
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
  color: ${props => props.theme.colors.white};
  z-index: 2;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.lg};
    padding-bottom: 88px;
  }
`;

const CarouselLabel = styled.div`
  font-size: ${props => props.theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: ${props => props.theme.spacing.xs};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 10px;
  }
`;

const CarouselTitle = styled.h3`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: 400;
  color: ${props => props.theme.colors.white};
  margin-bottom: 0;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes.lg};
  }
`;

const CarouselControls = styled.div`
  position: absolute;
  bottom: ${props => props.theme.spacing['2xl']};
  right: ${props => props.theme.spacing['2xl']};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
  z-index: 3;
  background: rgba(0, 0, 0, 0.26);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  padding: 8px 10px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    bottom: 16px;
    right: 16px;
    gap: ${props => props.theme.spacing.sm};
    padding: 5px 8px;
  }
`;

const CarouselButton = styled.button`
  width: 58px;
  height: 58px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.white};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.primary};
    border-color: ${props => props.theme.colors.white};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 42px;
    height: 42px;
  }
`;

const CarouselProgress = styled.div`
  width: clamp(120px, 20vw, 170px);
  min-width: 0;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: clamp(90px, 26vw, 130px);
    gap: 6px;
  }
`;

const CarouselCount = styled.span`
  min-width: 12px;
  font-weight: 600;
  font-size: ${props => props.theme.fontSizes.sm};
  color: rgba(255, 255, 255, 0.95);

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 12px;
    min-width: 10px;
  }
`;

const CarouselLine = styled.div`
  position: relative;
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.38);
  overflow: hidden;
`;

const CarouselLineFill = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${props => props.$progress}%;
  background: rgba(255, 255, 255, 0.95);
  transition: width 0.35s ease;
`;

const Stats = styled(motion.div)`
  display: flex;
  gap: ${props => props.theme.spacing['2xl']};
  margin-top: ${props => props.theme.spacing['3xl']};
  padding-top: ${props => props.theme.spacing['2xl']};
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    gap: ${props => props.theme.spacing.lg};
    margin-top: ${props => props.theme.spacing['2xl']};
    padding-top: ${props => props.theme.spacing.xl};
    flex-wrap: wrap;
  }
`;

const StatItem = styled.div`
  color: ${props => props.theme.colors.white};
`;

const StatNumber = styled.div`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: 400;
  margin-bottom: ${props => props.theme.spacing.xs};
  letter-spacing: -0.02em;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes['2xl']};
  }
`;

const StatLabel = styled.div`
  font-size: ${props => props.theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.4);

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 10px;
  }
`;

const Hero = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselData = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      label: 'Композиция',
      title: 'Современная кухня'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      label: 'Композиция',
      title: 'Классическая элегантность'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      label: 'Композиция',
      title: 'Скандинавский минимализм'
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [carouselData.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  };

  return (
    <HeroOuter>
    <HeroContainer>
      <HeroContent>
        <HeroText>
          <Overline
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Кухни и мебель по индивидуальным проектам
          </Overline>

          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Интерьеры в которых хочется <TitleItalic>жить</TitleItalic>
          </Title>

          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Создаём уникальные кухни из качественных материалов. 
            Индивидуальный дизайн, производство, доставка и монтаж под ключ.
          </Subtitle>

          <ButtonGroup
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <PrimaryButton
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/catalog')}
            >
              Смотреть каталог
              <FiArrowRight size={14} />
            </PrimaryButton>
            <SecondaryButton
              whileTap={{ scale: 0.98 }}
              onClick={() => openModal('callback')}
            >
              Узнать стоимость
            </SecondaryButton>
          </ButtonGroup>

          <Stats
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <StatItem>
              <StatNumber>500+</StatNumber>
              <StatLabel>Проектов</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>10+</StatNumber>
              <StatLabel>Лет опыта</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>5</StatNumber>
              <StatLabel>Лет гарантии</StatLabel>
            </StatItem>
          </Stats>
        </HeroText>

        <CarouselSection>
          <AnimatePresence mode="wait">
            <CarouselImage
              key={currentSlide}
              $src={carouselData[currentSlide].image}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          </AnimatePresence>

          <CarouselOverlay>
            <CarouselLabel>{carouselData[currentSlide].label}</CarouselLabel>
            <CarouselTitle>{carouselData[currentSlide].title}</CarouselTitle>
          </CarouselOverlay>

          <CarouselControls>
            <CarouselButton onClick={prevSlide}>
              <FiChevronLeft size={18} />
            </CarouselButton>
            <CarouselProgress>
              <CarouselCount>{currentSlide + 1}</CarouselCount>
              <CarouselLine>
                <CarouselLineFill $progress={((currentSlide + 1) / carouselData.length) * 100} />
              </CarouselLine>
              <CarouselCount>{carouselData.length}</CarouselCount>
            </CarouselProgress>
            <CarouselButton onClick={nextSlide}>
              <FiChevronRight size={18} />
            </CarouselButton>
          </CarouselControls>
        </CarouselSection>
      </HeroContent>
    </HeroContainer>
    </HeroOuter>
  );
};

export default Hero;
