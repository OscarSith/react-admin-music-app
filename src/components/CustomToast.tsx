import { memo } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

type CustomToastProps = {
  title: string;
  message: string;
  type: string;
  showToast: boolean;
  closeToast: () => void;
};

export const CustomToast = memo(
  ({ title, message, type, showToast, closeToast }: CustomToastProps) => {
    return (
      <ToastContainer
        style={{ position: 'sticky', bottom: '10%', width: '100%' }}
      >
        <Toast
          style={{ margin: '0 auto' }}
          onClose={closeToast}
          show={showToast}
          delay={4000}
          bg={type}
          autohide
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">{title}</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    );
  },
);
