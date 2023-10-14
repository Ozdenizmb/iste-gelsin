import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './view/Home';
import About from './view/About';
import NotFound from './view/NotFound';
import LoginPage from './view/Login';

function App() {
  return (
    <Router>
      <div>
        <header>
          {/* TODO: Header eklenmeli */}
        </header>

        <body>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Eğer tanımlanmamış bir rota girilirse */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </body>

        <footer>
          {/* TODO: Footer eklenmeli */}
        </footer>
      </div>
    </Router>
  );
}

export default App;