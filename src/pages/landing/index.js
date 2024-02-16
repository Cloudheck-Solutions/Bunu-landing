import React, { useState } from 'react';
import Header from './Components/Header';
import { Button, Form } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import Footer from './Components/Footer';
import BlogComponent from './Components/BlogComponent';
import Textra from 'react-textra';
import ArtisanIntro from './Components/ArtisanIntro';
import ClientIntro from './Components/ClientIntro';
import OrganizationIntro from './Components/OrganizationIntro';
import Map from './Components/Map';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style/style.css';
import './style/responsive.css';

import aboutus from 'assets/images/landing/aboutus.png';
import appstore from 'assets/images/landing/app-store.png';
import logo2 from 'assets/images/landing/logo2.png';
import phone from 'assets/images/landing/phone.png';
import play from 'assets/images/landing/play.png';
import blog1 from 'assets/images/landing/blog1.png';
import blog2 from 'assets/images/landing/blog2.png';
import blog3 from 'assets/images/landing/blog3.png';

const Landing = () => {
  const [introContent, setIntroContent] = useState('artisan');
  return (
    <div className="landing-wrapper">
      <Header />
      <div className="hero-section" id="landing">
        <div className="hero-section2">
          <div className="hero-content">
            <div className="hero-content-title">Elevate Your Experience with the Bunu App</div>
            {/* <div className="hero-content-sub-title">
              Connecting You with Verified Artisans for Exceptional Services
              Welcome to Bunu App, your gateway to a world of professionalism
              and quality service. Discover the ease of finding and hiring
              verified artisans who deliver top-notch results. Your satisfaction
              is our priority - experience excellence with the Bunu App.
            </div> */}
            <Textra
              effect="rightLeft"
              className="hero-content-sub-title"
              duration={1000}
              data={[
                'Connecting You with Verified Artisans for Exceptional Services.',
                'Welcome to Bunu App, your gateway to a world of professionalism and quality service.',
                'Discover the ease of finding and hiring verified artisans who deliver top-notch results.',
                'Your satisfaction is our priority - experience excellence with the Bunu App.'
              ]}
            />
            <div className="hero-content-download-btn">
              <Button onClick={() => (window.location.href = '#download')}>Download the app</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="content-section" id="about">
        <div className="title">About Us</div>
        <div className="content-body">
          <div className="content-body-text">
            <div className="contentAboutus">
              <div className="contentAboutUsText">Bridging the Gap Between Clients and Skilled Artisans</div>
              <div className="contentAboutUsSubText">
                At Bunu App, we believe in connecting clients with skilled artisans seamlessly. Our platform is designed to ensure a
                transparent and reliable experience, where professionalism meets craftsmanship. We are committed to revolutionizing how
                clients find and engage with artisans, making quality services accessible to all.
              </div>
              <div className="abt-btn-section">
                <Button className="abt-btn">READ MORE</Button>
              </div>
            </div>
          </div>
          <img src={aboutus} alt="img1" />
        </div>
      </div>
      <div className="content-section" id="earn">
        <div className="title"> Earn money with Bunu </div>
        <div className="content-btn">
          <Button className={introContent === 'artisan' && 'active'} onClick={() => setIntroContent('artisan')}>
            Artisan
          </Button>
          <Button className={introContent === 'client' && 'active'} onClick={() => setIntroContent('client')}>
            Client
          </Button>
          <Button className={introContent === 'organization' && 'active'} onClick={() => setIntroContent('organization')}>
            Organization
          </Button>
        </div>
        <div className="content-body">
          {introContent === 'artisan' ? (
            <ArtisanIntro />
          ) : introContent === 'client' ? (
            <ClientIntro />
          ) : introContent === 'organization' ? (
            <OrganizationIntro />
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="blog-section" id="blog">
        <div className="blog-header">Blogs</div>
        <div className="blog-sub-header">Stay Informed, Stay Inspired</div>
        <div className="blog-sub-title">
          Explore the Bunu App blog for insightful articles, expert tips, and inspiring stories from the world of skilled artisans. Whether
          you&rsquo;re looking for home improvement ideas or want to learn about the latest trends, our blog is your go-to resource. Join us
          on a journey of discovery and empowerment.
        </div>
        <div className="articles">
          <BlogComponent image={blog1} title={'Best ways to make money using Bunu'} />
          <BlogComponent image={blog2} title={'Best ways to make money using ....'} />
          <BlogComponent image={blog3} title={'The new applicants on bunu app'} />
        </div>
        <div className="blog-btn">
          <Button className="blogbtn">View More</Button>
        </div>
      </div>
      <div className="contact-section" id="contact">
        <div className="contact-header">Contact Us</div>
        <div className="contact-title">Get in Touch</div>
        <div className="contact-subtitle">We&rsquo;re Here to Assist You</div>
        <div className="contact-desc">
          Have questions or need assistance? Reach out to our dedicated support team. We value your feedback and are committed to providing
          the best possible service. Contact us via the form below or connect with us on social media. Your satisfaction is our priority.
        </div>
        <div className="form-image-wrapper">
          <div className="form-section">
            <Form>
              <Form.Group className="input-group-wrapper">
                <Form.Control type="text" placeholder="Full Name" />
              </Form.Group>
              <Form.Group className="input-group-wrapper">
                <Form.Control type="email" placeholder="Phone Number" />
              </Form.Group>
              <Form.Group className="input-group-wrapper">
                <Form.Control type="email" placeholder="Email Address" />
              </Form.Group>
              <Form.Group className="input-group-wrapper">
                <Form.Control as="textarea" rows={6} placeholder="Message" />
              </Form.Group>
              <Form.Group className="input-group-wrapper">
                <Button>Send Message</Button>
              </Form.Group>
            </Form>
          </div>
          {/* <div className="image-section">
            <img src={contactUs} alt="contact us" />
          </div> */}
          <div className="map-section">
            <Map />
          </div>
        </div>
      </div>
      <div className="info-section">
        <div className="info-section-item">
          <div className="info-item-header">
            <div className="info-icon">
              {' '}
              <Icon icon="formkit:people" />{' '}
            </div>
            <div className="title">About Us</div>
          </div>
          <div className="info-item-body">
            Find out how we started, what drives us, and how we&rsquo;re reimagining how the world moves.
          </div>
        </div>
        <div className="info-section-item">
          <div className="info-item-header">
            <div className="info-icon">
              {' '}
              <Icon icon="iconamoon:news" />{' '}
            </div>
            <div className="title">Newsroom</div>
          </div>
          <div className="info-item-body">See announcements about our latest releases, initiatives, and partnerships.</div>
        </div>
        <div className="info-section-item">
          <div className="info-item-header">
            <div className="info-icon">
              {' '}
              <Icon icon="mi:call" />{' '}
            </div>
            <div className="title">Call Us</div>
          </div>
          <div className="info-item-body">Call us anytime and request for help with our 24/7 support at +234 90 593 2342 423.</div>
        </div>
      </div>
      <div className="app-info" id="download">
        <div className="title">Experience Bunu On the Go</div>
        <div className="app-info-content-wrapper">
          <div className="app-info-details">
            <div className="detail-header">
              Your Toolbox of Verified Artisans,
              <br /> <b>Anytime, Anywhere</b>.
            </div>
            <div className="detail-body">
              Unlock the full potential of the Bunu App by downloading our mobile app. Access a network of verified artisans with just a few
              taps, ensuring quality services at your fingertips. Leap a hassle-free experience - download the Bunu App now.
            </div>
            <a href="/#">Click here to download</a>
          </div>
          <div className="demo-image-wrapper">
            <img src={phone} alt="bunu app demo" />
          </div>
        </div>
      </div>
      <div className="pre-footer">
        <div className="logo-social">
          <div className="footer-logo">
            <div className="footer-logo-image">
              <img src={logo2} alt="bunu" />
            </div>
            <div className="footer-logo-text">Bunu</div>
          </div>
          <div className="footer-social">
            <a href="/#" className="footer-social-wrapper">
              <Icon icon="ri:instagram-fill" />
            </a>
            <a href="/#" className="footer-social-wrapper">
              <Icon icon="ri:linkedin-fill" />
            </a>
            <a href="/#" className="footer-social-wrapper">
              <Icon icon="ri:whatsapp-fill" />
            </a>
            <a href="/#" className="footer-social-wrapper">
              <Icon icon="bi:facebook" />
            </a>
            <a href="/#" className="footer-social-wrapper">
              <Icon icon="uil:twitter" />
            </a>
          </div>
        </div>
        <div className="footer-links">
          <div className="link-wrapper">
            <div className="title">Quicklinks</div>
            <a href="#/" className="footer-link">
              Home
            </a>
            <a href="#/" className="footer-link">
              About Us
            </a>
            <a href="#/" className="footer-link">
              Privacy Policy
            </a>
            <a href="#/" className="footer-link">
              End-user license links
            </a>
          </div>
          <div className="link-wrapper">
            <div className="title">Company</div>
            <a href="#/" className="footer-link">
              Careers
            </a>
            <a href="#/" className="footer-link">
              Newsroom
            </a>
            <a href="#/" className="footer-link">
              Careers
            </a>
            <a href="#/" className="footer-link">
              Newsroom
            </a>
          </div>
          <div className="link-wrapper">
            <div className="title">Download</div>
            <a href="#/" className="footer-link2">
              <img src={appstore} alt="Apple App store download" />
            </a>
            <a href="#/" className="footer-link2">
              <img src={play} alt="Google Play store download" />
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
