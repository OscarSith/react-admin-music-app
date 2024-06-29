import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import { useAuth } from '../provider/AuthProvider';

const MainLayout = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <main className="mt-3">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
