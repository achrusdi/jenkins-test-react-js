import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css'
import { Header } from './components/templating';
import React, { Suspense, lazy } from 'react';


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
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/test" element={<TestPage />} />
          <Route exact path="/about" element={<AboutPage />} />
          <Route exact path="/counter" element={<CounterPage />} />
        </Routes>
      </Suspense>
    </>
  );

}

export default App
