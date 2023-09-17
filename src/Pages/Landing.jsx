import React from 'react'
import Header from '../Components/Header'
import { Button } from 'react-bootstrap'

const Landing = () => {
  return (
    <div className='landing-wrapper'>
      <div className="hero-section">
        <Header />
        <div className="hero-content">
            <div className="hero-content-title">
                Find Artisans near you
            </div>
            <div className="hero-content-sub-title">
            Pick the best artisans in the country to fix your basic household needs
            </div>
            <div className="hero-content-download-btn">
                <Button>Download the app</Button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
