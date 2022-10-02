import React from 'react';
import { NotFoundPage, AboutPage, MainPage } from 'pages';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from 'components/Layout/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
