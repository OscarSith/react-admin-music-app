import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import { useAuth } from '../provider/AuthProvider';
import { Container } from 'react-bootstrap';

const MainLayout = () => {
  const { user } = useAuth();
  const currentTocation = useLocation();

  if (currentTocation.pathname === '/login') {
    return (
      <Container fluid>
        <Outlet />
      </Container>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Container fluid>
      <Header />
      <main className="mt-3">
        <Outlet />
      </main>
      <Footer />
    </Container>
  );
};

export default MainLayout;
