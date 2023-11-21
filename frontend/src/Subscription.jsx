import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import './subscription.css';

const SubscriptionComponent = () => {
    const [subscriptionType, setSubscriptionType] = useState('monthly');
    const [showCouponField, setShowCouponField] = useState(false);
    const [discountApplied, setDiscountApplied] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [couponError, setCouponError] = useState('');

    const handleSubscriptionChange = (type) => {
        setSubscriptionType(type);
    };

    const handleSubscribe = (type) => {
        setShowCouponField(true);
        console.log(`User clicked on ${type} subscription`);
        // Perform further actions or API calls based on the subscription type (monthly/yearly)
    };

    const applyCoupon = () => {
        if (couponCode.toUpperCase() === 'HALFOFF') {
            setDiscountApplied(true);
            setCouponError('');
        } else {
            setCouponError('Incorrect coupon code');
            setDiscountApplied('')
        }
        // You can add further logic for more coupon codes or API calls to validate the coupon
    };

    const handleInputChange = (event) => {
        const inputText = event.target.value.toUpperCase();
        setCouponCode(inputText);
    };

    const handlePayNow = () => {
        if (subscriptionType == 'monthly') {
            if (discountApplied) {
                localStorage.setItem('Amount', 4.99)
            }
            else {
                localStorage.setItem('Amount', 9.99)
            }
        }
        else {
            if (discountApplied) {
                localStorage.setItem('Amount', 49.99)
            }
            else {
                localStorage.setItem('Amount', 99.99)
            }
        }
    };

    return (
        <div className="subscriptionContainer">
            <div className="subscriptionSection">
                <div
                    className={`subscriptionModel ${subscriptionType === 'monthly' && 'selected'}`}
                    onClick={() => handleSubscriptionChange('monthly')}
                >
                    <h2>Monthly Subscription</h2>
                    <p>$9.99 per month</p>
                    <button className="subscribeButton" onClick={() => handleSubscribe('monthly')}>
                        Subscribe
                    </button>
                </div>
            </div>
            <div className="subscriptionSection">
                <div
                    className={`subscriptionModel ${subscriptionType === 'yearly' && 'selected'}`}
                    onClick={() => handleSubscriptionChange('yearly')}
                >
                    <h2>Yearly Subscription</h2>
                    <p>$99.99 per year</p>
                    <button className="subscribeButton" onClick={() => handleSubscribe('yearly')}>
                        Subscribe
                    </button>
                </div>
            </div>
            {showCouponField && (
                <div className="couponField">
                    <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={handleInputChange}
                    />
                    <button className="applyCouponButton" onClick={applyCoupon}>
                        Apply Coupon
                    </button>
                    {couponError && <p className="couponErrorMessage">{couponError}</p>}
                    {discountApplied && (
                        <p>Coupon applied! 50% discount will be applied on checkout.</p>
                    )}
                    <Link to="/checkout">
                        <button className="payNowButton" onClick={handlePayNow}>
                            Continue to pay
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default SubscriptionComponent;
