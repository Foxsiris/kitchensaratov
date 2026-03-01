import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { FiMenu, FiX, FiPhone, FiArrowUpRight } from 'react-icons/fi';
import { useModal } from '../../hooks/useModal';

/* ============================
   HEADER
   ============================ */
const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${p => p.$scrolled ? 'rgba(255, 255, 255, 0.97)' : 'transparent'};
  backdrop-filter: ${p => p.$scrolled ? 'blur(20px)' : 'none'};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: ${p => p.$scrolled ? '1px solid rgba(0, 0, 0, 0.06)' : '1px solid transparent'};
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${p => p.theme.spacing.lg} 0;
  max-width: 1400px;
  margin: 0 auto;
  padding-left: ${p => p.theme.spacing.xl};
  padding-right: ${p => p.theme.spacing.xl};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: 14px 0;
    padding-left: 16px;
    padding-right: 16px;
  }
`;

const Logo = styled(Link)`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes['2xl']};
  font-weight: 400;
  color: ${p => (p.$onDark ? p.theme.colors.white : p.theme.colors.primary)};
  text-decoration: none;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  gap: ${p => p.theme.spacing.sm};
  white-space: nowrap;

  &:hover { opacity: 1; }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes.xl};
  }
`;

const LogoAccent = styled.span`
  font-weight: 600;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${p => p.theme.spacing['2xl']};

  @media (max-width: ${p => p.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${p => (p.$onDark ? p.theme.colors.white : p.theme.colors.primary)};
  font-weight: 400;
  font-size: ${p => p.theme.fontSizes.sm};
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  position: relative;
  padding-bottom: 2px;
  transition: ${p => p.theme.transitions.fast};

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: ${p => (p.$onDark ? p.theme.colors.white : p.theme.colors.primary)};
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover::after,
  &.active::after {
    width: 100%;
  }

  &:hover { opacity: 1; }
`;

/* Nav item wrapper for dropdown trigger */
const NavItemWrapper = styled.div`
  position: relative;
`;

const NavTrigger = styled(Link)`
  color: ${p => (p.$onDark ? p.theme.colors.white : p.theme.colors.primary)};
  font-weight: 400;
  font-size: ${p => p.theme.fontSizes.sm};
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  position: relative;
  padding-bottom: 2px;
  cursor: pointer;
  transition: ${p => p.theme.transitions.fast};

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: ${p => (p.$onDark ? p.theme.colors.white : p.theme.colors.primary)};
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover::after,
  &.active::after {
    width: 100%;
  }
`;

/* ============================
   MEGA DROPDOWN
   ============================ */
const DropdownOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 998;
`;

const MegaDropdown = styled(motion.div)`
  position: absolute;
  top: calc(100% + 18px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  background: ${p => p.theme.colors.white};
  border: 1px solid ${p => p.theme.colors.border};
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.12);
  width: 720px;
  display: grid;
  grid-template-columns: 1fr 280px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -18px;
    left: 0;
    right: 0;
    height: 18px;
  }
`;

/* Left: categories grid */
const DropdownCategories = styled.div`
  padding: 32px 36px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

const CategoryItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 12px;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    background: ${p => p.theme.colors.light};
  }
`;

const CategoryThumb = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 6px;
  background: url(${p => p.$src}) center/cover no-repeat;
  flex-shrink: 0;
`;

const CategoryLabel = styled.span`
  font-family: ${p => p.theme.fonts.primary};
  font-size: ${p => p.theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: ${p => p.theme.colors.primary};
`;

/* Right: featured item */
const DropdownFeatured = styled(Link)`
  position: relative;
  display: block;
  text-decoration: none;
  overflow: hidden;
  min-height: 360px;
`;

const FeaturedImage = styled.div`
  position: absolute;
  inset: 0;
  background: url(${p => p.$src}) center/cover no-repeat;
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  ${DropdownFeatured}:hover & {
    transform: scale(1.05);
  }
`;

const FeaturedOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 100%);
`;

const FeaturedContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  z-index: 2;
`;

const FeaturedTitle = styled.div`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes.lg};
  font-weight: 400;
  color: ${p => p.theme.colors.white};
  line-height: 1.3;
  margin-bottom: 6px;
`;

const FeaturedTag = styled.span`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${p => p.theme.colors.primary};
  background: ${p => p.theme.colors.white};
  padding: 6px 12px;
  z-index: 3;
`;

const FeaturedArrow = styled.div`
  position: absolute;
  bottom: 56px;
  right: 20px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${p => p.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p => p.theme.colors.primary};
  z-index: 3;
  transition: transform 0.3s;

  ${DropdownFeatured}:hover & {
    transform: scale(1.1);
  }
`;

/* ============================
   RIGHT SECTION / MOBILE
   ============================ */
const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${p => p.theme.spacing.lg};

  @media (max-width: ${p => p.theme.breakpoints.tablet}) {
    gap: ${p => p.theme.spacing.md};
  }
`;

const PhoneLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${p => p.theme.spacing.sm};
  color: ${p => (p.$onDark ? p.theme.colors.white : p.theme.colors.primary)};
  text-decoration: none;
  font-size: ${p => p.theme.fontSizes.sm};
  font-weight: 500;
  letter-spacing: 0.02em;
  white-space: nowrap;
  transition: ${p => p.theme.transitions.fast};

  &:hover { opacity: 0.7; }

  @media (max-width: ${p => p.theme.breakpoints.desktop}) {
    display: none;
  }
`;

const CTAButton = styled.button`
  padding: ${p => p.theme.spacing.sm} ${p => p.theme.spacing.lg};
  background: ${p => (p.$onDark ? 'rgba(255, 255, 255, 0.12)' : p.theme.colors.primary)};
  color: ${p => p.theme.colors.white};
  border: 1px solid ${p => (p.$onDark ? 'rgba(255, 255, 255, 0.35)' : p.theme.colors.primary)};
  font-size: ${p => p.theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  cursor: pointer;
  transition: ${p => p.theme.transitions.fast};

  &:hover {
    background: ${p => (p.$onDark ? p.theme.colors.white : 'transparent')};
    color: ${p => p.theme.colors.primary};
  }

  @media (max-width: ${p => p.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${p => (p.$onDark ? p.theme.colors.white : p.theme.colors.primary)};
  cursor: pointer;
  padding: ${p => p.theme.spacing.xs};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  @media (max-width: ${p => p.theme.breakpoints.tablet}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: 4px;
    font-size: 24px;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${p => p.theme.colors.white};
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${p => p.theme.spacing.xl};
  padding: ${p => p.theme.spacing.xl};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    gap: ${p => p.theme.spacing.lg};
    padding: ${p => p.theme.spacing.lg};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${p => p.theme.spacing.lg};
  right: ${p => p.theme.spacing.xl};
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${p => p.theme.colors.primary};
  cursor: pointer;
  padding: ${p => p.theme.spacing.sm};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    top: 16px;
    right: 16px;
    font-size: 28px;
    padding: 4px;
  }
`;

const MobileNavLink = styled(Link)`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes['3xl']};
  font-weight: 400;
  color: ${p => p.theme.colors.primary};
  text-decoration: none;
  transition: ${p => p.theme.transitions.fast};
  letter-spacing: -0.01em;

  &:hover { opacity: 0.5; }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes['2xl']};
  }
`;

const MobileButton = styled.button`
  padding: ${p => p.theme.spacing.md} ${p => p.theme.spacing['2xl']};
  background: ${p => p.theme.colors.primary};
  color: ${p => p.theme.colors.white};
  border: 1px solid ${p => p.theme.colors.primary};
  font-size: ${p => p.theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  cursor: pointer;
  margin-top: ${p => p.theme.spacing.xl};
  transition: ${p => p.theme.transitions.fast};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: transparent;
    color: ${p => p.theme.colors.primary};
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: ${p => p.theme.spacing.lg} ${p => p.theme.spacing.xl};
    font-size: 11px;
    margin-top: ${p => p.theme.spacing.lg};
  }
`;

const MobilePhone = styled.a`
  font-size: ${p => p.theme.fontSizes.md};
  color: ${p => p.theme.colors.gray};
  text-decoration: none;
  letter-spacing: 0.05em;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes.sm};
  }
`;

/* ============================
   DATA
   ============================ */
const catalogCategories = [
  { label: 'Кухни', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80', link: '/catalog?category=kitchens' },
  { label: 'Гардеробные', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80', link: '/catalog?category=wardrobes' },
  { label: 'Шкафы', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80', link: '/catalog?category=cabinets' },
  { label: 'Комоды', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80', link: '/catalog?category=dressers' },
  { label: 'Столы', image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80', link: '/catalog?category=tables' },
  { label: 'Стулья', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80', link: '/catalog?category=chairs' },
];

const featuredItem = {
  title: 'Кухня Луна от Рими',
  tag: 'Рекомендуем',
  image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  link: '/product/rimi-luna',
};

/* ============================
   COMPONENT
   ============================ */
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const { openModal } = useModal();
  const dropdownTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Close dropdown on route change */
  useEffect(() => {
    setDropdownOpen(false);
  }, [location.pathname]);

  const handleDropdownEnter = () => {
    clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  const navItems = [
    { path: '/', label: 'Главная' },
    { path: '/catalog', label: 'Каталог', hasDropdown: true },
    { path: '/about', label: 'О нас' },
  ];

  const onDarkHero = location.pathname === '/' && !scrolled;

  return (
    <>
      <HeaderContainer
        $scrolled={scrolled}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <HeaderContent>
          <Logo to="/" $onDark={onDarkHero}>
            Кухни <LogoAccent>Саратов</LogoAccent>
          </Logo>

          <Nav>
            {navItems.map((item) =>
              item.hasDropdown ? (
                <NavItemWrapper
                  key={item.path}
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  <NavTrigger
                    to={item.path}
                    $onDark={onDarkHero}
                    className={location.pathname === item.path ? 'active' : ''}
                    onClick={() => setDropdownOpen(false)}
                  >
                    {item.label}
                  </NavTrigger>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <MegaDropdown
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                      >
                        <DropdownCategories>
                          {catalogCategories.map((cat) => (
                            <CategoryItem
                              key={cat.label}
                              to={cat.link}
                              onClick={() => setDropdownOpen(false)}
                            >
                              <CategoryThumb $src={cat.image} />
                              <CategoryLabel>{cat.label}</CategoryLabel>
                            </CategoryItem>
                          ))}
                        </DropdownCategories>

                        <DropdownFeatured
                          to={featuredItem.link}
                          onClick={() => setDropdownOpen(false)}
                        >
                          <FeaturedImage $src={featuredItem.image} />
                          <FeaturedOverlay />
                          <FeaturedContent>
                            <FeaturedTitle>{featuredItem.title}</FeaturedTitle>
                          </FeaturedContent>
                          <FeaturedArrow>
                            <FiArrowUpRight size={16} />
                          </FeaturedArrow>
                          <FeaturedTag>{featuredItem.tag}</FeaturedTag>
                        </DropdownFeatured>
                      </MegaDropdown>
                    )}
                  </AnimatePresence>
                </NavItemWrapper>
              ) : (
                <NavLink
                  key={item.path}
                  to={item.path}
                  $onDark={onDarkHero}
                  className={location.pathname === item.path ? 'active' : ''}
                >
                  {item.label}
                </NavLink>
              )
            )}
          </Nav>

          <RightSection>
            <PhoneLink href="tel:+79000000000" $onDark={onDarkHero}>
              <FiPhone size={14} />
              +7 (900) 000-00-00
            </PhoneLink>

            <CTAButton $onDark={onDarkHero} onClick={() => openModal('callback')}>
              Оставить заявку
            </CTAButton>

            <MobileMenuButton $onDark={onDarkHero} onClick={() => setMobileMenuOpen(true)}>
              <FiMenu />
            </MobileMenuButton>
          </RightSection>
        </HeaderContent>
      </HeaderContainer>

      {/* Overlay to close dropdown when clicking outside */}
      <AnimatePresence>
        {dropdownOpen && (
          <DropdownOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDropdownOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
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

            <MobileButton
              onClick={() => {
                openModal('callback');
                setMobileMenuOpen(false);
              }}
            >
              Оставить заявку
            </MobileButton>

            <MobilePhone href="tel:+79000000000">
              +7 (900) 000-00-00
            </MobilePhone>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
