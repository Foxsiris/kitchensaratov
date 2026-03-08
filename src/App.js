import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import { ModalProvider } from './hooks/useModal';
import { CatalogProvider } from './context/CatalogContext';
import MainLayout from './components/MainLayout';
import Home from './pages/Home/Home';
import Catalog from './pages/Catalog/Catalog';
import About from './pages/About/About';
import KitchenDetail from './pages/KitchenDetail/KitchenDetail';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import AdminLayout from './pages/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminCategories from './pages/Admin/AdminCategories';
import AdminCategoryNew from './pages/Admin/AdminCategoryNew';
import AdminCategoryDetail from './pages/Admin/AdminCategoryDetail';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CatalogProvider>
        <ModalProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="categories" element={<AdminCategories />} />
                  <Route path="categories/new" element={<AdminCategoryNew />} />
                  <Route path="categories/:id" element={<AdminCategoryDetail />} />
                </Route>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/catalog" element={<Catalog />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/kitchen/:id" element={<KitchenDetail />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                </Route>
              </Routes>
            </div>
          </Router>
        </ModalProvider>
      </CatalogProvider>
    </ThemeProvider>
  );
}

export default App;