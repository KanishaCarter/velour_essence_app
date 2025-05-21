import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import Signup from './components/Signup';
import Login from './components/Login';
import AvailableScents from './components/Scents';
import ScentCard from './components/ScentCard';
import Cart from './components/Cart';
import Checkout from './components/Checkout'; 


function App() {
  return (
    <>
    <Navigation/>
    <Routes>
        <Route path="/" element = {<ScentCard/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/signup" element = {<Signup/>}/>
        <Route path="/cart" element = {<Cart/>}/>
        <Route path="/checkout" element = {<ScentCard/>}/>
        <Route path="/" element = {<ScentCard/>}/>
    </Routes>
    </>
  );
}

export default App;

