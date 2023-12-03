import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from '../pages/Login';
import Menu from '../pages/Menu';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/menu" Component={Menu} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
