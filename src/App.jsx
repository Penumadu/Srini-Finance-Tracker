import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import TopAppBar from './components/TopAppBar';
import BottomNavBar from './components/BottomNavBar';

import Login from './pages/Login';
import PortfolioOverview from './pages/PortfolioOverview';
import PortfolioDetail from './pages/PortfolioDetail';
import AddTransaction from './pages/AddTransaction';
import StockDetail from './pages/StockDetail';
import CreatePortfolio from './pages/CreatePortfolio';
import EditPortfolio from './pages/EditPortfolio';
import StockWatchlist from './pages/StockWatchlist';

const ProtectedRoute = ({ user, children }) => {
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const AuthLayout = ({ children }) => (
  <>
    <TopAppBar />
    {children}
    <BottomNavBar />
  </>
);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
        
        <Route path="/*" element={
          <ProtectedRoute user={user}>
            <AuthLayout>
              <Routes>
                <Route path="/" element={<PortfolioOverview user={user} />} />
                <Route path="/portfolio/:id" element={<PortfolioDetail user={user} />} />
                <Route path="/add-transaction" element={<AddTransaction user={user} />} />
                <Route path="/add-transaction/:portfolioId" element={<AddTransaction user={user} />} />
                <Route path="/stock-detail/:symbol" element={<StockDetail user={user} />} />
                <Route path="/create-portfolio" element={<CreatePortfolio user={user} />} />
                <Route path="/edit-portfolio/:id" element={<EditPortfolio user={user} />} />
                <Route path="/watchlist" element={<StockWatchlist user={user} />} />
              </Routes>
            </AuthLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
