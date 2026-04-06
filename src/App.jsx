import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <BrowserRouter>
      <nav className='bg-black'>
        <Link className='text-white px-2' to="/register">Register</Link>  
        <Link className='text-white px-2' to="/login">Login</Link>
      </nav>
      <Routes>        
        <Route path="/" element={<Register/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>

    </BrowserRouter>
  );
}
export default App;