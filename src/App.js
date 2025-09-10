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
import Salons from './pages/Salons/Salons';
import Calculator from './pages/Calculator/Calculator';
import KitchenDetail from './pages/KitchenDetail/KitchenDetail';
import CallbackModal from './components/Modals/CallbackModal';
import InstallmentModal from './components/Modals/InstallmentModal';
import CalculatorModal from './components/Modals/CalculatorModal';

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
              <Route path="/salons" element={<Salons />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/kitchen/:id" element={<KitchenDetail />} />
            </Routes>
            <Footer />
            
            {/* Модальные окна */}
            <CallbackModal />
            <InstallmentModal />
            <CalculatorModal />
          </div>
        </Router>
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;