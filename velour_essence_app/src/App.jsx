import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import Signup from './components/Signup';
import Login from './components/Login';
import Scents from './components/Scents';
import ScentCard from './components/ScentCard';
import Cart from './components/Cart';
import Checkout from './components/Checkout'; 
import Home from './components/Home';
import Account from './components/Account';
import Order from './components/Order';
import Orders from './components/Orders';


function App() {
  return (
    <>
    <div id = "container">
      <div id = "navigation">
        <Link to= {"/login"}>Login</Link>
        <Link to= {"/signup"}>Signup</Link>
        <Link to= {"/cart"}>Cart</Link>
      </div>
    </div>
    <div id="main-section">
    <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/signup" element = {<Signup/>}/>
        <Route path="/scents" element = {<Scents/>}/>
        <Route path="/scentCard" element = {<ScentCard/>}/>
        <Route path="/cart" element = {<Cart/>}/>
        <Route path="/checkout" element = {<Checkout/>}/>
        {/* FIX ACCOUNT ROUTE */}
        {/*<Route path="account" element = {<Account/>}/>*/}
        {/* FIX ORDERS ROUTE */}
        {/*<Route path="orders" element = {<Orders/>}/>*/}
        {/* FIX ORDER ROUTE */}
        {/*<Route path="order" element = {<Order/>}/>*/}
    </Routes>
    </div>
    </>
  )
}

export default App;

