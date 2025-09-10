import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiArrowLeft, FiArrowRight, FiHeart, FiShare2, FiDownload, FiMaximize, FiHome, FiDollarSign } from 'react-icons/fi';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.md};
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.borderRadius.xl};
  max-width: 1000px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: ${props => props.theme.shadows.xl};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    max-width: 500px;
  }
`;

const ImageSection = styled.div`
  position: relative;
  min-height: 500px;
  background: ${props => props.theme.colors.light};
  border-radius: ${props => props.theme.borderRadius.xl} 0 0 ${props => props.theme.borderRadius.xl};
  overflow: hidden;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    border-radius: ${props => props.theme.borderRadius.xl} ${props => props.theme.borderRadius.xl} 0 0;
  }
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  color: ${props => props.theme.colors.primary};

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
  width: 60px;
  height: 40px;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.sm};
  cursor: pointer;
  border: 2px solid ${props => props.active ? props.theme.colors.primary : 'transparent'};
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ContentSection = styled.div`
  padding: ${props => props.theme.spacing['2xl']};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing.lg};
  right: ${props => props.theme.spacing.lg};
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  color: ${props => props.theme.colors.dark};
  z-index: 10;

  &:hover {
    background: white;
    transform: scale(1.1);
  }
`;

const KitchenTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes['2xl']};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const KitchenPrice = styled.div`
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: 700;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const KitchenDescription = styled.p`
  color: ${props => props.theme.colors.gray};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SpecItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm};
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
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: auto;
`;

const Button = styled.button`
  flex: 1;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};

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
    width: 50px;

    &:hover {
      background: ${props => props.theme.colors.primary};
      color: white;
    }
  }
`;

const KitchenDetailModal = ({ isOpen, onClose, kitchen }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!kitchen) return null;

  const images = [
    kitchen.image,
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
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

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={onClose}>
              <FiX />
            </CloseButton>

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

            <ContentSection>
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
                    <FiDollarSign />
                  </SpecIcon>
                  <SpecText>Срок: 14-21 день</SpecText>
                </SpecItem>
              </SpecsGrid>

              <ActionButtons>
                <Button className="primary">
                  Заказать проект
                </Button>
                <Button className="secondary">
                  Получить консультацию
                </Button>
                <Button className="icon">
                  <FiHeart />
                </Button>
                <Button className="icon">
                  <FiShare2 />
                </Button>
                <Button className="icon">
                  <FiDownload />
                </Button>
              </ActionButtons>
            </ContentSection>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default KitchenDetailModal;
