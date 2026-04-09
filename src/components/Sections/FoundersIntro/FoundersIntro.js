import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PHOTO = 'founders-intro.jpg';

const photoSrc = `${process.env.PUBLIC_URL || ''}/assets/${PHOTO}`;

const Section = styled.section`
  padding: ${(p) => p.theme.spacing['5xl']} 0;
  background: ${(p) => p.theme.colors.white};

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    padding: ${(p) => p.theme.spacing['3xl']} 0;
  }
`;

const Inner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${(p) => p.theme.spacing.xl};

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    padding: 0 16px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 38%);
  gap: clamp(${({ theme }) => theme.spacing.xl}, 4vw, ${({ theme }) =>
    theme.spacing['4xl']});
  align-items: center;

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${(p) => p.theme.spacing.xl};
  }
`;

const Copy = styled.div`
  min-width: 0;
`;

const Title = styled(motion.h2)`
  margin: 0 0 ${(p) => p.theme.spacing.xl};
  font-family: ${(p) => p.theme.fonts.secondary};
  font-size: clamp(1.65rem, 3.8vw, 2.35rem);
  font-weight: 400;
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: ${(p) => p.theme.colors.primary};

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    margin-bottom: ${(p) => p.theme.spacing.lg};
    font-size: ${(p) => p.theme.fontSizes['3xl']};
  }
`;

const Lead = styled(motion.p)`
  margin: 0;
  font-family: ${(p) => p.theme.fonts.primary};
  font-size: ${(p) => p.theme.fontSizes.md};
  font-weight: 400;
  line-height: 1.65;
  color: ${(p) => p.theme.colors.secondary};

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    font-size: ${(p) => p.theme.fontSizes.sm};
    line-height: 1.62;
  }
`;

const Figure = styled(motion.figure)`
  margin: 0;
  border-radius: 22px;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  max-height: min(420px, 62vh);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.08),
    0 2px 8px rgba(0, 0, 0, 0.04);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    display: block;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    border-radius: 18px;
    max-height: none;
    aspect-ratio: 1 / 1;
    max-width: min(100%, 360px);
    margin: 0 auto;
  }
`;

const FoundersIntro = () => {
  return (
    <Section aria-labelledby="founders-intro-heading">
      <Inner>
        <Grid>
          <Copy>
            <Title
              id="founders-intro-heading"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              viewport={{ once: true, margin: '-40px' }}
            >
              Давайте знакомиться!
            </Title>
            <Lead
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.06 }}
              viewport={{ once: true, margin: '-40px' }}
            >
              Здравствуйте! Нас зовут Елена и Татьяна, мы сестры и основатели салона
              «Рими & VivaKitchen» в Саратове. Уже несколько лет мы создаём не
              просто мебель на заказ, а интерьеры, в которых хочется жить и пространства,
              которые становятся отражением вашего жизненного пути и философии.
            </Lead>
          </Copy>
          <Figure
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            viewport={{ once: true, margin: '-40px' }}
          >
            <img
              src={photoSrc}
              alt="Елена и Татьяна, основатели салона «Рими & VivaKitchen»"
              loading="lazy"
              decoding="async"
            />
          </Figure>
        </Grid>
      </Inner>
    </Section>
  );
};

export default FoundersIntro;
