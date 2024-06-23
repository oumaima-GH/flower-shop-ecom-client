import React from 'react';
import './Testimonials.css';

function Testimonials() {
  return (
    <section className="testimonials">
      <h2>Testimonials</h2>
      <h3>Hear From Our Happy Customers</h3>
      <p>Share some details here. This is a flexible section where you can share anything you want.</p>
      <div className="testimonials__container">
        <div className="testimonial">
          <p>"I've been a loyal customer of Florist for years, and they never cease to amaze me. The flowers are always fresh, the arrangements are stunning, and the service is top-notch."</p>
          <div className="testimonial-footer">
            <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Customer 1" />
            <p>- Jane Doe</p>
          </div>
        </div>
        <div className="testimonial">
          <p>"I recently used Florist for my daughter's wedding, and I couldn't have been happier with the results. The wedding florals were breathtaking, and the team went above and beyond to bring."</p>
          <div className="testimonial-footer">
            <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Customer 2" />
            <p>- John Smith</p>
          </div>
        </div>
        <div className="testimonial">
          <p>"I've been a loyal customer of Florist for years, and they never cease to amaze me. The flowers are always fresh, the arrangements are stunning, and the service is top-notch."</p>
          <div className="testimonial-footer">
            <img src="https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Customer 3" />
            <p>- Emily Johnson</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
