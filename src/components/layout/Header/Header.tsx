import { Container } from '../Container';
import { CurrencySelector } from '@/components/common';

export const Header = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-dark-surface border-b border-dark-border backdrop-blur-sm bg-dark-surface/95">
      <Container>
        <div className="flex items-center justify-between h-16">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Scroll to top"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent">
              <svg
                className="w-6 h-6 text-dark-bg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
            <h1 
              className="text-xl font-bold text-text-primary"
              style={{
                textShadow: `
                  1px 1px 0 #6366f1,
                  2px 2px 0 #4f46e5,
                  3px 3px 0 #4338ca,
                  4px 4px 0 #3730a3,
                  5px 5px 10px rgba(0, 0, 0, 0.5)
                `
              }}
            >
              Flight Search
            </h1>
          </button>

          <CurrencySelector compact />
        </div>
      </Container>
    </header>
  );
};
