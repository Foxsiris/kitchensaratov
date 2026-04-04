import React from 'react';
import { Outlet } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import CallbackModal from './Modals/CallbackModal';
import InstallmentModal from './Modals/InstallmentModal';

const MainLayout = () => (
  <>
    <ScrollToTop />
    <Header />
    <Outlet />
    <Footer />
    <CallbackModal />
    <InstallmentModal />
  </>
);

export default MainLayout;
