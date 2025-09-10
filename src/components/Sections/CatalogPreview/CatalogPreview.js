import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiEye } from 'react-icons/fi';

const CatalogContainer = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: ${props => props.theme.colors.light};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing['3xl']};
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${props => props.theme.fontSizes['4xl']};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const SectionSubtitle = styled(motion.p)`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.gray};
  max-width: 600px;
  margin: 0 auto;
`;

const CatalogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing['2xl']};
  margin-bottom: ${props => props.theme.spacing['2xl']};
`;

const CatalogCard = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.md};
  transition: ${props => props.theme.transitions.normal};
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 250px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: ${props => props.theme.transitions.normal};
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: ${props => props.theme.transitions.normal};

  ${CatalogCard}:hover & {
    opacity: 1;
  }
`;

const ViewButton = styled.button`
  background: white;
  color: ${props => props.theme.colors.primary};
  border: none;
  padding: ${props => props.theme.spacing.md};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fontSizes.lg};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    transform: scale(1.1);
  }
`;

const CardContent = styled.div`
  padding: ${props => props.theme.spacing.xl};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const CardTopContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CardBottomContent = styled.div`
  margin-top: auto;
`;

const CardTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const CardDescription = styled.p`
  color: ${props => props.theme.colors.gray};
  margin-bottom: ${props => props.theme.spacing.md};
  line-height: 1.6;
  flex: 1;
`;

const CardPrice = styled.div`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: 600;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const CardButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.gradient};
  color: white;
  text-decoration: none;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  transition: ${props => props.theme.transitions.fast};
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const ViewAllButton = styled(motion.div)`
  text-align: center;
  margin-top: ${props => props.theme.spacing['2xl']};
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.primary};
  color: white;
  text-decoration: none;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  font-size: ${props => props.theme.fontSizes.lg};
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    background: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const CatalogPreview = () => {
  const catalogItems = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      title: 'Современная кухня',
      description: 'Минималистичный дизайн с использованием натуральных материалов',
      price: 'от 120 000 ₽'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      title: 'Классическая кухня',
      description: 'Традиционный стиль с элементами роскоши и элегантности',
      price: 'от 150 000 ₽'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      title: 'Скандинавская кухня',
      description: 'Светлые тона, натуральное дерево и функциональность',
      price: 'от 100 000 ₽'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      title: 'Лофт кухня',
      description: 'Индустриальный стиль с металлическими элементами',
      price: 'от 130 000 ₽'
    }
  ];

  return (
    <CatalogContainer>
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Каталог интерьеров
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Вдохновляйтесь нашими работами и создайте кухню своей мечты
          </SectionSubtitle>
        </SectionHeader>

        <CatalogGrid>
          {catalogItems.map((item, index) => (
            <CatalogCard
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ImageContainer>
                <Image src={item.image} alt={item.title} />
                <Overlay>
                  <ViewButton>
                    <FiEye />
                  </ViewButton>
                </Overlay>
              </ImageContainer>
              
              <CardContent>
                <CardTopContent>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                  <CardPrice>{item.price}</CardPrice>
                </CardTopContent>
                <CardBottomContent>
                  <CardButton to="/catalog">
                    Подробнее
                    <FiArrowRight />
                  </CardButton>
                </CardBottomContent>
              </CardContent>
            </CatalogCard>
          ))}
        </CatalogGrid>

        <ViewAllButton
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Button to="/catalog">
            Смотреть все проекты
            <FiArrowRight />
          </Button>
        </ViewAllButton>
      </Container>
    </CatalogContainer>
  );
};

export default CatalogPreview;
