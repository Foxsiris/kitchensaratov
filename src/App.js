import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import { ModalProvider } from './hooks/useModal';
import { CatalogProvider } from './context/CatalogContext';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/MainLayout';
import Home from './pages/Home/Home';
import Catalog from './pages/Catalog/Catalog';
import About from './pages/About/About';
import KitchenDetail from './pages/KitchenDetail/KitchenDetail';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminLayout from './pages/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminCategories from './pages/Admin/AdminCategories';
import AdminCategoryNew from './pages/Admin/AdminCategoryNew';
import AdminCategoryDetail from './pages/Admin/AdminCategoryDetail';
import AdminBrands from './pages/Admin/AdminBrands';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <CatalogProvider>
          <ModalProvider>
            <Router>
              <div className="App">
                <Routes>
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="categories" element={<AdminCategories />} />
                    <Route path="categories/new" element={<AdminCategoryNew />} />
                    <Route path="categories/:id" element={<AdminCategoryDetail />} />
                    <Route path="brands" element={<AdminBrands />} />
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
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
