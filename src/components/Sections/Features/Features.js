import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiShield, 
  FiAward, 
  FiUsers
} from 'react-icons/fi';

const FeaturesContainer = styled.section`
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

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing['2xl']};
`;

const FeatureCard = styled(motion.div)`
  background: white;
  padding: ${props => props.theme.spacing['2xl']};
  border-radius: ${props => props.theme.borderRadius.xl};
  text-align: center;
  box-shadow: ${props => props.theme.shadows.md};
  transition: ${props => props.theme.transitions.normal};
  border: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  background: ${props => props.theme.colors.gradient};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing.lg};
  color: white;
  font-size: ${props => props.theme.fontSizes['2xl']};
`;

const FeatureTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.gray};
  line-height: 1.6;
`;

const Features = () => {
  const features = [
    {
      icon: <FiShield />,
      title: 'Гарантия 5 лет',
      description: 'Предоставляем расширенную гарантию на все изделия'
    },
    {
      icon: <FiAward />,
      title: 'Качественные материалы',
      description: 'Используем только проверенные материалы от ведущих производителей'
    },
    {
      icon: <FiUsers />,
      title: 'Опытная команда',
      description: 'Наши дизайнеры и мастера работают в сфере более 10 лет'
    }
  ];


  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <FeaturesContainer>
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Почему выбирают нас
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Мы предлагаем полный цикл услуг по созданию кухни мечты
          </SectionSubtitle>
        </SectionHeader>

        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <FeatureIcon>
                {feature.icon}
              </FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Container>
    </FeaturesContainer>
  );
};

export default Features;
