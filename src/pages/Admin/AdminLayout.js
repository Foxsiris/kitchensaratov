import React, { useState, useCallback } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import ScrollToTop from '../../components/ScrollToTop';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, ToastItemWrap, ToastItem, ToastClose } from './AdminUI';

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

const overlayFadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const drawerSlideIn = keyframes`
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
`;

const MobileOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 299;
  animation: ${overlayFadeIn} 0.2s ease forwards;
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
  animation: ${drawerSlideIn} 0.25s ease-out forwards;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
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

const LogoutBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: ${(p) => p.theme.colors.white};
  font-size: ${(p) => p.theme.fontSizes.sm};
  opacity: 0.7;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const DrawerLogout = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: #c00;
  font-size: ${(p) => p.theme.fontSizes.lg};
  cursor: pointer;
  padding: 0;
  margin-top: auto;
`;

const AdminLayout = () => {
  const location = useLocation();
  const { authenticated, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((toastId) => {
    setToasts((prev) => prev.filter((t) => t.id !== toastId));
  }, []);

  const showToast = useCallback((message, { type = 'success', duration = 3000 } = {}) => {
    const id = ++toastIdCounter;
    setToasts((prev) => [...prev, { id, message, type }]);
    if (duration > 0) {
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), duration);
    }
  }, []);

  if (!authenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const links = [
    { to: '/admin', label: 'Обзор', exact: true },
    { to: '/admin/categories', label: 'Категории' },
    { to: '/admin/brands', label: 'Бренды' },
    { to: '/', label: 'На сайт →' },
  ];

  const isActive = (link) =>
    link.exact ? location.pathname === link.to : location.pathname.startsWith(link.to);

  return (
    <Wrapper>
      <ScrollToTop />
      <TopBar>
        <Logo to="/admin">Панель администрирования</Logo>
        <Nav>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} $active={isActive(l)}>
              {l.label}
            </NavLink>
          ))}
          <LogoutBtn onClick={logout}>
            <FiLogOut size={14} /> Выход
          </LogoutBtn>
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
            <DrawerLogout onClick={logout}>
              <FiLogOut size={16} /> Выйти
            </DrawerLogout>
          </MobileDrawer>
        </>
      )}

      <Main>
        <Outlet context={{ showToast }} />
      </Main>

      <ToastContainer>
        {toasts.map((t) => (
          <ToastItemWrap key={t.id} $type={t.type}>
            <ToastItem>{t.message}</ToastItem>
            <ToastClose type="button" onClick={() => removeToast(t.id)} aria-label="Закрыть">
              ×
            </ToastClose>
          </ToastItemWrap>
        ))}
      </ToastContainer>
    </Wrapper>
  );
};

export default AdminLayout;
