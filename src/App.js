import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import { ModalProvider } from './hooks/useModal';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Catalog from './pages/Catalog/Catalog';
import About from './pages/About/About';
import KitchenDetail from './pages/KitchenDetail/KitchenDetail';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import CallbackModal from './components/Modals/CallbackModal';
import InstallmentModal from './components/Modals/InstallmentModal';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ModalProvider>
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/about" element={<About />} />
              <Route path="/kitchen/:id" element={<KitchenDetail />} />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
            <Footer />
            
            {/* Модальные окна */}
            <CallbackModal />
            <InstallmentModal />
          </div>
        </Router>
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;