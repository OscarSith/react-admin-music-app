import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './pages/Home';
import Login from './pages/Login';
import { ErrorPage } from './pages/Error404';
import MainLayout from './layoutComponents/MainLayout';
import { Artists } from './pages/Artists';
import { AuthProvider } from './provider/AuthProvider';
import { Album } from './pages/Album';

function App() {
  return (
    <Container fluid>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />}>
            <Route index={true} element={<Home />} />
            <Route path="artists" element={<Artists />} />
            <Route path="album" element={<Album />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Container>
  );
}

export default App;
