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
        <div className="content-section">
          <div className="title">Earn money with Bunu</div>
          <div className="content-btn">
            <Button className="active">Artisan</Button>
            <Button>Client</Button>
            <Button>Organization</Button>
          </div>
          <div className="content-body">
            <img src="assets/images/image1.png" alt="img1" />
            <div className="content-body-text">
              <div className="content-body-text-title">Work and earn extra money</div>
              <div className="content-body-list-wrapper">
                <div className="content-body-text-list">
                  <div>
                  <div className="content-body-text-numbering">
                    1
                  </div>
                  </div>
                  <div>
                    <div className="content-body-text-header">
                    Work and earn extra income
                    </div>
                    <div className="content-body-text-body">
                    We offer the best chance for artisans to find customers on our mobile application with over 10+ million users. 
                    </div>
                  </div>
                </div>
                <div className="content-body-text-list">
                  <div>
                  <div className="content-body-text-numbering">
                    2
                  </div>
                  </div>
                  <div>
                    <div className="content-body-text-header">
                    Get Paid weekly
                    </div>
                    <div className="content-body-text-body">
                    We offer the best chance for artisans to find customers on our.
                    </div>
                  </div>
                </div>
                <div className="content-body-text-list">
                <div>
                <div className="content-body-text-numbering">
                  3
                </div>
                </div>
                <div>
                  <div className="content-body-text-header">
                  Work and earn extra income
                  </div>
                  <div className="content-body-text-body">
                  We offer the best chance for artisans to find customers on our mobile application with.
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
