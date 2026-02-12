import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { 
  FiPhone, 
  FiMail, 
  FiMapPin, 
  FiClock,
  FiInstagram
} from 'react-icons/fi';

const FooterOuter = styled.div`
  padding: 0 ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.white};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`;

const FooterContainer = styled.footer`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing['4xl']} 0 ${props => props.theme.spacing.xl};
  border-radius: 24px;
  overflow: hidden;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: ${props => props.theme.spacing['3xl']};
  margin-bottom: ${props => props.theme.spacing['3xl']};
  padding-bottom: ${props => props.theme.spacing['3xl']};
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
    gap: ${props => props.theme.spacing.xl};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div``;

const SectionTitle = styled.h4`
  font-family: ${props => props.theme.fonts.primary};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Logo = styled.div`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: 400;
  margin-bottom: ${props => props.theme.spacing.lg};
  letter-spacing: -0.02em;
`;

const LogoAccent = styled.span`
  font-weight: 600;
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.4);
  line-height: 1.8;
  font-size: ${props => props.theme.fontSizes.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
  max-width: 360px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.primary};
    border-color: ${props => props.theme.colors.white};
    opacity: 1;
  }
`;

const FooterLink = styled(Link)`
  display: block;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  margin-bottom: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.fontSizes.sm};
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    color: ${props => props.theme.colors.white};
    opacity: 1;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};
  color: rgba(255, 255, 255, 0.5);
  font-size: ${props => props.theme.fontSizes.sm};

  svg {
    margin-top: 3px;
    flex-shrink: 0;
    color: rgba(255, 255, 255, 0.3);
  }
`;

const ContactLink = styled.a`
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    color: ${props => props.theme.colors.white};
    opacity: 1;
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: rgba(255, 255, 255, 0.3);
  font-size: ${props => props.theme.fontSizes.xs};
  letter-spacing: 0.02em;
  margin-bottom: 0;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.sm};
  }
`;

const BottomLink = styled(Link)`
  color: rgba(255, 255, 255, 0.3);
  text-decoration: none;
  font-size: ${props => props.theme.fontSizes.xs};
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    color: ${props => props.theme.colors.white};
    opacity: 1;
  }
`;

const Footer = () => {
  return (
    <FooterOuter>
    <FooterContainer>
      <FooterContent>
        <FooterTop>
          <FooterSection>
            <Logo>
              Кухни <LogoAccent>Саратов</LogoAccent>
            </Logo>
            <Description>
              Создаём кухни мечты уже более 10 лет. Качественные материалы, 
              индивидуальный подход и безупречный сервис.
            </Description>
            <SocialLinks>
              <SocialLink href="#" aria-label="Instagram">
                <FiInstagram size={16} />
              </SocialLink>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <SectionTitle>Навигация</SectionTitle>
            <FooterLink to="/">Главная</FooterLink>
            <FooterLink to="/catalog">Каталог</FooterLink>
            <FooterLink to="/about">О компании</FooterLink>
          </FooterSection>

          <FooterSection>
            <SectionTitle>Услуги</SectionTitle>
            <FooterLink to="/catalog">Дизайн кухни</FooterLink>
            <FooterLink to="/catalog">Изготовление</FooterLink>
            <FooterLink to="/catalog">Доставка и монтаж</FooterLink>
            <FooterLink to="/catalog">Гарантия</FooterLink>
          </FooterSection>

          <FooterSection>
            <SectionTitle>Контакты</SectionTitle>
            <ContactItem>
              <FiPhone size={14} />
              <ContactLink href="tel:+79000000000">+7 (900) 000-00-00</ContactLink>
            </ContactItem>
            <ContactItem>
              <FiMail size={14} />
              <ContactLink href="mailto:info@kitchensaratov.ru">info@kitchensaratov.ru</ContactLink>
            </ContactItem>
            <ContactItem>
              <FiMapPin size={14} />
              <span>г. Саратов, ул. Примерная, 123</span>
            </ContactItem>
            <ContactItem>
              <FiClock size={14} />
              <span>Пн-Пт: 9:00-18:00, Сб-Вс: 10:00-16:00</span>
            </ContactItem>
          </FooterSection>
        </FooterTop>

        <FooterBottom>
          <Copyright>
            &copy; 2024 Кухни Саратов. Все права защищены.
          </Copyright>
          <FooterLinks>
            <BottomLink to="/privacy">Политика конфиденциальности</BottomLink>
            <BottomLink to="/terms">Пользовательское соглашение</BottomLink>
          </FooterLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
    </FooterOuter>
  );
};

export default Footer;
