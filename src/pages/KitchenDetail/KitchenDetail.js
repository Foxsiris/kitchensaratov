import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight, FiMaximize, FiHome, FiDollarSign, FiClock } from 'react-icons/fi';

const KitchenDetailContainer = styled.div`
  padding-top: 80px;
  min-height: 100vh;
  background: ${props => props.theme.colors.light};
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing['2xl']} ${props => props.theme.spacing.md};
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.primary};
  background: none;
  border: none;
  font-weight: 500;
  margin-bottom: ${props => props.theme.spacing.lg};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const KitchenContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing['3xl']};
  margin-bottom: ${props => props.theme.spacing['3xl']};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing['2xl']};
  }
`;

const ImageSection = styled.div`
  position: relative;
  background: white;
  border-radius: ${props => props.theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.lg};
`;

const MainImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  transition: ${props => props.theme.transitions.normal};
`;

const ImageNavigation = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 ${props => props.theme.spacing.md};
  transform: translateY(-50%);
`;

const NavButton = styled.button`
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fontSizes.lg};

  &:hover {
    background: white;
    transform: scale(1.1);
  }
`;

const ThumbnailContainer = styled.div`
  position: absolute;
  bottom: ${props => props.theme.spacing.md};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const Thumbnail = styled.img`
  width: 80px;
  height: 50px;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.sm};
  cursor: pointer;
  border: 2px solid ${props => props.active ? props.theme.colors.primary : 'transparent'};
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const InfoSection = styled.div`
  background: white;
  padding: ${props => props.theme.spacing['2xl']};
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: ${props => props.theme.shadows.lg};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const KitchenTitle = styled.h1`
  font-size: ${props => props.theme.fontSizes['3xl']};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const KitchenPrice = styled.div`
  font-size: ${props => props.theme.fontSizes['4xl']};
  font-weight: 700;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const KitchenDescription = styled.p`
  color: ${props => props.theme.colors.gray};
  line-height: 1.6;
  font-size: ${props => props.theme.fontSizes.lg};
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.md};
  margin: ${props => props.theme.spacing.lg} 0;
`;

const SpecItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.light};
  border-radius: ${props => props.theme.borderRadius.md};
`;

const SpecIcon = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fontSizes.lg};
`;

const SpecText = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.dark};
  font-weight: 500;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: auto;
  flex-wrap: wrap;
`;

const Button = styled.button`
  flex: 1;
  min-width: 200px;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.fontSizes.md};

  &.primary {
    background: ${props => props.theme.colors.gradient};
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: ${props => props.theme.shadows.lg};
    }
  }

  &.secondary {
    background: transparent;
    color: ${props => props.theme.colors.primary};
    border: 2px solid ${props => props.theme.colors.primary};

    &:hover {
      background: ${props => props.theme.colors.primary};
      color: white;
    }
  }

  &.icon {
    background: ${props => props.theme.colors.light};
    color: ${props => props.theme.colors.primary};
    flex: none;
    width: 60px;
    min-width: 60px;

    &:hover {
      background: ${props => props.theme.colors.primary};
      color: white;
    }
  }
`;

const RelatedSection = styled.section`
  background: white;
  padding: ${props => props.theme.spacing['2xl']};
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: ${props => props.theme.shadows.lg};
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes['2xl']};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xl};
  text-align: center;
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

const RelatedItem = styled(motion.div)`
  background: ${props => props.theme.colors.light};
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
  cursor: pointer;
  transition: ${props => props.theme.transitions.normal};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const RelatedImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const RelatedContent = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

const RelatedTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.md};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const RelatedPrice = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.secondary};
  font-weight: 600;
`;

const KitchenDetail = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Данные кухни (в реальном приложении это будет запрос к API)
  const kitchen = {
    id: 1,
    title: 'Современная кухня "Минимализм"',
    description: 'Чистые линии, функциональность и стиль. Идеально подходит для современных интерьеров. Эта кухня сочетает в себе элегантность минимализма с практичностью современного дизайна.',
    price: 'от 120 000 ₽',
    style: 'Современный',
    material: 'МДФ',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  };

  const images = [
    kitchen.image,
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ];

  const relatedKitchens = [
    {
      id: 2,
      title: 'Классическая кухня "Элегант"',
      price: 'от 180 000 ₽',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 3,
      title: 'Скандинавская кухня "Север"',
      price: 'от 100 000 ₽',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 4,
      title: 'Лофт кухня "Индустриал"',
      price: 'от 150 000 ₽',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  const handleRelatedClick = (kitchenId) => {
    navigate(`/kitchen/${kitchenId}`);
  };

  return (
    <KitchenDetailContainer>
      <Container>
        <BackButton onClick={() => navigate(-1)}>
          <FiArrowLeft />
          Назад к каталогу
        </BackButton>

        <KitchenContent>
          <ImageSection>
            <MainImage src={images[currentImageIndex]} alt={kitchen.title} />
            
            <ImageNavigation>
              <NavButton onClick={prevImage}>
                <FiArrowLeft />
              </NavButton>
              <NavButton onClick={nextImage}>
                <FiArrowRight />
              </NavButton>
            </ImageNavigation>

            <ThumbnailContainer>
              {images.map((image, index) => (
                <Thumbnail
                  key={index}
                  src={image}
                  alt={`${kitchen.title} ${index + 1}`}
                  active={index === currentImageIndex}
                  onClick={() => selectImage(index)}
                />
              ))}
            </ThumbnailContainer>
          </ImageSection>

          <InfoSection>
            <KitchenTitle>{kitchen.title}</KitchenTitle>
            <KitchenPrice>{kitchen.price}</KitchenPrice>
            <KitchenDescription>{kitchen.description}</KitchenDescription>

            <SpecsGrid>
              <SpecItem>
                <SpecIcon>
                  <FiMaximize />
                </SpecIcon>
                <SpecText>Размер: 3.5 x 2.5 м</SpecText>
              </SpecItem>
              <SpecItem>
                <SpecIcon>
                  <FiHome />
                </SpecIcon>
                <SpecText>Стиль: {kitchen.style}</SpecText>
              </SpecItem>
              <SpecItem>
                <SpecIcon>
                  <FiDollarSign />
                </SpecIcon>
                <SpecText>Материал: {kitchen.material}</SpecText>
              </SpecItem>
              <SpecItem>
                <SpecIcon>
                  <FiClock />
                </SpecIcon>
                <SpecText>Срок: 14-21 день</SpecText>
              </SpecItem>
            </SpecsGrid>

            <ActionButtons>
              <Button 
                className="primary"
                onClick={() => navigate('/calculator')}
              >
                Рассчитать стоимость
              </Button>
              <Button className="secondary">
                Получить консультацию
              </Button>
            </ActionButtons>
          </InfoSection>
        </KitchenContent>

        <RelatedSection>
          <SectionTitle>Похожие кухни</SectionTitle>
          <RelatedGrid>
            {relatedKitchens.map((item, index) => (
              <RelatedItem
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => handleRelatedClick(item.id)}
              >
                <RelatedImage src={item.image} alt={item.title} />
                <RelatedContent>
                  <RelatedTitle>{item.title}</RelatedTitle>
                  <RelatedPrice>{item.price}</RelatedPrice>
                </RelatedContent>
              </RelatedItem>
            ))}
          </RelatedGrid>
        </RelatedSection>
      </Container>
    </KitchenDetailContainer>
  );
};

export default KitchenDetail;
