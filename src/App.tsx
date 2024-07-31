import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';

const Login = React.lazy(() => import('./components/Login'));
const Signup = React.lazy(() => import('./components/Signup'));
const Dashboard = React.lazy(() => import('./components/Dashboard'));

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
