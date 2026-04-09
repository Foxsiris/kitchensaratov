import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';
import {
  GlyphAuthor,
  GlyphFacade,
  GlyphFactory,
  GlyphSpectrum,
  GlyphDelivery,
  GlyphTeam,
} from './FeatureIcons';

const FeaturesContainer = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: ${props => props.theme.colors.light};

  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    padding: ${props => props.theme.spacing['3xl']} 0;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing['3xl']} 0;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 16px;
  }
`;

/** Горизонтальные карточки — чуть шире, чтобы текст справа от иконки дышал */
const FeaturesContent = styled.div`
  max-width: 960px;
  margin: 0 auto;
  width: 100%;

  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    max-width: 920px;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing['3xl']};
  max-width: 520px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    margin-bottom: ${props => props.theme.spacing['2xl']};
    max-width: 480px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-bottom: ${props => props.theme.spacing['2xl']};
    max-width: 640px;
  }
`;

const Overline = styled(motion.div)`
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: ${props => props.theme.colors.gray};
  margin-bottom: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 10px;
  }
`;

const TitleAccent = styled(motion.div)`
  width: 40px;
  height: 1px;
  margin: ${props => props.theme.spacing.md} auto 0;
  background: linear-gradient(
    90deg,
    transparent,
    ${props => props.theme.colors.grayLight},
    transparent
  );

  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    width: 36px;
    margin-top: ${props => props.theme.spacing.sm};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 48px;
    margin-top: ${props => props.theme.spacing.lg};
  }
`;

const SectionTitle = styled(motion.h2)`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: clamp(1.65rem, 3.2vw, ${props => props.theme.fontSizes['3xl']});
  color: ${props => props.theme.colors.primary};
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin: 0;

  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    font-size: clamp(1.5rem, 2.5vw, ${props => props.theme.fontSizes['2xl']});
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes['2xl']};
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${props => props.theme.spacing.sm};
  align-items: stretch;

  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    gap: 10px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.sm};
  }
`;

const FeatureCard = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 18px;
  box-shadow: ${props => props.theme.shadows.md};
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg};

  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    border-radius: 16px;
    padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.md};
  }
  text-align: left;
  transition: ${props => props.theme.transitions.normal};
  min-height: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.lg};
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
  height: 100%;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 10% 42%,
      rgba(0, 0, 0, 0.035),
      transparent 46%
    );
    pointer-events: none;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-4px);
      border-color: ${props => props.theme.colors.grayLight};
      box-shadow: ${props => props.theme.shadows.xl};
    }
  }

  @media (hover: none), (pointer: coarse) {
    &:active {
      transform: translateY(-2px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &:active {
      transform: none;
    }
  }

  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    gap: ${props => props.theme.spacing.xl};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    height: auto;
    min-height: auto;
    gap: ${props => props.theme.spacing.sm};
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    border-radius: ${props => props.theme.borderRadius.xl};

    &::before {
      background: radial-gradient(
        circle at 8% 28%,
        rgba(0, 0, 0, 0.03),
        transparent 42%
      );
    }
  }
`;

const FeatureBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  position: relative;
  z-index: 1;
`;

const FeatureIcon = styled.div`
  width: 56px;
  height: 56px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  flex-shrink: 0;
  color: ${props => props.theme.colors.primary};
  padding: 8px;
  box-sizing: border-box;

  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    width: 52px;
    height: 52px;
    border-radius: 13px;
    padding: 7px;
  }
  transition:
    ${props => props.theme.transitions.fast},
    transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
  background: ${props => props.theme.colors.light};
  transform: ${props => (props.$active ? 'scale(1.02)' : 'scale(1)')};

  @media (hover: hover) and (pointer: fine) {
    ${FeatureCard}:hover & {
      background: ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.white};
      border-color: ${props => props.theme.colors.primary};
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 44px;
    height: 44px;
    border-radius: 11px;
    padding: 6px;
    margin: 0;
    flex-shrink: 0;

    svg {
      stroke-width: 1.5px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: ${props => props.theme.transitions.fast};
    transform: none;
  }
`;

const FeatureTitle = styled.h3`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.primary};
  font-weight: 400;
  margin-bottom: ${props => props.theme.spacing.xs};

  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    font-size: ${props => props.theme.fontSizes.md};
    margin-bottom: 2px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes.sm};
    margin-bottom: 2px;
    line-height: 1.2;
  }
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.gray};
  line-height: 1.62;
  font-size: ${props => props.theme.fontSizes.sm};
  margin-bottom: 0;

  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    line-height: 1.58;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 11px;
    line-height: 1.35;
  }
`;

/** Анимации по hover имеют смысл только с мышью; на таче избегаем «липкого» hover и пустых жестов */
function useFinePointerHover() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setOk(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return ok;
}

const Features = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const reduceMotion = useReducedMotion();
  const finePointerHover = useFinePointerHover();

  const features = [
    {
      Glyph: GlyphAuthor,
      title: 'Авторские проекты',
      description: 'Нестандартные решения и индивидуальный подход к каждому интерьеру',
    },
    {
      Glyph: GlyphFacade,
      title: 'Уникальные фасады',
      description: 'Эксклюзивные фактуры и передовые технологии производства',
    },
    {
      Glyph: GlyphFactory,
      title: 'Лучшие фабрики',
      description: 'Эксклюзивные поставки от фабрик Рими, Vivakitchen, Ligron и других',
    },
    {
      Glyph: GlyphSpectrum,
      title: 'От доступных до премиума',
      description: 'Широкий ценовой диапазон без компромиссов в качестве',
    },
    {
      Glyph: GlyphDelivery,
      title: 'Доставка и монтаж',
      description: 'Полный цикл от проекта до установки под ключ',
    },
    {
      Glyph: GlyphTeam,
      title: 'Опытная команда',
      description: 'Дизайнеры и мастера с многолетним стажем',
    },
  ];

  return (
    <FeaturesContainer aria-labelledby="features-heading">
      <Container>
        <FeaturesContent>
          <SectionHeader>
            <Overline
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: '-40px' }}
            >
              Преимущества
            </Overline>
            <SectionTitle
              id="features-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              viewport={{ once: true, margin: '-40px' }}
            >
              Почему выбирают нас
            </SectionTitle>
            <TitleAccent
              initial={{ opacity: 0, scaleX: 0.6 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              viewport={{ once: true, margin: '-40px' }}
            />
          </SectionHeader>

          <FeaturesGrid>
            {features.map((feature, index) => {
              const isActive = finePointerHover && hoveredIndex === index;
              const { Glyph } = feature;
              return (
                <FeatureCard
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true, margin: '-40px' }}
                  onMouseEnter={() => finePointerHover && setHoveredIndex(index)}
                  onMouseLeave={() => finePointerHover && setHoveredIndex(null)}
                >
                  <FeatureIcon $active={isActive} aria-hidden>
                    <Glyph active={isActive} reduceMotion={reduceMotion} />
                  </FeatureIcon>
                  <FeatureBody>
                    <FeatureTitle>{feature.title}</FeatureTitle>
                    <FeatureDescription>{feature.description}</FeatureDescription>
                  </FeatureBody>
                </FeatureCard>
              );
            })}
          </FeaturesGrid>
        </FeaturesContent>
      </Container>
    </FeaturesContainer>
  );
};

export default Features;
