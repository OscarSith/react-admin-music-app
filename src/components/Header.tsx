import React, { useRef } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';

const MIN_WIDTH_MOVIL = 767;

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const toggleNavbarButton = useRef<HTMLButtonElement>(null);

  const handleClickLink = () => {
    if (window.innerWidth <= MIN_WIDTH_MOVIL) {
      toggleNavbarButton.current?.click();
    }
  };

  return (
    <header>
      <Navbar expand="md" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Music App Admin</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            ref={toggleNavbarButton}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" onClick={handleClickLink}>
                Inicio
              </Nav.Link>
              <Nav.Link as={Link} to="artists" onClick={handleClickLink}>
                Artistas
              </Nav.Link>
              <Nav.Link as={Link} to="album" onClick={handleClickLink}>
                Albunes
              </Nav.Link>
              <Nav.Link as={Link} to="song" onClick={handleClickLink}>
                Canciones
              </Nav.Link>
              {user.access_token === '' ? (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              ) : (
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              )}
            </Nav>
            <Navbar.Text className="text-center d-block d-md-inline">
              {user.name} {user.lastname}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
