import React, { useState, useCallback } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FiMenu, FiX } from 'react-icons/fi';
import ScrollToTop from '../../components/ScrollToTop';
import { ToastContainer, ToastItem } from './AdminUI';

const Wrapper = styled.div`
  min-height: 100vh;
  background: ${(p) => p.theme.colors.light};
  padding-top: 56px;
`;

const TopBar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  background: ${(p) => p.theme.colors.primary};
  color: ${(p) => p.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 200;
`;

const Logo = styled(Link)`
  font-family: ${(p) => p.theme.fonts.secondary};
  font-size: ${(p) => p.theme.fontSizes.lg};
  font-weight: 400;
  color: ${(p) => p.theme.colors.white};
  text-decoration: none;
  white-space: nowrap;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing.lg};

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${(p) => p.theme.colors.white};
  text-decoration: none;
  font-size: ${(p) => p.theme.fontSizes.sm};
  opacity: ${(p) => (p.$active ? 1 : 0.7)};
  border-bottom: 2px solid ${(p) => (p.$active ? p.theme.colors.white : 'transparent')};
  padding-bottom: 2px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const Burger = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${(p) => p.theme.colors.white};
  font-size: 22px;
  cursor: pointer;
  padding: 4px;

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    display: flex;
    align-items: center;
  }
`;

const MobileOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 299;
`;

const MobileDrawer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 260px;
  background: ${(p) => p.theme.colors.white};
  z-index: 300;
  display: flex;
  flex-direction: column;
  padding: ${(p) => p.theme.spacing.xl};
  gap: ${(p) => p.theme.spacing.lg};
`;

const DrawerClose = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: ${(p) => p.theme.colors.primary};
  padding: 4px;
`;

const DrawerLink = styled(Link)`
  font-size: ${(p) => p.theme.fontSizes.lg};
  color: ${(p) => p.theme.colors.primary};
  text-decoration: none;
  font-weight: ${(p) => (p.$active ? 600 : 400)};

  &:hover {
    opacity: 0.7;
  }
`;

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    padding: 16px 12px;
  }
`;

let toastIdCounter = 0;

const AdminLayout = () => {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message) => {
    const id = ++toastIdCounter;
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  const links = [
    { to: '/admin', label: 'Обзор', exact: true },
    { to: '/admin/categories', label: 'Категории' },
    { to: '/', label: 'На сайт →' },
  ];

  const isActive = (link) =>
    link.exact ? location.pathname === link.to : location.pathname.startsWith(link.to);

  return (
    <Wrapper>
      <ScrollToTop />
      <TopBar>
        <Logo to="/admin">Админ-панель</Logo>
        <Nav>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} $active={isActive(l)}>
              {l.label}
            </NavLink>
          ))}
        </Nav>
        <Burger onClick={() => setDrawerOpen(true)}>
          <FiMenu />
        </Burger>
      </TopBar>

      {drawerOpen && (
        <>
          <MobileOverlay onClick={() => setDrawerOpen(false)} />
          <MobileDrawer>
            <DrawerClose onClick={() => setDrawerOpen(false)}>
              <FiX />
            </DrawerClose>
            {links.map((l) => (
              <DrawerLink
                key={l.to}
                to={l.to}
                $active={isActive(l)}
                onClick={() => setDrawerOpen(false)}
              >
                {l.label}
              </DrawerLink>
            ))}
          </MobileDrawer>
        </>
      )}

      <Main>
        <Outlet context={{ showToast }} />
      </Main>

      <ToastContainer>
        {toasts.map((t) => (
          <ToastItem key={t.id}>{t.message}</ToastItem>
        ))}
      </ToastContainer>
    </Wrapper>
  );
};

export default AdminLayout;
