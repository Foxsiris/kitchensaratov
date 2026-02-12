import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const Section = styled.section`
  padding: ${props => props.theme.spacing['5xl']} 0;
  background: ${props => props.theme.colors.white};
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`;

const SectionTitle = styled(motion.h2)`
  font-family: ${props => props.theme.fonts.primary};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing['2xl']};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes.xs};
    margin-bottom: ${props => props.theme.spacing.xl};
  }
`;

/* ---- Mosaic Grid ---- */
const MosaicGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto;
  gap: 6px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 4px;
  }
`;

/* Individual card */
const CategoryCard = styled(motion.div)`
  position: relative;
  overflow: hidden;
  cursor: pointer;

  /* First card spans both columns (full width) */
  &:nth-child(1) {
    grid-column: 1 / -1;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    &:nth-child(1) {
      grid-column: 1;
    }
  }
`;

const CardLink = styled(Link)`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  text-decoration: none;
`;

const CardImage = styled.div`
  width: 100%;
  height: ${props => props.$height || '420px'};
  background: url(${props => props.$src}) center/cover no-repeat;
  transition: transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  ${CategoryCard}:hover & {
    transform: scale(1.05);
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    height: ${props => props.$heightTablet || '320px'};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    height: ${props => props.$heightMobile || '280px'};
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 40%,
    rgba(0, 0, 0, 0.15) 70%,
    rgba(0, 0, 0, 0.45) 100%
  );
  transition: background 0.4s ease;

  ${CategoryCard}:hover & {
    background: linear-gradient(
      to bottom,
      transparent 30%,
      rgba(0, 0, 0, 0.2) 60%,
      rgba(0, 0, 0, 0.55) 100%
    );
  }
`;

const CardLabel = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.white};
  z-index: 2;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.md};
  }
`;

const LabelText = styled.span`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.2;
  display: block;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes.xl};
  }
`;

const LabelSubtext = styled.span`
  font-family: ${props => props.theme.fonts.primary};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: 400;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.6);
  display: block;
  margin-top: 4px;
  text-transform: uppercase;
`;

const HoverArrow = styled.div`
  position: absolute;
  bottom: ${props => props.theme.spacing.lg};
  right: ${props => props.theme.spacing.xl};
  width: 44px;
  height: 44px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.white};
  z-index: 2;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  ${CategoryCard}:hover & {
    opacity: 1;
    transform: translateX(0);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    bottom: ${props => props.theme.spacing.md};
    right: ${props => props.theme.spacing.md};
    width: 36px;
    height: 36px;
  }
`;

/* ---- Bottom CTA row ---- */
const BottomRow = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin-top: ${props => props.theme.spacing['2xl']};
`;

const ViewAllLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border: 1px solid ${props => props.theme.colors.primary};
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    opacity: 1;
  }
`;

const CatalogPreview = () => {
  const categories = [
    {
      id: 'kitchens',
      label: 'Кухни',
      subtitle: 'Рими · Vivakitchen',
      link: '/catalog?category=kitchens',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
      height: '520px',
      heightTablet: '400px',
      heightMobile: '320px',
    },
    {
      id: 'wardrobes',
      label: 'Гардеробные',
      subtitle: 'Системы хранения',
      link: '/catalog?category=wardrobes',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      height: '380px',
      heightTablet: '300px',
      heightMobile: '280px',
    },
    {
      id: 'cabinets',
      label: 'Шкафы',
      subtitle: 'Встроенные решения',
      link: '/catalog?category=cabinets',
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      height: '380px',
      heightTablet: '300px',
      heightMobile: '280px',
    },
    {
      id: 'dressers',
      label: 'Комоды',
      subtitle: 'Элегантное хранение',
      link: '/catalog?category=dressers',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      height: '380px',
      heightTablet: '300px',
      heightMobile: '280px',
    },
    {
      id: 'tables',
      label: 'Столы',
      subtitle: 'Массив дерева',
      link: '/catalog?category=tables',
      image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      height: '380px',
      heightTablet: '300px',
      heightMobile: '280px',
    },
    {
      id: 'chairs',
      label: 'Стулья',
      subtitle: 'Комфорт и стиль',
      link: '/catalog?category=chairs',
      image: 'https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      height: '380px',
      heightTablet: '300px',
      heightMobile: '280px',
    },
  ];

  return (
    <Section>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Много интерьерных задач — одно решение
        </SectionTitle>

        <MosaicGrid>
          {categories.map((cat, index) => (
            <CategoryCard
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <CardLink to={cat.link}>
                <CardImage
                  $src={cat.image}
                  $height={cat.height}
                  $heightTablet={cat.heightTablet}
                  $heightMobile={cat.heightMobile}
                />
                <CardOverlay />
                <CardLabel>
                  <LabelText>{cat.label}</LabelText>
                  <LabelSubtext>{cat.subtitle}</LabelSubtext>
                </CardLabel>
                <HoverArrow>
                  <FiArrowRight size={18} />
                </HoverArrow>
              </CardLink>
            </CategoryCard>
          ))}
        </MosaicGrid>

        <BottomRow
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <ViewAllLink to="/catalog">
            Смотреть все проекты
            <FiArrowRight size={14} />
          </ViewAllLink>
        </BottomRow>
      </Container>
    </Section>
  );
};

export default CatalogPreview;
