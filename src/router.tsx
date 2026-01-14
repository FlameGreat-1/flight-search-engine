import { createBrowserRouter } from 'react-router-dom';
import { Home, SearchResults, NotFound } from '@/pages';
import { Header, Footer } from '@/components/layout';
import { ErrorBoundary } from '@/components/common';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <Layout>
          <Home />
        </Layout>
      </ErrorBoundary>
    ),
    errorElement: (
      <Layout>
        <NotFound />
      </Layout>
    ),
  },
  {
    path: '/results',
    element: (
      <ErrorBoundary>
        <Layout>
          <SearchResults />
        </Layout>
      </ErrorBoundary>
    ),
  },
  {
    path: '*',
    element: (
      <Layout>
        <NotFound />
      </Layout>
    ),
  },
]);
