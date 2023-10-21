import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './views/Home/Home';
import About from './views/About/About';
import NotFound from './views/NotFound/NotFound';
import LoginPage from './views/Login/Login';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <header />

      <Container>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Eğer tanımlanmamış bir rota girilirse */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Container>

      <footer />
    </Router>
  );
}

export default App;