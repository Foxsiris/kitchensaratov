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

export const ToastItem = styled.div`
  pointer-events: auto;
  padding: 12px 20px;
  background: ${(p) => p.theme.colors.primary};
  color: ${(p) => p.theme.colors.white};
  font-size: ${(p) => p.theme.fontSizes.sm};
  border-radius: 6px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  animation: ${slideIn} 0.3s ease forwards, ${slideOut} 0.3s ease 2.5s forwards;
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
