import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useModal } from '../../../hooks/useModal';

const HeroContainer = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80') center/cover;
  opacity: 0.1;
  z-index: 1;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing['4xl']};
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing['2xl']};
    text-align: center;
  }
`;

const HeroText = styled.div`
  color: white;
`;

const Badge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 500;
  margin-bottom: ${props => props.theme.spacing.lg};
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const Title = styled(motion.h1)`
  font-size: ${props => props.theme.fontSizes['6xl']};
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: ${props => props.theme.spacing.lg};
  background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes['4xl']};
  }
`;

const Subtitle = styled(motion.p)`
  font-size: ${props => props.theme.fontSizes.xl};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing['2xl']};
  opacity: 0.9;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  flex-wrap: wrap;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    justify-content: center;
  }
`;

const Button = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  font-size: ${props => props.theme.fontSizes.md};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  border: none;
  outline: none;

  &.primary {
    background: white;
    color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.shadows.lg};

    &:hover {
      transform: translateY(-2px);
      box-shadow: ${props => props.theme.shadows.xl};
    }
  }

  &.secondary {
    background: transparent;
    color: white;
    border: 2px solid white;

    &:hover {
      background: white;
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const CarouselContainer = styled(motion.div)`
  position: relative;
  height: 600px;
  border-radius: ${props => props.theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    height: 400px;
  }
`;

const CarouselImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

const CarouselOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: ${props => props.theme.spacing.xl};
  color: white;
  z-index: 2;
`;

const CarouselTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: 600;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const CarouselDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  opacity: 0.9;
  line-height: 1.4;
`;

const CarouselControls = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 ${props => props.theme.spacing.md};
  z-index: 3;
  pointer-events: none;
`;

const CarouselButton = styled(motion.button)`
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  pointer-events: all;
  box-shadow: ${props => props.theme.shadows.md};

  &:hover {
    background: white;
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const CarouselDots = styled.div`
  position: absolute;
  bottom: ${props => props.theme.spacing.md};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  z-index: 3;
`;

const Dot = styled(motion.button)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    background: white;
  }
`;

const Stats = styled(motion.div)`
  display: flex;
  gap: ${props => props.theme.spacing['2xl']};
  margin-top: ${props => props.theme.spacing['2xl']};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    justify-content: center;
  }
`;

const StatItem = styled.div`
  text-align: center;
  color: white;
`;

const StatNumber = styled.div`
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: 700;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const StatLabel = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  opacity: 0.8;
`;

const Hero = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselData = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Современная кухня',
      description: 'Минималистичный дизайн с функциональными решениями'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Классическая кухня',
      description: 'Элегантность и роскошь в традиционном стиле'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Скандинавская кухня',
      description: 'Светлые тона и натуральные материалы'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Лофт кухня',
      description: 'Индустриальный стиль с современными технологиями'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [carouselData.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <HeroContainer>
      <HeroBackground />
      <HeroContent>
        <HeroText>
          <Badge
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FiStar />
            Лидер рынка кухонь в Саратове
          </Badge>

          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Создаем кухни мечты с индивидуальным подходом
          </Title>

          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Более 10 лет создаем уникальные кухни из качественных материалов. 
            Дизайн, изготовление, доставка и монтаж под ключ.
          </Subtitle>

          <ButtonGroup
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              className="primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/calculator')}
            >
              Рассчитать проект
              <FiArrowRight />
            </Button>
            <Button
              className="secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openModal('callback')}
            >
              Получить консультацию
            </Button>
          </ButtonGroup>

          <Stats
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <StatItem>
              <StatNumber>500+</StatNumber>
              <StatLabel>Довольных клиентов</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>10+</StatNumber>
              <StatLabel>Лет опыта</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>24/7</StatNumber>
              <StatLabel>Поддержка</StatLabel>
            </StatItem>
          </Stats>
        </HeroText>

        <CarouselContainer
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            <CarouselImage
              key={currentSlide}
              src={carouselData[currentSlide].image}
              alt={carouselData[currentSlide].title}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>

          <CarouselOverlay>
            <CarouselTitle>{carouselData[currentSlide].title}</CarouselTitle>
            <CarouselDescription>{carouselData[currentSlide].description}</CarouselDescription>
          </CarouselOverlay>

          <CarouselControls>
            <CarouselButton
              onClick={prevSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronLeft />
            </CarouselButton>
            <CarouselButton
              onClick={nextSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronRight />
            </CarouselButton>
          </CarouselControls>

          <CarouselDots>
            {carouselData.map((_, index) => (
              <Dot
                key={index}
                active={index === currentSlide}
                onClick={() => goToSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </CarouselDots>
        </CarouselContainer>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
