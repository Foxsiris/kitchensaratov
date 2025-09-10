import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { 
  FiPhone, 
  FiMail, 
  FiMapPin, 
  FiClock,
  FiFacebook,
  FiInstagram,
  FiYoutube
} from 'react-icons/fi';

const FooterContainer = styled.footer`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing['4xl']} 0 ${props => props.theme.spacing.xl};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: ${props => props.theme.spacing['2xl']};
  margin-bottom: ${props => props.theme.spacing['2xl']};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
  }
`;

const FooterSection = styled.div`
  h3 {
    color: ${props => props.theme.colors.white};
    margin-bottom: ${props => props.theme.spacing.lg};
    font-size: ${props => props.theme.fontSizes.lg};
  }
`;

const Logo = styled.div`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: 700;
  margin-bottom: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${props => props.theme.colors.gradient};
  border-radius: ${props => props.theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

const Description = styled.p`
  color: ${props => props.theme.colors.light};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.light};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const ContactLink = styled.a`
  color: ${props => props.theme.colors.light};
  text-decoration: none;
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

const FooterLink = styled(Link)`
  display: block;
  color: ${props => props.theme.colors.light};
  text-decoration: none;
  margin-bottom: ${props => props.theme.spacing.sm};
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    background: ${props => props.theme.colors.accent};
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: ${props => props.theme.spacing.xl};
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
  color: ${props => props.theme.colors.light};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const FooterLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.sm};
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterTop>
          <FooterSection>
            <Logo>
              <LogoIcon>К</LogoIcon>
              Кухни Саратов
            </Logo>
            <Description>
              Создаем кухни мечты уже более 10 лет. Качественные материалы, 
              индивидуальный подход и доступные цены.
            </Description>
            <SocialLinks>
              <SocialLink href="#" aria-label="Facebook">
                <FiFacebook />
              </SocialLink>
              <SocialLink href="#" aria-label="Instagram">
                <FiInstagram />
              </SocialLink>
              <SocialLink href="#" aria-label="YouTube">
                <FiYoutube />
              </SocialLink>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <h3>Навигация</h3>
            <FooterLink to="/">Главная</FooterLink>
            <FooterLink to="/catalog">Каталог</FooterLink>
            <FooterLink to="/about">О компании</FooterLink>
            <FooterLink to="/salons">Салоны</FooterLink>
          </FooterSection>

          <FooterSection>
            <h3>Услуги</h3>
            <FooterLink to="/catalog">Дизайн кухни</FooterLink>
            <FooterLink to="/catalog">Изготовление</FooterLink>
            <FooterLink to="/catalog">Доставка и монтаж</FooterLink>
            <FooterLink to="/catalog">Гарантия</FooterLink>
          </FooterSection>

          <FooterSection>
            <h3>Контакты</h3>
            <ContactItem>
              <FiPhone />
              <ContactLink href="tel:+79000000000">+7 (900) 000-00-00</ContactLink>
            </ContactItem>
            <ContactItem>
              <FiMail />
              <ContactLink href="mailto:info@kitchensaratov.ru">info@kitchensaratov.ru</ContactLink>
            </ContactItem>
            <ContactItem>
              <FiMapPin />
              <span>г. Саратов, ул. Примерная, 123</span>
            </ContactItem>
            <ContactItem>
              <FiClock />
              <span>Пн-Пт: 9:00-18:00, Сб-Вс: 10:00-16:00</span>
            </ContactItem>
          </FooterSection>
        </FooterTop>

        <FooterBottom>
          <Copyright>
            © 2024 Кухни Саратов. Все права защищены.
          </Copyright>
          <FooterLinks>
            <FooterLink to="/privacy">Политика конфиденциальности</FooterLink>
            <FooterLink to="/terms">Условия использования</FooterLink>
          </FooterLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
