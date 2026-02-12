import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useModal } from '../../../hooks/useModal';

const PromotionsContainer = styled.section`
  padding: ${props => props.theme.spacing['5xl']} 0;
  background: ${props => props.theme.colors.white};
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing['4xl']};
`;

const Overline = styled(motion.div)`
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: ${props => props.theme.colors.gray};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${props => props.theme.fontSizes['4xl']};
  color: ${props => props.theme.colors.primary};
  font-weight: 400;
  letter-spacing: -0.02em;
`;

const PromotionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
  }
`;

const PromotionCard = styled(motion.div)`
  background: ${props => props.$dark ? props.theme.colors.primary : props.theme.colors.light};
  color: ${props => props.$dark ? props.theme.colors.white : props.theme.colors.primary};
  padding: ${props => props.theme.spacing['2xl']};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 380px;
  transition: ${props => props.theme.transitions.normal};
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
  }
`;

const PromotionBadge = styled.div`
  display: inline-block;
  font-size: ${props => props.theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-weight: 500;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.$dark ? 'rgba(255,255,255,0.2)' : props.theme.colors.border};
  margin-bottom: ${props => props.theme.spacing.xl};
  align-self: flex-start;
`;

const PromotionTitle = styled.h3`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: 400;
  margin-bottom: ${props => props.theme.spacing.md};
  color: inherit;
  line-height: 1.3;
`;

const PromotionDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  line-height: 1.7;
  margin-bottom: ${props => props.theme.spacing.xl};
  opacity: 0.7;
  color: inherit;
  flex: 1;
`;

const PromotionPrice = styled.div`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: 400;
  margin-bottom: ${props => props.theme.spacing.lg};
  letter-spacing: -0.02em;
`;

const PromotionButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  background: transparent;
  color: inherit;
  border: 1px solid ${props => props.$dark ? 'rgba(255,255,255,0.3)' : props.theme.colors.primary};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  align-self: flex-start;

  &:hover {
    background: ${props => props.$dark ? props.theme.colors.white : props.theme.colors.primary};
    color: ${props => props.$dark ? props.theme.colors.primary : props.theme.colors.white};
    border-color: ${props => props.$dark ? props.theme.colors.white : props.theme.colors.primary};
  }
`;

const CTABanner = styled(motion.div)`
  margin-top: ${props => props.theme.spacing['3xl']};
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing['2xl']};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 999px;
  gap: ${props => props.theme.spacing.lg};
  overflow: hidden;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    text-align: left;
    gap: ${props => props.theme.spacing.lg};
    border-radius: 24px;
    padding: ${props => props.theme.spacing.xl};
  }
`;

const CTAText = styled.div`
  flex: 1;

  h3 {
    font-family: ${props => props.theme.fonts.primary};
    font-size: ${props => props.theme.fontSizes['3xl']};
    font-weight: 500;
    color: ${props => props.theme.colors.white};
    text-transform: uppercase;
    letter-spacing: 0.02em;
    line-height: 1.15;
    margin-bottom: 6px;

    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      font-size: ${props => props.theme.fontSizes['2xl']};
    }
  }

  p {
    color: rgba(255, 255, 255, 0.6);
    font-size: ${props => props.theme.fontSizes.sm};
    line-height: 1.5;
    margin-bottom: 0;
  }
`;

const CTAConsultantPill = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  padding: 10px 10px 10px 12px;
  flex-shrink: 0;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 100%;
    border-radius: 16px;
    justify-content: space-between;
  }
`;

const CTAAvatar = styled.img`
  width: 54px;
  height: 54px;
  border-radius: 999px;
  object-fit: cover;
  flex-shrink: 0;
`;

const CTAConsultantText = styled.div`
  min-width: 0;

  h4 {
    margin: 0;
    font-size: ${props => props.theme.fontSizes.xs};
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(255, 255, 255, 0.92);
    font-weight: 500;
    line-height: 1.3;
  }

  p {
    margin: 2px 0 0;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.58);
    line-height: 1.25;
  }
`;

const CTAActionButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  background: #0f6b56;
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: 999px;
  padding: 14px 18px;
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background: #0b5b49;
  }
`;

const Promotions = () => {
  const { openModal } = useModal();

  const promotions = [
    {
      dark: true,
      badge: 'Скидка 30%',
      title: 'Кухня в рассрочку 0%',
      description: 'Оформите кухню в рассрочку без переплат на 12 месяцев. Первый взнос всего 30%.',
      price: 'от 15 000 ₽/мес',
      action: 'Оформить'
    },
    {
      dark: false,
      badge: 'Подарок',
      title: 'Фартук в подарок',
      description: 'При заказе кухни получайте фартук из керамогранита или стекла в подарок.',
      price: 'до 50 000 ₽',
      action: 'Подробнее'
    },
    {
      dark: false,
      badge: 'Ограничено',
      title: 'Бесплатная доставка',
      description: 'Закажите кухню до конца месяца и получите бесплатную доставку и монтаж.',
      price: 'Бесплатно',
      action: 'Заказать'
    }
  ];

  return (
    <PromotionsContainer>
      <Container>
        <SectionHeader>
          <Overline
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Специальные предложения
          </Overline>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Акции и скидки
          </SectionTitle>
        </SectionHeader>

        <PromotionsGrid>
          {promotions.map((promotion, index) => (
            <PromotionCard
              key={index}
              $dark={promotion.dark}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div>
                <PromotionBadge $dark={promotion.dark}>
                  {promotion.badge}
                </PromotionBadge>
                <PromotionTitle>{promotion.title}</PromotionTitle>
                <PromotionDescription>{promotion.description}</PromotionDescription>
              </div>
              
              <div>
                <PromotionPrice>{promotion.price}</PromotionPrice>
                <PromotionButton
                  $dark={promotion.dark}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openModal('installment')}
                >
                  {promotion.action}
                  <FiArrowRight size={14} />
                </PromotionButton>
              </div>
            </PromotionCard>
          ))}
        </PromotionsGrid>

        <CTABanner
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <CTAText>
            <h3>Не нашли подходящую акцию?</h3>
            <p>Свяжитесь с нами для индивидуального предложения</p>
          </CTAText>
          <CTAConsultantPill>
            <CTAAvatar
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=160&q=80"
              alt="Консультант"
            />
            <CTAConsultantText>
              <h4>Каминская Жанна</h4>
              <p>Директор шоурума</p>
            </CTAConsultantText>
            <CTAActionButton
              whileTap={{ scale: 0.98 }}
              onClick={() => openModal('callback')}
            >
              Узнайте стоимость<br />вашей кухни
              <FiArrowRight size={14} />
            </CTAActionButton>
          </CTAConsultantPill>
        </CTABanner>
      </Container>
    </PromotionsContainer>
  );
};

export default Promotions;
