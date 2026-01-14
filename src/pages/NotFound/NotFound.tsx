import { useNavigate } from 'react-router-dom';
import { Container } from '@/components/layout';
import { Button } from '@/components/common';

export const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg">
      <Container>
        <div className="card p-12 text-center max-w-2xl mx-auto">
          <div className="space-y-6">
            <div className="text-9xl font-bold text-accent">404</div>
            <h1 className="text-4xl font-bold text-text-primary">Page Not Found</h1>
            <p className="text-lg text-text-secondary">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="primary" size="lg" onClick={handleGoHome}>
                Go to Home
              </Button>
              <Button variant="secondary" size="lg" onClick={() => navigate(-1)}>
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
