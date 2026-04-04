import styled, { css, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

/* ---- Page / Section ---- */

export const PageTitle = styled.h1`
  font-family: ${(p) => p.theme.fonts.secondary};
  font-size: ${(p) => p.theme.fontSizes['2xl']};
  font-weight: 400;
  margin: 0;
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${(p) => p.theme.spacing.md};
  margin-bottom: ${(p) => p.theme.spacing.xl};
`;

export const Card = styled.section`
  background: ${(p) => p.theme.colors.white};
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: 8px;
  padding: ${(p) => p.theme.spacing.xl};
  margin-bottom: ${(p) => p.theme.spacing.lg};

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    padding: ${(p) => p.theme.spacing.lg};
  }
`;

export const SectionTitle = styled.h2`
  font-family: ${(p) => p.theme.fonts.secondary};
  font-size: ${(p) => p.theme.fontSizes.lg};
  font-weight: 400;
  margin: 0 0 ${(p) => p.theme.spacing.lg};
`;

export const Text = styled.p`
  color: ${(p) => p.theme.colors.gray};
  font-size: ${(p) => p.theme.fontSizes.sm};
  margin: 0;
`;

/* ---- Form elements ---- */

export const Label = styled.label`
  display: block;
  font-size: ${(p) => p.theme.fontSizes.sm};
  font-weight: 500;
  margin-bottom: 4px;
  color: ${(p) => p.theme.colors.primary};
`;

const inputBase = css`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: 4px;
  font-size: ${(p) => p.theme.fontSizes.sm};
  font-family: inherit;
  margin-bottom: ${(p) => p.theme.spacing.md};
  box-sizing: border-box;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${(p) => p.theme.colors.primary};
  }
`;

export const Input = styled.input`
  ${inputBase}
`;

export const Textarea = styled.textarea`
  ${inputBase}
  min-height: 80px;
  resize: vertical;
`;

export const Select = styled.select`
  ${inputBase}
  background: ${(p) => p.theme.colors.white};
`;

export const FieldGroup = styled.div`
  margin-bottom: ${(p) => p.theme.spacing.sm};
`;

export const FormActions = styled.div`
  display: flex;
  gap: ${(p) => p.theme.spacing.md};
  margin-top: ${(p) => p.theme.spacing.lg};
  flex-wrap: wrap;
`;

/* ---- Buttons ---- */

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 20px;
  font-size: ${(p) => p.theme.fontSizes.sm};
  font-family: inherit;
  border: 1px solid
    ${(p) => (p.$variant === 'danger' ? '#c00' : p.theme.colors.primary)};
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
  white-space: nowrap;

  background: ${(p) =>
    p.$variant === 'secondary'
      ? 'transparent'
      : p.$variant === 'danger'
        ? '#c00'
        : p.theme.colors.primary};
  color: ${(p) =>
    p.$variant === 'secondary'
      ? p.theme.colors.primary
      : p.$variant === 'danger'
        ? p.theme.colors.white
        : p.theme.colors.white};

  &:hover {
    background: ${(p) =>
      p.$variant === 'secondary'
        ? p.theme.colors.primary
        : p.$variant === 'danger'
          ? '#a00'
          : 'transparent'};
    color: ${(p) =>
      p.$variant === 'secondary'
        ? p.theme.colors.white
        : p.$variant === 'danger'
          ? p.theme.colors.white
          : p.theme.colors.primary};
    border-color: ${(p) => (p.$variant === 'danger' ? '#a00' : p.theme.colors.primary)};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ButtonLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 20px;
  font-size: ${(p) => p.theme.fontSizes.sm};
  text-decoration: none;
  border: 1px solid ${(p) => p.theme.colors.primary};
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
  white-space: nowrap;

  background: ${(p) => (p.$variant === 'secondary' ? 'transparent' : p.theme.colors.primary)};
  color: ${(p) => (p.$variant === 'secondary' ? p.theme.colors.primary : p.theme.colors.white)};

  &:hover {
    background: ${(p) => (p.$variant === 'secondary' ? p.theme.colors.primary : 'transparent')};
    color: ${(p) => (p.$variant === 'secondary' ? p.theme.colors.white : p.theme.colors.primary)};
  }
`;

export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: 4px;
  background: ${(p) => p.theme.colors.white};
  color: ${(p) => p.theme.colors.gray};
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    border-color: #c00;
    color: #c00;
    background: #fff5f5;
  }
`;

export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${(p) => p.theme.colors.gray};
  text-decoration: none;
  font-size: ${(p) => p.theme.fontSizes.sm};
  margin-bottom: ${(p) => p.theme.spacing.lg};

  &:hover {
    color: ${(p) => p.theme.colors.primary};
  }
`;

/* ---- Toast ---- */

const slideIn = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
`;

const slideOut = keyframes`
  from { transform: translateX(0); opacity: 1; }
  to   { transform: translateX(100%); opacity: 0; }
`;

export const ToastContainer = styled.div`
  position: fixed;
  top: 72px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none;
`;

export const ToastItemWrap = styled.div`
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 12px 12px 20px;
  background: ${(p) =>
    p.$type === 'error' ? '#c0392b' : p.$type === 'success' ? '#27ae60' : p.theme.colors.primary};
  color: ${(p) => p.theme.colors.white};
  font-size: ${(p) => p.theme.fontSizes.sm};
  border-radius: 6px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  animation: ${slideIn} 0.3s ease forwards, ${slideOut} 0.3s ease 2.5s forwards;
`;

export const ToastItem = styled.span`
  flex: 1;
  min-width: 0;
`;

export const ToastClose = styled.button`
  flex-shrink: 0;
  background: none;
  border: none;
  color: inherit;
  opacity: 0.8;
  cursor: pointer;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  line-height: 1;

  &:hover {
    opacity: 1;
  }
`;

/* ---- Form validation ---- */

export const ErrorText = styled.span`
  display: block;
  color: #c00;
  font-size: ${(p) => p.theme.fontSizes.xs};
  margin-top: -12px;
  margin-bottom: ${(p) => p.theme.spacing.md};
  min-height: 16px;
`;

/* ---- Modal / Overlay ---- */

const adminModalBackdropIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const adminModalCardIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(14px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(16px, 4vw, 28px);
  background: rgba(15, 15, 15, 0.52);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  animation: ${adminModalBackdropIn} 0.28s cubic-bezier(0.4, 0, 0.2, 1) forwards;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }
`;

export const ModalCard = styled.div`
  background: ${(p) => p.theme.colors.white};
  border-radius: 20px;
  padding: ${(p) => p.theme.spacing.xl};
  width: 100%;
  max-width: ${(p) => p.$width || '520px'};
  max-height: min(90vh, 880px);
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.04),
    0 24px 64px rgba(0, 0, 0, 0.14),
    0 8px 24px rgba(0, 0, 0, 0.08);
  animation: ${adminModalCardIn} 0.32s cubic-bezier(0.34, 1.02, 0.32, 1) forwards;
  transform-origin: center center;
  -webkit-overflow-scrolling: touch;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.mobile}) {
    padding: ${(p) => p.theme.spacing.lg};
    border-radius: 18px;
    max-height: 92vh;
  }

  &:focus-visible {
    outline: 2px solid ${(p) => p.theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const ModalTitle = styled.h2`
  font-family: ${(p) => p.theme.fonts.secondary};
  font-size: ${(p) => p.theme.fontSizes.xl};
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.25;
  color: ${(p) => p.theme.colors.dark};
  margin: 0 0 ${(p) => p.theme.spacing.md};
  padding-bottom: ${(p) => p.theme.spacing.md};
  border-bottom: 1px solid ${(p) => p.theme.colors.border};
`;

export const ModalMessage = styled.p`
  color: ${(p) => p.theme.colors.grayDark};
  font-size: ${(p) => p.theme.fontSizes.sm};
  line-height: 1.6;
  margin: 0 0 ${(p) => p.theme.spacing.lg};
`;

export const ConfirmActions = styled.div`
  display: flex;
  gap: ${(p) => p.theme.spacing.md};
  justify-content: flex-end;
  flex-wrap: wrap;
`;

/* ---- Misc ---- */

export const Empty = styled.p`
  color: ${(p) => p.theme.colors.gray};
  font-size: ${(p) => p.theme.fontSizes.sm};
  text-align: center;
  padding: ${(p) => p.theme.spacing.xl} 0;
  margin: 0;
`;

export const Thumb = styled.div`
  width: ${(p) => p.$size || '64px'};
  height: ${(p) => p.$size || '64px'};
  border-radius: 6px;
  background: url(${(p) => p.$src}) center/cover no-repeat;
  background-color: ${(p) => p.theme.colors.light};
  flex-shrink: 0;
`;
