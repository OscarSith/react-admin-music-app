import React, { useState } from 'react';
import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { useAuth } from '../provider/AuthProvider';
import { Navigate } from 'react-router-dom';
import authService from '../services/AuthService';

const Login = () => {
  const { user, setLogin } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  const [validated, setValidated] = useState<boolean>(false);
  const [errorServer, setErrorServer] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const form = event.target;

    if (!validated) {
      setValidated(true);
    }

    if (!form.checkValidity()) {
      event.stopPropagation();
    } else {
      const data = new FormData(form);
      const body = Object.fromEntries(data.entries());

      setIsLoading(true);
      if (errorServer !== '') setErrorServer('');

      authService(body)
        .then((data) => {
          setLogin(data);
        })
        .catch((reason: Error) => {
          setErrorServer(reason.message);
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <Row className="justify-content-center">
      <Col xs={8} md={6} lg={4}>
        <h1 className="text-center mt-5">Panel administrativo de Music App</h1>
        <Form
          className="mt-5"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              autoComplete="username"
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid Email
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              minLength={4}
              name="password"
              autoComplete="current-password"
            />
            <Form.Text className="text-muted">Minimun 4 letters</Form.Text>
            <Form.Control.Feedback type="invalid">
              Please the password is required
            </Form.Control.Feedback>
          </Form.Group>
          <hr className="my-4" />
          <div className="text-center mb-3">
            <Button variant="primary px-4" type="submit" disabled={isLoading}>
              Entrar {isLoading && <Spinner as="span" size="sm" />}
            </Button>
          </div>
          {errorServer !== '' && (
            <Alert variant="warning" dismissible>
              {errorServer}
            </Alert>
          )}
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
