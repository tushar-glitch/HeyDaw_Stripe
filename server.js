const express = require('express')
const cors = require('cors');
const app = express()
app.use(cors())
const helmet = require('helmet');
const stripe = require('stripe')('your_api_key');

app.use(express.json());

app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        frameSrc: ["'self'", 'http://localhost:3000'],
        // Add other directives as needed for your application
      },
    })
  );
const calculateOrderAmount = items => {
    const am = parseInt(items[0].amount);
    return am
}

app.post('/create-payment-intent', async (req, res) => {
    console.log('asdf');
    const { items } = req.body
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "usd",
        statement_descriptor_suffix: "Payment using Stripe",
        automatic_payment_methods: {
            enabled: true
        }
    })
    res.send({
        clientSecret: paymentIntent.client_secret
    })
})
app.get('/success', (req, res) => {
    res.send("Payment Successfull! Thanks you for your purchase.")
})
app.get('/cancel', (req, res) => {
    res.send("Payment Canceled!")
})

app.listen(3001)