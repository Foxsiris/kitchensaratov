import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const asset = (fileName) =>
  `${process.env.PUBLIC_URL || ''}/assets/${fileName}`;

const BLOCKS = [
  {
    id: 'salons',
    value: '2',
    label: 'салона в центре города',
    image: '20260209_rimi_052_1333.jpg',
  },
  {
    id: 'managers',
    value: '8',
    label: 'опытных менеджеров',
    image:
      'Ymgyn4YDCXCuCOGJTYRMo4PEWWIDkCKCqa6RwXxW7zbZcyfjJq4hzvO4w1Jy4qbdmYmArEVdgjY9fiBjMFB0g2OA.jpg',
  },
  {
    id: 'kitchens',
    value: '12',
    label: 'образцов дизайнерских кухонь',
    image: '20260209_rimi_001_1243.jpg',
  },
  {
    id: 'furniture',
    value: '6',
    label: 'образцов дизайнерской мебели',
    image: '20260209_rimi_048_1325.jpg',
  },
];

const Section = styled.section`
  padding: ${(p) => p.theme.spacing['5xl']} 0;
  background: ${(p) => p.theme.colors.primary};
  color: ${(p) => p.theme.colors.white};

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

const SectionTitle = styled(motion.h2)`
  margin: 0 0 ${(p) => p.theme.spacing['2xl']};
  max-width: 920px;
  font-family: ${(p) => p.theme.fonts.primary};
  font-size: clamp(1.25rem, 2.8vw, 1.85rem);
  font-weight: 400;
  line-height: 1.38;
  letter-spacing: -0.02em;
  color: #ffffff;

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    margin-bottom: ${(p) => p.theme.spacing.xl};
    font-size: ${(p) => p.theme.fontSizes.lg};
    line-height: 1.42;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${(p) => p.theme.spacing.md};

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${(p) => p.theme.spacing.sm};
  }
`;

const CardImage = styled.div`
  position: absolute;
  inset: 0;
  background-image: ${(p) => `url(${p.$src})`};
  background-size: cover;
  background-position: center;
  transform: scale(1.02);
  transition: transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.18) 0%,
    rgba(0, 0, 0, 0.22) 40%,
    rgba(0, 0, 0, 0.78) 100%
  );
  pointer-events: none;
`;

const CardBody = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: ${(p) => p.theme.spacing.xl};
  pointer-events: none;

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    padding: ${(p) => p.theme.spacing.lg};
  }
`;

const CardValue = styled.span`
  display: block;
  font-family: ${(p) => p.theme.fonts.primary};
  font-size: clamp(2.75rem, 10vw, 4.25rem);
  font-weight: 200;
  line-height: 1;
  letter-spacing: -0.04em;
  color: #ffffff;
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.45);
`;

const CardLabel = styled.span`
  display: block;
  margin-top: ${(p) => p.theme.spacing.sm};
  max-width: 280px;
  font-family: ${(p) => p.theme.fonts.primary};
  font-size: ${(p) => p.theme.fontSizes.sm};
  font-weight: 500;
  line-height: 1.35;
  letter-spacing: 0.02em;
  color: rgba(255, 255, 255, 0.92);
  text-shadow: 0 1px 12px rgba(0, 0, 0, 0.5);

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    font-size: ${(p) => p.theme.fontSizes.xs};
    max-width: 240px;
  }
`;

const Card = styled(motion.article)`
  position: relative;
  border-radius: 22px;
  overflow: hidden;
  min-height: clamp(220px, 32vw, 360px);
  isolation: isolate;

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    min-height: min(52vw, 280px);
    border-radius: 18px;
  }

  @media (hover: hover) {
    &:hover ${CardImage} {
      transform: scale(1.06);
    }
  }
`;

const SalonOpen = () => {
  return (
    <Section aria-labelledby="salon-open-heading">
      <Inner>
        <SectionTitle
          id="salon-open-heading"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true, margin: '-40px' }}
        >
          Наш салон всегда открыт для творческих и рабочих встреч,
          вдохновения и живого общения
        </SectionTitle>

        <Grid>
          {BLOCKS.map((block, i) => (
            <Card
              key={block.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              viewport={{ once: true, margin: '-32px' }}
            >
              <CardImage $src={asset(block.image)} aria-hidden />
              <CardOverlay aria-hidden />
              <CardBody>
                <CardValue>{block.value}</CardValue>
                <CardLabel>{block.label}</CardLabel>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </Inner>
    </Section>
  );
};

export default SalonOpen;
