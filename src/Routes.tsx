import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './pages/Home/Home';
import Login from './pages/Login';
import { ErrorPage } from './pages/Error404';
import { Album } from './pages/Album/Album';
import { Song } from './pages/Song/Song';
import { StoreSongProvider } from './pages/Song/store/StoreSongContext';
import { StoreAlbumProvider } from './pages/Album/store/StoreAlbumContext';
import { AuthProvider } from './provider/AuthProvider';

function Routes() {
  return createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <AuthProvider>
              <MainLayout />
            </AuthProvider>
          }
          errorElement={<ErrorPage />}
        >
          <Route index element={<Home />} />
          <Route path="artists" lazy={() => import('./pages/Artist/Artists')} />
          <Route
            path="album"
            element={
              <StoreAlbumProvider>
                <Album />
              </StoreAlbumProvider>
            }
          />
          <Route
            path="song"
            element={
              <StoreSongProvider>
                <Song />
              </StoreSongProvider>
            }
          />
          <Route path="/login" element={<Login />} />
        </Route>
      </>,
    ),
  );
}

export default Routes;
