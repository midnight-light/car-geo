import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/home-page';
import { withProviders } from '@/app/providers';
import './styles/index.css';

const App = (): React.ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

const AppWithProviders = withProviders(App);

export default AppWithProviders;
