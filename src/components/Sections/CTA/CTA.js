import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { useModal } from '../../../hooks/useModal';

const CTAOuter = styled.div`
  padding: 0 ${props => props.theme.spacing.xl} ${props => props.theme.spacing['3xl']};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 ${props => props.theme.spacing.md} ${props => props.theme.spacing['2xl']};
  }
`;

const CTAContainer = styled.section`
  padding: ${props => props.theme.spacing['5xl']} 0;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  position: relative;
  overflow: hidden;
  border-radius: 24px;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  position: relative;
  z-index: 2;
`;

const CTAContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing['4xl']};
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing['2xl']};
    text-align: center;
  }
`;

const CTAText = styled.div``;

const Overline = styled(motion.div)`
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const CTATitle = styled(motion.h2)`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: ${props => props.theme.fontSizes['4xl']};
  font-weight: 400;
  color: ${props => props.theme.colors.white};
  margin-bottom: ${props => props.theme.spacing.lg};
  line-height: 1.2;
  letter-spacing: -0.02em;
`;

const CTADescription = styled(motion.p)`
  font-size: ${props => props.theme.fontSizes.md};
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: ${props => props.theme.spacing['2xl']};
  max-width: 480px;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin: 0 auto ${props => props.theme.spacing['2xl']};
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  flex-wrap: wrap;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    justify-content: center;
  }
`;

const PrimaryButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    background: transparent;
    color: ${props => props.theme.colors.white};
  }
`;

const SecondaryButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  background: transparent;
  color: ${props => props.theme.colors.white};
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    border-color: ${props => props.theme.colors.white};
  }
`;

const ContactInfo = styled(motion.div)`
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: ${props => props.theme.spacing['2xl']};
`;

const ContactTitle = styled.h3`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: 400;
  color: ${props => props.theme.colors.white};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  transition: ${props => props.theme.transitions.fast};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    padding-left: ${props => props.theme.spacing.lg};
  }
`;

const ContactIcon = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes.md};
  flex-shrink: 0;
`;

const ContactDetails = styled.div`
  flex: 1;
`;

const ContactLabel = styled.div`
  font-size: ${props => props.theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 2px;
`;

const ContactValue = styled.div`
  font-weight: 400;
  font-size: ${props => props.theme.fontSizes.md};
  color: ${props => props.theme.colors.white};
`;

const CTA = () => {
  const { openModal } = useModal();

  const contactItems = [
    {
      icon: <FiPhone size={16} />,
      label: 'Телефон',
      value: '+7 (900) 000-00-00'
    },
    {
      icon: <FiMail size={16} />,
      label: 'Email',
      value: 'info@kitchensaratov.ru'
    },
    {
      icon: <FiMapPin size={16} />,
      label: 'Адрес',
      value: 'г. Саратов, ул. Примерная, 123'
    }
  ];

  return (
    <CTAOuter>
    <CTAContainer>
      <Container>
        <CTAContent>
          <CTAText>
            <Overline
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Свяжитесь с нами
            </Overline>

            <CTATitle
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Готовы создать кухню мечты?
            </CTATitle>
            
            <CTADescription
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Свяжитесь с нами и получите бесплатную консультацию 
              от наших дизайнеров. Мы поможем воплотить ваши идеи в жизнь.
            </CTADescription>
            
            <ButtonGroup
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <PrimaryButton
                whileTap={{ scale: 0.98 }}
                onClick={() => openModal('callback')}
              >
                Узнать стоимость
                <FiArrowRight size={14} />
              </PrimaryButton>
              <SecondaryButton
                whileTap={{ scale: 0.98 }}
                onClick={() => openModal('callback')}
              >
                Заказать звонок
              </SecondaryButton>
            </ButtonGroup>
          </CTAText>

          <ContactInfo
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ContactTitle>Контакты</ContactTitle>
            <ContactList>
              {contactItems.map((item, index) => (
                <ContactItem key={index}>
                  <ContactIcon>
                    {item.icon}
                  </ContactIcon>
                  <ContactDetails>
                    <ContactLabel>{item.label}</ContactLabel>
                    <ContactValue>{item.value}</ContactValue>
                  </ContactDetails>
                </ContactItem>
              ))}
            </ContactList>
          </ContactInfo>
        </CTAContent>
      </Container>
    </CTAContainer>
    </CTAOuter>
  );
};

export default CTA;
