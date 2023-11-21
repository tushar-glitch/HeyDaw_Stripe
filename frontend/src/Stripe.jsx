import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CheckoutForm from './CheckoutForm';
import SubscriptionComponent from './Subscription';


const stripePromise = loadStripe('your_api_key')

function Stripe() {
  const [clientSecret, setClientSecret] = useState('')
    console.log('fasdfadf');
  useEffect(() => {
    fetch('http://localhost:3001/create-payment-intent', {
      method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
      body: JSON.stringify({items: [{amount: localStorage.getItem('Amount')}]})
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret))
    console.log(clientSecret);
  }, [])
  
  const appearance = {
    theme: "stripe"
  }
  const options = {
    clientSecret,
    appearance
  }
  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
          
        </Elements>
      )}
    </div>
  );
}

export default Stripe;