import React from 'react';
import './BestSelling.css';

function BestSelling() {
  return (
    <section className="best-selling">
      <h2>Best Selling</h2>
      <p>Blossom with the best. Our top-selling flowers.</p>
        <div className="best-selling__products">
            <div className="best-selling__product">
            <img src="https://images.pexels.com/photos/250716/pexels-photo-250716.jpeg" alt="Flower 1" />
            <h5>Flower</h5>
            <h3>Custom Floral Designs</h3>
            <p>$109.00</p>
            </div>
            <div className="best-selling__product">
            <img src="https://images.pexels.com/photos/1488310/pexels-photo-1488310.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Flower 2" />
            <h5>Rose</h5>
            <h3>Custom Floral Designs</h3>
            <p>$150.00</p>
            </div>
            <div className="best-selling__product">
            <img src="https://images.pexels.com/photos/226145/pexels-photo-226145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Flower 3" />
            <h5>Rose</h5>
            <h3>Custom Floral Designs</h3>
            <p>$205.00</p>
            </div>
            <div className="best-selling__product">
            <img src="https://images.pexels.com/photos/250716/pexels-photo-250716.jpeg" alt="Flower 1" />
            <h5>Rose</h5>
            <h3>Custom Floral Designs</h3>
            <p>$105.00</p>
            </div>
            <div className="best-selling__product">
            <img src="https://images.pexels.com/photos/1488310/pexels-photo-1488310.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Flower 2" />
            <h5>Flower</h5>
            <h3>Custom Floral Designs</h3>
            <p>$150.00</p>
            </div>
            <div className="best-selling__product">
            <img src="https://images.pexels.com/photos/226145/pexels-photo-226145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Flower 3" />
            <h5>Flower</h5>
            <h3>Custom Floral Designs</h3>
            <p>$199.00</p>
            </div>
        </div>
    </section>
  );
}

export default BestSelling;
