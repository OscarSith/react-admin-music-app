import React from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
// import MainLayout from './layoutComponents/MainLayout';
// import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <Container fluid>
      <Login />
      {/* <MainLayout>
        <Home />
      </MainLayout> */}
    </Container>
  );
}

export default App;
