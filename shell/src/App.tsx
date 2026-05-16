import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import './index.css';
import { NavBar } from '@mfe-fintech/shared-ui';
import { useUserStore } from '@mfe-fintech/shared-store';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MicroAppLoader } from './components/MicroAppLoader';

// Lazy load remote micro-apps via Module Federation
const AccountsApp = lazy(() => import('appAccounts/App'));
const TransactionsApp = lazy(() => import('appTransactions/App'));

const NAV_ITEMS = [
  { label: 'Overview', path: '/' },
  { label: 'Accounts', path: '/accounts' },
  { label: 'Transactions', path: '/transactions' },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useUserStore(s => s.user);

  return (
    <div className="flex h-screen overflow-hidden">
      <NavBar
        appName="FinVault"
        items={NAV_ITEMS}
        activePath={location.pathname}
        onNavigate={navigate}
        userName={user?.name}
      />
      <main className="flex-1 overflow-auto bg-[#0a0f1e] p-8">{children}</main>
    </div>
  );
};

const OverviewPage: React.FC = () => {
  const user = useUserStore(s => s.user);
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">
        Welcome back, {user?.name?.split(' ')[0]} 👋
      </h1>
      <p className="text-white/50 mb-8">Here's your financial overview.</p>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Balance', value: '£24,521.00', change: '+2.4%' },
          { label: 'Monthly Spend', value: '£1,842.50', change: '-8.1%' },
          { label: 'Savings Rate', value: '32%', change: '+5%' },
        ].map(stat => (
          <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-white/50 text-sm">{stat.label}</p>
            <p className="text-white text-2xl font-bold mt-1">{stat.value}</p>
            <p className="text-emerald-400 text-sm mt-1">{stat.change} this month</p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-3">Quick Navigation</h2>
        <p className="text-white/50 text-sm">
          Use the sidebar to navigate to <span className="text-emerald-400">Accounts</span> or{' '}
          <span className="text-emerald-400">Transactions</span> — each is an independently deployed
          micro-frontend application.
        </p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route
            path="/accounts/*"
            element={
              <ErrorBoundary fallback="Accounts app failed to load.">
                <Suspense fallback={<MicroAppLoader name="Accounts" />}>
                  <AccountsApp />
                </Suspense>
              </ErrorBoundary>
            }
          />
          <Route
            path="/transactions/*"
            element={
              <ErrorBoundary fallback="Transactions app failed to load.">
                <Suspense fallback={<MicroAppLoader name="Transactions" />}>
                  <TransactionsApp />
                </Suspense>
              </ErrorBoundary>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
