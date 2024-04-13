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
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
