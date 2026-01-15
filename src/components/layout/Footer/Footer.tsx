import { Container } from '../Container';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-surface border-t border-dark-border mt-auto">
      <Container>
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3">
                About
              </h3>
              <p className="text-sm text-text-secondary">
                A modern flight search engine powered by Amadeus API.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#search"
                    className="text-sm text-text-secondary hover:text-accent transition-smooth"
                  >
                    Search Flights
                  </a>
                </li>
                <li>
                  <a
                    href="https://developers.amadeus.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-secondary hover:text-accent transition-smooth"
                  >
                    Amadeus API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#privacy"
                    className="text-sm text-text-secondary hover:text-accent transition-smooth"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#terms"
                    className="text-sm text-text-secondary hover:text-accent transition-smooth"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="divider" />

          <div className="pt-6">
            <p className="text-sm text-text-muted text-center">
              © {currentYear} Flight Search Engine. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};
