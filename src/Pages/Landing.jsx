import React from 'react'
import Header from '../Components/Header'
import { Button } from 'react-bootstrap'
import { Icon } from '@iconify/react'

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
        <div className="info-section">
          <div className="info-section-item">
            <div className="info-item-header">
              <div className="info-icon"> <Icon icon="formkit:people" /> </div>
              <div className="title">About Us</div>
            </div>
            <div className="info-item-body">Find out how we started, what drives us, and how we're reimagining how the world moves.</div>
          </div>
          <div className="info-section-item">
            <div className="info-item-header">
              <div className="info-icon"> <Icon icon="iconamoon:news" /> </div>
              <div className="title">Newsroom</div>
            </div>
            <div className="info-item-body">See announcements about our latest releases, initiatives, and partnerships.</div>
          </div>
          <div className="info-section-item">
            <div className="info-item-header">
              <div className="info-icon"> <Icon icon="mi:call" /> </div>
              <div className="title">Call Us</div>
            </div>
            <div className="info-item-body">Call us anytime and request for help with our 24/7 support at +234 90 593 2342 423.</div>
          </div>
        </div>
        <div className="app-info">
          <div className="title">It’s easier with our app</div>
          <div className="app-info-content-wrapper">
            <div className="app-info-details">
              <div className="detail-header">Request for artisans, for <br/> quality work.</div>
              <div className="detail-body">Scan the Qr code with your phone camera to download the Bunu app. Available for Android and IOS devices.</div>
              <a href="/#">Click here to download</a>
            </div>
            <div className="demo-image-wrapper">
              <img src='assets/images/phone.png' alt='bunu app demo' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
