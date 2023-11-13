import React from "react";
import Header from "../Components/Header";
import { Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import Footer from "../Components/Footer";
import BlogComponent from "../Components/BlogComponent";

const Landing = () => {
  return (
    <div className="landing-wrapper">
      <Header />
      <div className="hero-section">
        <div className="hero-section2">
          <div className="hero-content">
            <div className="hero-content-title">Find Artisans near you</div>
            <div className="hero-content-sub-title">
              Pick the best artisans in the country to fix your basic household
              needs
            </div>
            <div className="hero-content-download-btn">
              <Button>Download the app</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="content-section">
        <div className="title">About Us</div>
        <div className="content-body">
          <div className="content-body-text">
            <div className="contentAboutus">
              <div className="contentAboutUsText">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad veniam, quis nostrud exercitation ullamco laboris nisi
                ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                repreh
              </div>
              <div className="abt-btn-section">
                <Button className="abt-btn">READ MORE</Button>
              </div>
            </div>
          </div>
          <img src="assets/images/aboutus.png" alt="img1" />
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
            <div className="content-body-text-title">
              Work and earn extra money
            </div>
            <div className="content-body-list-wrapper">
              <div className="content-body-text-list">
                <div>
                  <div className="content-body-text-numbering">1</div>
                </div>
                <div>
                  <div className="content-body-text-header">
                    Work and earn extra income
                  </div>
                  <div className="content-body-text-body">
                    We offer the best chance for artisans to find customers on
                    our mobile application with over 10+ million users.
                  </div>
                </div>
              </div>
              <div className="content-body-text-list">
                <div>
                  <div className="content-body-text-numbering">2</div>
                </div>
                <div>
                  <div className="content-body-text-header">
                    Get Paid weekly
                  </div>
                  <div className="content-body-text-body">
                    We offer the best chance for artisans to find customers on
                    our.
                  </div>
                </div>
              </div>
              <div className="content-body-text-list">
                <div>
                  <div className="content-body-text-numbering">3</div>
                </div>
                <div>
                  <div className="content-body-text-header">
                    Work and earn extra income
                  </div>
                  <div className="content-body-text-body">
                    We offer the best chance for artisans to find customers on
                    our mobile application with.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="blog-section">
        <div className="blog-header">Blogs</div>
        <div className="articles">
          <BlogComponent image={'assets/images/blog1.png'} title={'Best ways to make money using Bunu'}/>
          <BlogComponent image={'assets/images/blog2.png'} title={'Best ways to make money using ....'}/>
          <BlogComponent image={'assets/images/blog3.png'} title={'The new applicants on bunu app'}/>
        </div>
        <div className="blog-btn">
          <Button className="blogbtn">View More</Button>
        </div>
      </div>
      <div className="info-section">
        <div className="info-section-item">
          <div className="info-item-header">
            <div className="info-icon">
              {" "}
              <Icon icon="formkit:people" />{" "}
            </div>
            <div className="title">About Us</div>
          </div>
          <div className="info-item-body">
            Find out how we started, what drives us, and how we're reimagining
            how the world moves.
          </div>
        </div>
        <div className="info-section-item">
          <div className="info-item-header">
            <div className="info-icon">
              {" "}
              <Icon icon="iconamoon:news" />{" "}
            </div>
            <div className="title">Newsroom</div>
          </div>
          <div className="info-item-body">
            See announcements about our latest releases, initiatives, and
            partnerships.
          </div>
        </div>
        <div className="info-section-item">
          <div className="info-item-header">
            <div className="info-icon">
              {" "}
              <Icon icon="mi:call" />{" "}
            </div>
            <div className="title">Call Us</div>
          </div>
          <div className="info-item-body">
            Call us anytime and request for help with our 24/7 support at +234
            90 593 2342 423.
          </div>
        </div>
      </div>
      <div className="app-info">
        <div className="title">It’s easier with our app</div>
        <div className="app-info-content-wrapper">
          <div className="app-info-details">
            <div className="detail-header">
              Request for artisans, for <br /> quality work.
            </div>
            <div className="detail-body">
              Scan the Qr code with your phone camera to download the Bunu app.
              Available for Android and IOS devices.
            </div>
            <a href="/#">Click here to download</a>
          </div>
          <div className="demo-image-wrapper">
            <img src="assets/images/phone.png" alt="bunu app demo" />
          </div>
        </div>
      </div>
      <div className="pre-footer">
        <div className="logo-social">
          <div className="footer-logo">
            <div className="footer-logo-image">
              <img src="assets/images/logo2.png" alt="bunu" />
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
              <img
                src="assets/images/app-store.png"
                alt="Apple App store download"
              />
            </a>
            <a href="#/" className="footer-link2">
              <img
                src="assets/images/play.png"
                alt="Google Play store download"
              />
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
