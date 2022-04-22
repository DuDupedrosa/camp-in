import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserStorage } from './UserContext';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/login/Login';
import './App.css';
import User from './components/User/User';
import ProtectRouter from './components/User/ProtectRouter';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <UserStorage>
          <Header />
          <div className="App-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="login/*" element={<Login />} />
              <Route
                path="conta/*"
                element={
                  <ProtectRouter>
                    <User />
                  </ProtectRouter>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
};

export default App;
