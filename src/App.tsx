import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './pages/Home';
import Login from './pages/Login';
import { ErrorPage } from './pages/Error404';
import MainLayout from './components/MainLayout';
import { Artists } from './pages/Artist/Artists';
import { AuthProvider } from './provider/AuthProvider';
import { Album } from './pages/Album/Album';
import { Song } from './pages/Song/Song';
import { StoreSongProvider } from './pages/Song/store/StoreSongContext';
import { StoreArtistProvider } from './pages/Artist/store/StoreArtistContext';
import { StoreAlbumProvider } from './pages/Album/store/StoreAlbumContext';

function App() {
  return (
    <Container fluid>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />}>
            <Route index={true} element={<Home />} />
            <Route
              path="artists"
              element={
                <StoreArtistProvider>
                  <Artists />
                </StoreArtistProvider>
              }
            />
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
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Container>
  );
}

export default App;
