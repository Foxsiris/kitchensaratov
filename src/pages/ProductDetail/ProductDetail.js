import React, { useMemo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight, FiPhone } from 'react-icons/fi';
import { findProductById, categories } from '../../data/catalogData';
import { useModal } from '../../hooks/useModal';

/* ============ Styled ============ */

const Page = styled.div`
  padding-top: 80px;
  min-height: 100vh;
  background: ${p => p.theme.colors.white};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding-top: 64px;
  }
`;

const HeroOuter = styled.div`
  padding: 0 ${p => p.theme.spacing.xl};
  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: 0 8px;
  }
`;

const HeroSection = styled.div`
  position: relative;
  height: 65vh;
  min-height: 420px;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  background: ${p => p.theme.colors.primary};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    height: 50vh;
    min-height: 340px;
    border-radius: 16px;
  }
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  background-image: url(${p => p.$src});
  background-size: cover;
  background-position: center;
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%);
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  padding: ${p => p.theme.spacing['3xl']};
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: ${p => p.theme.spacing.lg};
  }
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: ${p => p.theme.spacing.sm};
  margin-bottom: ${p => p.theme.spacing.lg};
  font-size: ${p => p.theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.5);

  a {
    color: rgba(255,255,255,0.5);
    text-decoration: none;
    transition: color 0.2s;
    &:hover { color: #fff; }
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: 10px;
    margin-bottom: ${p => p.theme.spacing.md};
  }
`;

const HeroTitle = styled(motion.h1)`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes['6xl']};
  font-weight: 400;
  color: #fff;
  letter-spacing: -0.03em;
  margin-bottom: ${p => p.theme.spacing.sm};

  @media (max-width: ${p => p.theme.breakpoints.tablet}) {
    font-size: ${p => p.theme.fontSizes['4xl']};
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes['2xl']};
  }
`;

const HeroTag = styled(motion.div)`
  display: inline-block;
  padding: 6px 16px;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(10px);
  font-size: ${p => p.theme.fontSizes.xs};
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: ${p => p.theme.spacing.md};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: 10px;
    padding: 5px 12px;
  }
`;

const HeroPrice = styled(motion.div)`
  font-size: ${p => p.theme.fontSizes['2xl']};
  color: #fff;
  font-weight: 300;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes.xl};
  }
`;

/* --- Content --- */

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${p => p.theme.spacing.xl};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: 0 16px;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${p => p.theme.spacing['3xl']};
  padding: ${p => p.theme.spacing['3xl']} 0;

  @media (max-width: ${p => p.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${p => p.theme.spacing.xl};
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: ${p => p.theme.spacing.xl} 0;
  }
`;

const MainCol = styled.div``;

const SideCol = styled.div``;

const SectionLabel = styled.div`
  font-size: ${p => p.theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${p => p.theme.colors.gray};
  margin-bottom: ${p => p.theme.spacing.md};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: 10px;
  }
`;

const Description = styled.p`
  font-size: ${p => p.theme.fontSizes.md};
  line-height: 1.8;
  color: ${p => p.theme.colors.grayDark};
  margin-bottom: ${p => p.theme.spacing['2xl']};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes.sm};
    line-height: 1.6;
  }
`;

const SpecsTable = styled.div`
  border-top: 1px solid ${p => p.theme.colors.border};
`;

const SpecRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${p => p.theme.spacing.md} 0;
  border-bottom: 1px solid ${p => p.theme.colors.border};
  font-size: ${p => p.theme.fontSizes.sm};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: 13px;
    padding: ${p => p.theme.spacing.sm} 0;
  }
`;

const SpecLabel = styled.span`
  color: ${p => p.theme.colors.gray};
`;

const SpecValue = styled.span`
  color: ${p => p.theme.colors.primary};
  font-weight: 500;
  text-align: right;
  max-width: 55%;
`;

/* --- Sidebar --- */

const StickyBox = styled.div`
  position: sticky;
  top: 110px;
  background: ${p => p.theme.colors.light};
  padding: ${p => p.theme.spacing['2xl']};

  @media (max-width: ${p => p.theme.breakpoints.tablet}) {
    position: static;
    padding: ${p => p.theme.spacing.xl};
  }
`;

const SidePrice = styled.div`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes['3xl']};
  color: ${p => p.theme.colors.primary};
  font-weight: 400;
  margin-bottom: ${p => p.theme.spacing.md};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes.xl};
  }
`;

const SideSource = styled.div`
  font-size: ${p => p.theme.fontSizes.xs};
  color: ${p => p.theme.colors.gray};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: ${p => p.theme.spacing.xl};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: 10px;
  }
`;

const CTAButton = styled(motion.button)`
  width: 100%;
  padding: ${p => p.theme.spacing.md} ${p => p.theme.spacing.xl};
  background: ${p => p.theme.colors.primary};
  color: #fff;
  font-size: ${p => p.theme.fontSizes.sm};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${p => p.theme.spacing.sm};
  transition: background 0.25s;
  margin-bottom: ${p => p.theme.spacing.md};
  &:hover { background: #222; }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: ${p => p.theme.spacing.lg};
    font-size: 11px;
  }
`;

const PhoneButton = styled(CTAButton)`
  background: transparent;
  color: ${p => p.theme.colors.primary};
  border: 1px solid ${p => p.theme.colors.border};
  &:hover { background: ${p => p.theme.colors.light}; }
`;

const BackLink = styled.div`
  padding: ${p => p.theme.spacing.xl} 0;

  a {
    display: inline-flex;
    align-items: center;
    gap: ${p => p.theme.spacing.sm};
    color: ${p => p.theme.colors.gray};
    font-size: ${p => p.theme.fontSizes.sm};
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    transition: color 0.2s;
    &:hover { color: ${p => p.theme.colors.primary}; }
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: ${p => p.theme.spacing.md} 0;

    a {
      font-size: 11px;
    }
  }
`;

/* --- Other Products --- */

const OtherOuter = styled.div`
  padding: 0 ${p => p.theme.spacing.xl};
  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: 0 8px;
  }
`;

const OtherSection = styled.section`
  background: ${p => p.theme.colors.primary};
  border-radius: 24px;
  padding: ${p => p.theme.spacing['4xl']} 0;
  margin-bottom: ${p => p.theme.spacing['3xl']};
  overflow: hidden;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    border-radius: 16px;
    padding: ${p => p.theme.spacing.xl} 0;
    margin-bottom: ${p => p.theme.spacing.xl};
  }
`;

const OtherTitle = styled.h2`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes['3xl']};
  color: #fff;
  font-weight: 400;
  text-align: center;
  margin-bottom: ${p => p.theme.spacing['2xl']};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes.xl};
    margin-bottom: ${p => p.theme.spacing.lg};
  }
`;

const OtherGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${p => p.theme.spacing.md};
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${p => p.theme.spacing.xl};

  @media (max-width: ${p => p.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    padding: 0 ${p => p.theme.spacing.lg};
    gap: ${p => p.theme.spacing.sm};
  }
`;

const OtherCard = styled(motion.div)`
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255,255,255,0.05);
  transition: background 0.3s;
  &:hover { background: rgba(255,255,255,0.1); }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    border-radius: 10px;
  }
`;

const OtherImg = styled.div`
  aspect-ratio: 4/3;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
  }
  ${OtherCard}:hover & img { transform: scale(1.05); }
`;

const OtherBody = styled.div`
  padding: ${p => p.theme.spacing.md};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: ${p => p.theme.spacing.sm};
  }
`;

const OtherName = styled.div`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes.lg};
  color: #fff;
  margin-bottom: 4px;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes.md};
  }
`;

const OtherPrice = styled.div`
  font-size: ${p => p.theme.fontSizes.sm};
  color: rgba(255,255,255,0.5);

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: 12px;
  }
`;

/* --- Not Found --- */

const NotFound = styled.div`
  text-align: center;
  padding: ${p => p.theme.spacing['5xl']} 0;
  h2 {
    font-family: ${p => p.theme.fonts.secondary};
    font-size: ${p => p.theme.fontSizes['3xl']};
    margin-bottom: ${p => p.theme.spacing.lg};
  }
`;

/* ============ Component ============ */

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openModal } = useModal();

  const product = useMemo(() => findProductById(id), [id]);

  // Get other products from same category
  const otherProducts = useMemo(() => {
    if (!product) return [];
    const cat = categories.find(c => c.id === product.categoryId);
    if (!cat) return [];
    const all = [];
    for (const brand of cat.brands) {
      for (const sub of brand.subcategories) {
        all.push(...sub.products);
      }
    }
    return all.filter(p => p.id !== id).slice(0, 4);
  }, [product, id]);

  if (!product) {
    return (
      <Page>
        <Container>
          <NotFound>
            <h2>Товар не найден</h2>
            <BackLink>
              <Link to="/catalog"><FiArrowLeft size={14} /> Вернуться в каталог</Link>
            </BackLink>
          </NotFound>
        </Container>
      </Page>
    );
  }

  return (
    <Page>
      {/* Hero */}
      <HeroOuter>
        <HeroSection>
          <HeroBg $src={product.image} />
          <HeroContent>
            <Breadcrumb>
              <Link to="/">Главная</Link> / <Link to="/catalog">Каталог</Link> / <Link to={`/catalog?category=${product.categoryId}`}>{product.categoryName}</Link> / <span style={{ color: '#fff' }}>{product.name}</span>
            </Breadcrumb>
            <HeroTag
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {product.brandName}
            </HeroTag>
            <HeroTitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {product.name}
            </HeroTitle>
            <HeroPrice
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {product.price}
            </HeroPrice>
          </HeroContent>
        </HeroSection>
      </HeroOuter>

      {/* Content */}
      <Container>
        <ContentGrid>
          <MainCol>
            <SectionLabel>Описание</SectionLabel>
            <Description>{product.description}</Description>

            {product.specs && (
              <>
                <SectionLabel>Характеристики</SectionLabel>
                <SpecsTable>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <SpecRow key={key}>
                      <SpecLabel>{
                        key === 'length' ? 'Длина' :
                        key === 'width' ? 'Ширина' :
                        key === 'height' ? 'Высота' :
                        key === 'material' ? 'Материал' :
                        key === 'frame' ? 'Каркас' :
                        key === 'load' ? 'Нагрузка' :
                        key === 'warranty' ? 'Гарантия' :
                        key
                      }</SpecLabel>
                      <SpecValue>{value}</SpecValue>
                    </SpecRow>
                  ))}
                </SpecsTable>
              </>
            )}

            <BackLink>
              <Link to={`/catalog?category=${product.categoryId}`}>
                <FiArrowLeft size={14} /> Назад к {product.categoryName.toLowerCase()}
              </Link>
            </BackLink>
          </MainCol>

          <SideCol>
            <StickyBox>
              <SidePrice>{product.price}</SidePrice>
              <SideSource>{product.source}</SideSource>

              <CTAButton
                whileTap={{ scale: 0.97 }}
                onClick={() => openModal('callback')}
              >
                Оставить заявку
                <FiArrowRight size={14} />
              </CTAButton>

              <PhoneButton
                whileTap={{ scale: 0.97 }}
                as="a"
                href="tel:+78001234567"
              >
                <FiPhone size={14} />
                Позвонить
              </PhoneButton>
            </StickyBox>
          </SideCol>
        </ContentGrid>
      </Container>

      {/* Other Products */}
      {otherProducts.length > 0 && (
        <OtherOuter>
          <OtherSection>
            <OtherTitle>Другие модели из каталога</OtherTitle>
            <OtherGrid>
              {otherProducts.map((p, i) => (
                <OtherCard
                  key={p.id}
                  onClick={() => navigate(`/product/${p.id}`)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                >
                  <OtherImg>
                    <img src={p.image} alt={p.name} loading="lazy" />
                  </OtherImg>
                  <OtherBody>
                    <OtherName>{p.name}</OtherName>
                    <OtherPrice>{p.price}</OtherPrice>
                  </OtherBody>
                </OtherCard>
              ))}
            </OtherGrid>
          </OtherSection>
        </OtherOuter>
      )}
    </Page>
  );
};

export default ProductDetail;
