import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { useCatalog } from '../../../context/CatalogContext';
import { resolveCatalogImageSrc } from '../../../utils/imageUrl';

const Section = styled.section`
  padding: ${props => props.theme.spacing['5xl']} 0;
  background: ${props => props.theme.colors.white};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing['3xl']} 0;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 8px;
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
    font-size: 10px;
    margin-bottom: ${props => props.theme.spacing.xl};
    letter-spacing: 0.18em;
  }
`;

/* ---- Mosaic: кухни / шкафы+гардероб+комоды / столы | стулья ---- */
const MosaicGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows:
    minmax(200px, 36vw)
    minmax(180px, 28vw)
    minmax(180px, 28vw)
    minmax(160px, 26vw);
  gap: ${props => props.theme.spacing.sm};
  align-items: stretch;
`;

/* Individual card */
const CategoryCard = styled(motion.div)`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border-radius: 24px;
  min-height: 0;
  align-self: stretch;

  ${(props) =>
    props.$area === 'hero' &&
    `
    grid-column: 1 / -1;
    grid-row: 1;
  `}
  ${(props) =>
    props.$area === 'tall' &&
    `
    grid-column: 1;
    grid-row: 2 / span 2;
  `}
  ${(props) =>
    props.$area === 'rt' &&
    `
    grid-column: 2;
    grid-row: 2;
  `}
  ${(props) =>
    props.$area === 'rb' &&
    `
    grid-column: 2;
    grid-row: 3;
  `}
  ${(props) =>
    props.$area === 'b1' &&
    `
    grid-column: 1;
    grid-row: 4;
  `}
  ${(props) =>
    props.$area === 'b2' &&
    `
    grid-column: 2;
    grid-row: 4;
  `}

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    border-radius: 20px;
  }
`;

const CardLink = styled(Link)`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 160px;
  text-decoration: none;
`;

const CardImage = styled.div`
  width: 100%;
  height: 100%;
  min-height: 160px;
  background: url(${props => props.$src}) center/cover no-repeat;
  transition: transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  ${CategoryCard}:hover & {
    transform: scale(1.05);
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
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
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
    font-size: ${props => props.theme.fontSizes.lg};
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

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 10px;
  }
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
    opacity: 1;
    transform: translateX(0);
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

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: center;
    font-size: 11px;
    padding: ${props => props.theme.spacing.lg};
  }
`;

/** Короткая подпись с витринных групп категории (имя производителя / линейки). */
function labelFromDisplayGroup(brand) {
  const raw = String(brand?.entityName || brand?.name || '').trim();
  if (!raw) return '';
  let m = raw.match(/^В стиле «(.+)»$/);
  if (m) return m[1].trim();
  m = raw.match(/^Фабрика «(.+)»$/);
  if (m) return m[1].trim();
  return raw;
}

function subtitleFromCategory(category) {
  const brands = Array.isArray(category?.brands) ? category.brands : [];
  const visible =
    brands.length <= 1
      ? brands
      : brands.filter((b) => b.id !== 'default');
  const labels = [...new Set(visible.map(labelFromDisplayGroup).filter(Boolean))];
  if (labels.length === 0) return 'Каталог';
  const max = 4;
  const head = labels.slice(0, max);
  const tail = labels.length > max ? ' и др.' : '';
  return `${head.join(' · ')}${tail}`;
}

/** Порядок и раскладка как в макете (одинаково на всех ширинах) */
const MOSAIC_SLOTS = [
  { categoryId: 'kitchens', area: 'hero' },
  { categoryId: 'cabinets', area: 'tall' },
  { categoryId: 'wardrobes', area: 'rt' },
  { categoryId: 'dressers', area: 'rb' },
  { categoryId: 'tables', area: 'b1' },
  { categoryId: 'chairs', area: 'b2' },
];

const CatalogPreview = () => {
  const { categories: catalogCategories } = useCatalog();

  const mosaicTiles = MOSAIC_SLOTS.map((slot) => {
    const cat = catalogCategories.find((c) => c.id === slot.categoryId);
    if (!cat) return null;
    return {
      key: cat.id,
      area: slot.area,
      label: cat.name,
      subtitle: subtitleFromCategory(cat),
      link: `/catalog?category=${cat.id}`,
      image: resolveCatalogImageSrc(cat.image),
    };
  }).filter(Boolean);

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
          {mosaicTiles.map((tile, index) => (
            <CategoryCard
              key={tile.key}
              $area={tile.area}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <CardLink to={tile.link}>
                <CardImage $src={tile.image} />
                <CardOverlay />
                <CardLabel>
                  <LabelText>{tile.label}</LabelText>
                  <LabelSubtext>{tile.subtitle}</LabelSubtext>
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
