import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
  }

  body {
    font-family: ${props => props.theme.fonts.primary};
    font-size: ${props => props.theme.fontSizes.md};
    font-weight: 400;
    line-height: 1.7;
    color: ${props => props.theme.colors.dark};
    background-color: ${props => props.theme.colors.white};
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    letter-spacing: 0.01em;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.secondary};
    font-weight: 400;
    line-height: 1.15;
    margin-bottom: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.primary};
    letter-spacing: -0.02em;
  }

  h1 {
    font-size: ${props => props.theme.fontSizes['6xl']};

    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      font-size: ${props => props.theme.fontSizes['4xl']};
    }
  }

  h2 {
    font-size: ${props => props.theme.fontSizes['4xl']};

    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      font-size: ${props => props.theme.fontSizes['3xl']};
    }
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
    color: ${props => props.theme.colors.grayDark};
  }

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    transition: ${props => props.theme.transitions.fast};
  }

  a:hover {
    opacity: 0.7;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    transition: ${props => props.theme.transitions.fast};
    letter-spacing: 0.05em;
    border-radius: 12px;
  }

  input, textarea, select {
    font-family: inherit;
    outline: none;
    border: 1px solid ${props => props.theme.colors.border};
    padding: ${props => props.theme.spacing.md};
    transition: ${props => props.theme.transitions.fast};
    font-size: ${props => props.theme.fontSizes.sm};
    background: ${props => props.theme.colors.white};
    border-radius: 0;
  }

  input:focus, textarea:focus, select:focus {
    border-color: ${props => props.theme.colors.primary};
  }

  img {
    max-width: 100%;
    height: auto;
  }

  ::selection {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 ${props => props.theme.spacing.xl};

    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      padding: 0 ${props => props.theme.spacing.md};
    }
  }

  .section {
    padding: ${props => props.theme.spacing['5xl']} 0;

    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      padding: ${props => props.theme.spacing['3xl']} 0;
    }
  }
`;

export default GlobalStyles;
