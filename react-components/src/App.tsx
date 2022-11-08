import React from 'react';
import { NotFoundPage, AboutPage, MainPage, FormPage, ModalPage } from 'pages';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from 'components';
import { AppProvider } from 'context/Store';

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/:pokemonName" element={<ModalPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}

export default App;
