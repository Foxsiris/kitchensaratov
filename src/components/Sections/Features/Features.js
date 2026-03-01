import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiShield, 
  FiAward, 
  FiUsers,
  FiTruck,
  FiStar,
  FiHeart
} from 'react-icons/fi';

const FeaturesContainer = styled.section`
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

const FeaturesShell = styled.div`
  background: ${props => props.theme.colors.primary};
  border-radius: 28px;
  padding: clamp(28px, 4vw, 56px);
  color: ${props => props.theme.colors.white};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    border-radius: 16px;
    padding: ${props => props.theme.spacing['2xl']} ${props => props.theme.spacing.lg};
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing['4xl']};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-bottom: ${props => props.theme.spacing['2xl']};
  }
`;

const Overline = styled(motion.div)`
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 10px;
    letter-spacing: 0.16em;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${props => props.theme.fontSizes['4xl']};
  color: ${props => props.theme.colors.white};
  font-weight: 400;
  letter-spacing: -0.02em;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes['2xl']};
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.sm};
  }
`;

const FeatureCard = styled(motion.div)`
  ${props => {
    const spanMap = [6, 3, 3, 3, 3, 6];
    const span = spanMap[props.$idx % spanMap.length];
    return `grid-column: span ${span};`;
  }}
  background:
    radial-gradient(circle at 15% 15%, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0) 45%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.03));
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 22px;
  backdrop-filter: blur(2px);
  padding: ${props => props.theme.spacing['2xl']} ${props => props.theme.spacing.xl};
  text-align: left;
  transition: ${props => props.theme.transitions.normal};
  min-height: 210px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 255, 255, 0.35);
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.35);
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    ${props => {
      const spanMap = [6, 3, 3, 3, 3, 6];
      const span = spanMap[props.$idx % spanMap.length];
      return `grid-column: span ${span};`;
    }}
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-column: span 1;
    min-height: auto;
    padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg};
    border-radius: 16px;
  }
`;

const FeatureIcon = styled.div`
  width: 56px;
  height: 56px;
  border: 1px solid rgba(255, 255, 255, 0.26);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.white};
  font-size: 1.25rem;
  transition: ${props => props.theme.transitions.fast};
  background: rgba(255, 255, 255, 0.06);

  ${FeatureCard}:hover & {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.45);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 48px;
    height: 48px;
    font-size: 1.1rem;
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

const FeatureTitle = styled.h3`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.white};
  font-weight: 400;
  margin-bottom: ${props => props.theme.spacing.sm};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes.lg};
  }
`;

const FeatureDescription = styled.p`
  color: rgba(255, 255, 255, 0.74);
  line-height: 1.7;
  font-size: ${props => props.theme.fontSizes.sm};
  margin-bottom: 0;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 13px;
    line-height: 1.6;
  }
`;

const Features = () => {
  const features = [
    {
      icon: <FiStar />,
      title: 'Авторские проекты',
      description: 'Нестандартные решения и индивидуальный подход к каждому интерьеру'
    },
    {
      icon: <FiAward />,
      title: 'Уникальные фасады',
      description: 'Эксклюзивные фактуры и передовые технологии производства'
    },
    {
      icon: <FiShield />,
      title: 'Лучшие фабрики',
      description: 'Эксклюзивные поставки от Рими, Vivakitchen, Ligron и других'
    },
    {
      icon: <FiHeart />,
      title: 'От доступных до премиума',
      description: 'Широкий ценовой диапазон без компромиссов в качестве'
    },
    {
      icon: <FiTruck />,
      title: 'Доставка и монтаж',
      description: 'Полный цикл от проекта до установки под ключ'
    },
    {
      icon: <FiUsers />,
      title: 'Опытная команда',
      description: 'Дизайнеры и мастера с многолетним стажем'
    }
  ];

  return (
    <FeaturesContainer>
      <Container>
        <FeaturesShell>
          <SectionHeader>
            <Overline
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Преимущества
            </Overline>
            <SectionTitle
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Почему выбирают нас
            </SectionTitle>
          </SectionHeader>

          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                $idx={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <FeatureIcon>
                  {feature.icon}
                </FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </FeaturesShell>
      </Container>
    </FeaturesContainer>
  );
};

export default Features;
