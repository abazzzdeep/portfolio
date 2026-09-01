import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { PortfolioShell } from './components/portfolio-shell';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [isLight, setIsLight] = useState(() => {
    try { return localStorage.getItem('abhash-theme') === 'light'; } catch { return false; }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('light', isLight);
    try { localStorage.setItem('abhash-theme', isLight ? 'light' : 'dark'); } catch { /* storage can be unavailable */ }
  }, [isLight]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 450);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <div className="loader" role="status" aria-label="Loading portfolio"><div className="loader__inner"><div className="loader__top"><span>AD / studio index</span><span>001 — 100</span></div><div className="loader__name">Abhash<br />Deep</div><div className="loader__bar" /></div></div>}
      <PortfolioShell isLight={isLight} onThemeChange={() => setIsLight((value) => !value)} />
    </>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;