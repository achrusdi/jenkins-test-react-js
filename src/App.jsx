import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css'
import { Header } from './components/templating';
import React, { Suspense, lazy } from 'react';
import NotFoundPage from './pages/errors/NotFoundPage';
import AuthMiddleware from './middlewares/AuthMiddleware';
import SigninPage from './pages/SigninPage';
import IsLoginMiddleware from './middlewares/IsLoginMiddleware';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const TestPage = lazy(() => import('./pages/TestPage'));
const CounterPage = lazy(() => import('./pages/CounterPage'));

// const Content = () => {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <Routes>
//         <Route exact path="/" element={<HomePage />} />
//         <Route exact path="/test" element={<TestPage />} />
//         <Route exact path="/about" element={<AboutPage />} />
//       </Routes>
//     </Suspense>
//   );
// }

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
            <Route exact path="/test" element={<TestPage />} />
            <Route exact path="/about" element={<AboutPage />} />
            <Route exact path="/counter" element={<CounterPage />} />
          </Route>

          <Route element={<IsLoginMiddleware />}>
            <Route exact path="/sign-in" element={<SigninPage />} />
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
