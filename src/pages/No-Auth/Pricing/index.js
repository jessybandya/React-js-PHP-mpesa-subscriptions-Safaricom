import React from 'react'
import FullHeader from '../../../../components/Header'
import Footer from '../../../../components/Footer'

function Pricing() {
  return (
    <div>
    <FullHeader />
    <main>

    <section id="pricing" className="pricing">
      <div className="container">
        <div className="price-card">
          <h3>Basic</h3>
          <p className="price">$9.99/month</p>
          <ul>
            <li>Manage up to 5 subscriptions</li>
            <li>Email support</li>
          </ul>
          <a href="#" className="cta-button">Choose Plan</a>
        </div>
      </div>
    </section>
  </main>
    
  <Footer />
    </div>
  )
}

export default Pricing