import { Container } from '../Container';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-dark-surface border-b border-dark-border backdrop-blur-sm bg-dark-surface/95">
      <Container>
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
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
            <div>
              <h1 className="text-xl font-bold text-text-primary">
                Flight Search
              </h1>
              <p className="text-xs text-text-muted hidden sm:block">
                Find the best flight deals
              </p>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};
