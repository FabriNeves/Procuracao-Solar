import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/home/HomePage';
import { FormPage } from './pages/form/FormPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/formulario" element={<FormPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;