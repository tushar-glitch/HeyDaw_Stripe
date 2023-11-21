import React, { useEffect, useState } from 'react'
import { PaymentElement, LinkAuthenticationElement, useStripe, useElements } from '@stripe/react-stripe-js'
import './checkout.css'
const CheckoutForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!stripe) return
        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        )
        if (!clientSecret) return

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!")
                    break;
                case "processing":
                    setMessage("Your payment is processing.")
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.")
                    break;
                default:
                    setMessage("Something went wrong.")
                    break;
            }
            console.log(paymentIntent.status);
        })
    }, [stripe])

    const handleSubmit = async e => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }
        setIsLoading(true)

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:3001/success"
            }
        })

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message)
        } else {
            setMessage("Something went wrong, please try again.")
        }

        setIsLoading(false);
    }
    const handleEmailChange = event => {
        console.log(event);
    }
    const PaymentElementOptions = {
        layout: "tabs"
    }
    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <LinkAuthenticationElement
                id="link-authentication-element"
                onChange={handleEmailChange}
            />
            <PaymentElement id="payment-element" options={PaymentElementOptions} />
            {/* <button disabled={isLoading || stripe || !elements}  id="submit"> */}
            <button  id="submit">
                <span id="button-text">
                    {isLoading ? <div className='spinner' id="spinner"></div> : `Pay $ ${localStorage.getItem('Amount')}`}
                </span>
            </button>   
            {message && <div id="payment-message">{message}</div>}
        </form>
    )
}

export default CheckoutForm
