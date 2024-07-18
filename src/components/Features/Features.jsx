import React from 'react';
import './Features.css';

const Features = () => {
    return (
        <div className="features">
            <div className="feature">
                <h2><span className="feature-number">01</span> Order Online</h2>
                <p>Share some details here. This is a flexible section where you can share anything you want.</p>
            </div>
            <div className="feature">
                <h2><span className="feature-number">02</span> Free Shipping</h2>
                <p>Share some details here. This is a flexible section where you can share anything you want.</p>
            </div>
            <div className="feature">
                <h2><span className="feature-number">03</span> More Freshness</h2>
                <p>Share some details here. This is a flexible section where you can share anything you want.</p>
            </div>
            <div className="feature">
                <h2><span className="feature-number">04</span> Safe Payment</h2>
                <p>Share some details here. This is a flexible section where you can share anything you want.</p>
            </div>
        </div>
    );
}

export default Features;
