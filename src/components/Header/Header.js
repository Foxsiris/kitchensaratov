import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { FiMenu, FiX, FiPhone, FiMail } from 'react-icons/fi';
import { useModal } from '../../hooks/useModal';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${props => props.scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
  transition: ${props => props.theme.transitions.normal};
  border-bottom: ${props => props.scrolled ? `1px solid ${props.theme.colors.light}` : 'none'};
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.md} 0;
  max-width: 1600px;
  margin: 0 auto;
  padding-left: ${props => props.theme.spacing.xl};
  padding-right: ${props => props.theme.spacing.xl};
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.large}) {
    max-width: 1400px;
    padding-left: ${props => props.theme.spacing.lg};
    padding-right: ${props => props.theme.spacing.lg};
    gap: ${props => props.theme.spacing.lg};
  }

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    max-width: 1200px;
    padding-left: ${props => props.theme.spacing.md};
    padding-right: ${props => props.theme.spacing.md};
    gap: ${props => props.theme.spacing.md};
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding-left: ${props => props.theme.spacing.sm};
    padding-right: ${props => props.theme.spacing.sm};
    gap: ${props => props.theme.spacing.sm};
  }
`;

const Logo = styled(Link)`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
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

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xl};
  flex: 1;
  justify-content: center;

  @media (max-width: ${props => props.theme.breakpoints.large}) {
    gap: ${props => props.theme.spacing.lg};
  }

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    gap: ${props => props.theme.spacing.md};
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.dark};
  font-weight: 500;
  text-decoration: none;
  position: relative;
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &.active::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.theme.colors.gradient};
    border-radius: ${props => props.theme.borderRadius.full};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
  flex-shrink: 0;

  @media (max-width: ${props => props.theme.breakpoints.large}) {
    gap: ${props => props.theme.spacing.md};
  }

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    gap: ${props => props.theme.spacing.sm};
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.dark};
  text-decoration: none;
  font-size: ${props => props.theme.fontSizes.sm};
  transition: ${props => props.theme.transitions.fast};
  white-space: nowrap;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    font-size: ${props => props.theme.fontSizes.xs};
    gap: ${props => props.theme.spacing.xs};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  flex-shrink: 0;

  @media (max-width: ${props => props.theme.breakpoints.large}) {
    gap: ${props => props.theme.spacing.sm};
  }

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    gap: ${props => props.theme.spacing.xs};
  }
`;

const Button = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 500;
  font-size: ${props => props.theme.fontSizes.sm};
  transition: ${props => props.theme.transitions.fast};
  cursor: pointer;
  white-space: nowrap;

  &.primary {
    background: ${props => props.theme.colors.gradient};
    color: white;
    border: none;
  }

  &.secondary {
    background: transparent;
    color: ${props => props.theme.colors.primary};
    border: 2px solid ${props => props.theme.colors.primary};
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
    font-size: ${props => props.theme.fontSizes.xs};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.dark};
  cursor: pointer;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.xl};
`;

const MobileNavLink = styled(Link)`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: 500;
  color: ${props => props.theme.colors.dark};
  text-decoration: none;
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing.xl};
  right: ${props => props.theme.spacing.xl};
  background: none;
  border: none;
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.dark};
  cursor: pointer;
`;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openModal } = useModal();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Главная' },
    { path: '/catalog', label: 'Каталог' },
    { path: '/about', label: 'О компании' },
    { path: '/salons', label: 'Салоны' },
  ];

  return (
    <>
      <HeaderContainer
        scrolled={scrolled}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <HeaderContent>
          <Logo to="/">
            <LogoIcon>К</LogoIcon>
            Кухни Саратов
          </Logo>

          <Nav>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
              >
                {item.label}
              </NavLink>
            ))}
          </Nav>

          <ContactInfo>
            <ContactItem href="tel:+79000000000">
              <FiPhone />
              +7 (900) 000-00-00
            </ContactItem>
            <ContactItem href="mailto:info@kitchensaratov.ru">
              <FiMail />
              info@kitchensaratov.ru
            </ContactItem>
          </ContactInfo>

          <ActionButtons>
            <Button 
              className="secondary" 
              onClick={() => openModal('callback')}
            >
              Обратный звонок
            </Button>
            <Button 
              className="primary"
              onClick={() => openModal('installment')}
            >
              Рассрочка
            </Button>
          </ActionButtons>

          <MobileMenuButton onClick={() => setMobileMenuOpen(true)}>
            <FiMenu />
          </MobileMenuButton>
        </HeaderContent>
      </HeaderContainer>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CloseButton onClick={() => setMobileMenuOpen(false)}>
              <FiX />
            </CloseButton>
            
            {navItems.map((item) => (
              <MobileNavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </MobileNavLink>
            ))}
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <Button 
                className="secondary" 
                onClick={() => {
                  openModal('callback');
                  setMobileMenuOpen(false);
                }}
              >
                Обратный звонок
              </Button>
              <Button 
                className="primary"
                onClick={() => {
                  openModal('installment');
                  setMobileMenuOpen(false);
                }}
              >
                Рассрочка
              </Button>
            </div>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
