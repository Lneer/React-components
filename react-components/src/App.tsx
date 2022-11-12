import React from 'react';
import { NotFoundPage, AboutPage, MainPage, FormPage, ModalPage } from 'pages';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from 'components';
import ReduxProvider from 'reduxStore/store';

function App() {
  return (
    <ReduxProvider>
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
    </ReduxProvider>
  );
}

export default App;
