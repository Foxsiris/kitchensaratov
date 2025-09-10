import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${props => props.theme.fonts.primary};
    font-size: ${props => props.theme.fontSizes.md};
    line-height: 1.6;
    color: ${props => props.theme.colors.dark};
    background-color: ${props => props.theme.colors.white};
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.secondary};
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: ${props => props.theme.spacing.md};
  }

  h1 {
    font-size: ${props => props.theme.fontSizes['5xl']};
  }

  h2 {
    font-size: ${props => props.theme.fontSizes['4xl']};
  }

  h3 {
    font-size: ${props => props.theme.fontSizes['3xl']};
  }

  h4 {
    font-size: ${props => props.theme.fontSizes['2xl']};
  }

  h5 {
    font-size: ${props => props.theme.fontSizes.xl};
  }

  h6 {
    font-size: ${props => props.theme.fontSizes.lg};
  }

  p {
    margin-bottom: ${props => props.theme.spacing.md};
  }

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    transition: ${props => props.theme.transitions.fast};
  }

  a:hover {
    color: ${props => props.theme.colors.secondary};
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    transition: ${props => props.theme.transitions.fast};
  }

  input, textarea, select {
    font-family: inherit;
    outline: none;
    border: 1px solid ${props => props.theme.colors.gray};
    border-radius: ${props => props.theme.borderRadius.md};
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    transition: ${props => props.theme.transitions.fast};
  }

  input:focus, textarea:focus, select:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(44, 62, 80, 0.1);
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${props => props.theme.spacing.md};
  }

  .section {
    padding: ${props => props.theme.spacing['4xl']} 0;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
    border-radius: ${props => props.theme.borderRadius.md};
    font-weight: 500;
    text-decoration: none;
    transition: ${props => props.theme.transitions.fast};
    cursor: pointer;
    border: none;
    outline: none;
  }

  .btn-primary {
    background: ${props => props.theme.colors.gradient};
    color: ${props => props.theme.colors.white};
    box-shadow: ${props => props.theme.shadows.md};
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }

  .btn-secondary {
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.primary};
    border: 2px solid ${props => props.theme.colors.primary};
  }

  .btn-secondary:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }

  .btn-accent {
    background: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.white};
  }

  .btn-accent:hover {
    background: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    .container {
      padding: 0 ${props => props.theme.spacing.sm};
    }
    
    .section {
      padding: ${props => props.theme.spacing['2xl']} 0;
    }
    
    h1 {
      font-size: ${props => props.theme.fontSizes['3xl']};
    }
    
    h2 {
      font-size: ${props => props.theme.fontSizes['2xl']};
    }
  }
`;

export default GlobalStyles;
