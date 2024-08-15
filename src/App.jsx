import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css'
import { Header } from './components/templating';
import React, { Suspense, lazy } from 'react';
import NotFoundPage from './pages/errors/NotFoundPage';
import AuthMiddleware from './middlewares/AuthMiddleware';
import SigninPage from './pages/SigninPage';
import IsLoginMiddleware from './middlewares/IsLoginMiddleware';
import SignupPage from './pages/SignupPage';

const HomePage = lazy(() => import('./pages/HomePage'));
const CustomersPage = lazy(() => import('./pages/CustomersPage'));
const InstalmentTypePage = lazy(() => import('./pages/InstalmentTypePage'));
const LoanTypePage = lazy(() => import('./pages/LoanTypePage'));

function App() {

  const location = useLocation();

  const routeWithoutHeader = ['/sign-up', '/sign-in'];

  return (
    <>
      {!routeWithoutHeader.includes(location.pathname) && <Header />}
      <Suspense key={location.pathname} fallback={<div>Loading...</div>}>
        <Routes location={location}>
          <Route exact path="/" element={<h1>Landing Page</h1>} />

          <Route element={<AuthMiddleware />}>
            <Route exact path="/home" element={<HomePage />} />
            <Route exact path="/customers" element={<CustomersPage />} />
            <Route exact path="/instalment-type" element={<InstalmentTypePage />} />
            <Route exact path="/loan-type" element={<LoanTypePage />} />
          </Route>

          <Route element={<IsLoginMiddleware />}>
            <Route exact path="/sign-in" element={<SigninPage />} />
            <Route exact path="/sign-up" element={<SignupPage />} />
          </Route>

          {/* <Route exact path="/sign-up" element={<TestForm1 />} /> */}

          <Route exact path="/not-found" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );

}

export default App
