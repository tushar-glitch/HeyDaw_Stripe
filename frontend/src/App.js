import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CheckoutForm from './CheckoutForm';
import SubscriptionComponent from './Subscription';
import Stripe from './Stripe';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route exact path="/checkout" element={<Stripe />} />
      <Route exact path="/" element={<SubscriptionComponent />}>
        
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;