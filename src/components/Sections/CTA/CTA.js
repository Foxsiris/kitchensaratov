import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { useModal } from '../../../hooks/useModal';

const CTAContainer = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: ${props => props.theme.colors.primary};
  color: white;
  position: relative;
  overflow: hidden;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.05)"/><circle cx="10" cy="60" r="0.5" fill="rgba(255,255,255,0.05)"/><circle cx="90" cy="40" r="0.5" fill="rgba(255,255,255,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
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

const CTAText = styled.div`
  h2 {
    font-size: ${props => props.theme.fontSizes['4xl']};
    margin-bottom: ${props => props.theme.spacing.lg};
    line-height: 1.2;
  }

  p {
    font-size: ${props => props.theme.fontSizes.xl};
    line-height: 1.6;
    margin-bottom: ${props => props.theme.spacing['2xl']};
    opacity: 0.9;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  flex-wrap: wrap;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    justify-content: center;
  }
`;

const Button = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  font-size: ${props => props.theme.fontSizes.md};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  border: none;
  outline: none;

  &.primary {
    background: white;
    color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.shadows.lg};

    &:hover {
      transform: translateY(-2px);
      box-shadow: ${props => props.theme.shadows.xl};
    }
  }

  &.secondary {
    background: transparent;
    color: white;
    border: 2px solid white;

    &:hover {
      background: white;
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const ContactInfo = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: ${props => props.theme.spacing['2xl']};
  border-radius: ${props => props.theme.borderRadius.xl};
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ContactTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes['2xl']};
  margin-bottom: ${props => props.theme.spacing.lg};
  text-align: center;
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
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${props => props.theme.borderRadius.md};
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(5px);
  }
`;

const ContactIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${props => props.theme.colors.gradient};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${props => props.theme.fontSizes.lg};
`;

const ContactDetails = styled.div`
  flex: 1;
`;

const ContactLabel = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  opacity: 0.8;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const ContactValue = styled.div`
  font-weight: 600;
  font-size: ${props => props.theme.fontSizes.md};
`;

const CTA = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();

  const contactItems = [
    {
      icon: <FiPhone />,
      label: 'Телефон',
      value: '+7 (900) 000-00-00'
    },
    {
      icon: <FiMail />,
      label: 'Email',
      value: 'info@kitchensaratov.ru'
    },
    {
      icon: <FiMapPin />,
      label: 'Адрес',
      value: 'г. Саратов, ул. Примерная, 123'
    }
  ];

  return (
    <CTAContainer>
      <BackgroundPattern />
      <Container>
        <CTAContent>
          <CTAText>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Готовы создать кухню мечты?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Свяжитесь с нами прямо сейчас и получите бесплатную консультацию 
              от наших дизайнеров. Мы поможем воплотить ваши идеи в жизнь!
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <ButtonGroup>
                <Button
                  className="primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/calculator')}
                >
                  Рассчитать проект
                  <FiArrowRight />
                </Button>
                <Button
                  className="secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openModal('callback')}
                >
                  Заказать звонок
                </Button>
              </ButtonGroup>
            </motion.div>
          </CTAText>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <ContactInfo>
              <ContactTitle>Свяжитесь с нами</ContactTitle>
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
          </motion.div>
        </CTAContent>
      </Container>
    </CTAContainer>
  );
};

export default CTA;
