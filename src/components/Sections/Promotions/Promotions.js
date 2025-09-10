import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiPercent, FiGift, FiClock, FiArrowRight } from 'react-icons/fi';
import { useModal } from '../../../hooks/useModal';

const PromotionsContainer = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: white;
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

const PromotionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing['2xl']};
  margin-bottom: ${props => props.theme.spacing['2xl']};
`;

const PromotionCard = styled(motion.div)`
  background: ${props => props.gradient || 'white'};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing['2xl']};
  position: relative;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.lg};
  color: ${props => props.textColor || props.theme.colors.dark};
  border: 1px solid rgba(0, 0, 0, 0.05);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.overlay || 'transparent'};
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 2;
  }
`;

const PromotionBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  background: ${props => props.badgeBg || 'rgba(255, 255, 255, 0.2)'};
  backdrop-filter: blur(10px);
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 600;
  margin-bottom: ${props => props.theme.spacing.lg};
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const PromotionTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes['2xl']};
  margin-bottom: ${props => props.theme.spacing.md};
  font-weight: 700;
`;

const PromotionDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.md};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.lg};
  opacity: 0.9;
`;

const PromotionPrice = styled.div`
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: 700;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const PromotionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  background: ${props => props.buttonBg || 'white'};
  color: ${props => props.buttonColor || props.theme.colors.primary};
  border: none;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const CTA = styled(motion.div)`
  text-align: center;
  background: ${props => props.theme.colors.light};
  padding: ${props => props.theme.spacing['2xl']};
  border-radius: ${props => props.theme.borderRadius.xl};
  margin-top: ${props => props.theme.spacing['2xl']};
`;

const CTATitle = styled.h3`
  font-size: ${props => props.theme.fontSizes['2xl']};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const CTADescription = styled.p`
  color: ${props => props.theme.colors.gray};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const CTAButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.gradient};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const Promotions = () => {
  const { openModal } = useModal();

  const promotions = [
    {
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      textColor: 'white',
      badgeBg: 'rgba(255, 255, 255, 0.2)',
      buttonBg: 'white',
      buttonColor: '#667eea',
      icon: <FiPercent />,
      badge: 'Скидка 30%',
      title: 'Кухня в рассрочку 0%',
      description: 'Оформите кухню в рассрочку без переплат на 12 месяцев. Первый взнос всего 30% от стоимости.',
      price: 'от 15 000 ₽/мес',
      action: 'Оформить рассрочку'
    },
    {
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      textColor: 'white',
      badgeBg: 'rgba(255, 255, 255, 0.2)',
      buttonBg: 'white',
      buttonColor: '#f5576c',
      icon: <FiGift />,
      badge: 'Подарок',
      title: 'Фартук в подарок',
      description: 'При заказе кухни получайте фартук из керамогранита или стекла в подарок. Экономия до 50 000 рублей.',
      price: 'до 50 000 ₽',
      action: 'Получить подарок'
    },
    {
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      textColor: 'white',
      badgeBg: 'rgba(255, 255, 255, 0.2)',
      buttonBg: 'white',
      buttonColor: '#4facfe',
      icon: <FiClock />,
      badge: 'Ограничено',
      title: 'Быстрая доставка',
      description: 'Закажите кухню до конца месяца и получите бесплатную доставку и монтаж в течение 7 дней.',
      price: 'Бесплатно',
      action: 'Заказать сейчас'
    }
  ];

  return (
    <PromotionsContainer>
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Акции и скидки
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Специальные предложения для наших клиентов
          </SectionSubtitle>
        </SectionHeader>

        <PromotionsGrid>
          {promotions.map((promotion, index) => (
            <PromotionCard
              key={index}
              gradient={promotion.gradient}
              textColor={promotion.textColor}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <PromotionBadge badgeBg={promotion.badgeBg}>
                {promotion.icon}
                {promotion.badge}
              </PromotionBadge>
              
              <PromotionTitle>{promotion.title}</PromotionTitle>
              
              <PromotionDescription>{promotion.description}</PromotionDescription>
              
              <PromotionPrice>{promotion.price}</PromotionPrice>
              
              <PromotionButton
                buttonBg={promotion.buttonBg}
                buttonColor={promotion.buttonColor}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openModal('installment')}
              >
                {promotion.action}
                <FiArrowRight />
              </PromotionButton>
            </PromotionCard>
          ))}
        </PromotionsGrid>

        <CTA
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <CTATitle>Не нашли подходящую акцию?</CTATitle>
          <CTADescription>
            Свяжитесь с нами, и мы подберем индивидуальное предложение специально для вас
          </CTADescription>
          <CTAButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openModal('callback')}
          >
            Получить консультацию
            <FiArrowRight />
          </CTAButton>
        </CTA>
      </Container>
    </PromotionsContainer>
  );
};

export default Promotions;
