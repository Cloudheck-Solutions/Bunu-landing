import React from 'react';

import image1 from 'assets/images/landing/image1.png';

const OrganizationIntro = () => {
  return (
    <>
      <img src={image1} alt="img1" />
      <div className="content-body-text">
        <div className="content-body-text-title">Elevate Your Project with the Bunu App</div>
        <div className="content-body-text-sub-title">
          Welcome to Bunu App&rsquo;s dedicated space for organizations seeking reliable and skilled artisans for their projects. We
          understand the unique challenges and demands of organizational projects, and we&rsquo;re here to streamline your experience and
          ensure success.
        </div>
        <div className="content-body-list-wrapper">
          <div className="content-body-text-list">
            <div>
              <div className="content-body-text-numbering">1</div>
            </div>
            <div>
              <div className="content-body-text-header">Tailored Solutions for Organizations</div>
              <div className="content-body-text-body">
                Bunu App recognizes that organizational projects require a unique set of skills and expertise. We offer tailored solutions
                to match your specific needs, whether it&rsquo;s a large-scale construction project, facility maintenance, or any other
                specialized service. Our platform is designed to connect you with artisans who understand the intricacies of organizational
                requirements, ensuring the success of your projects.
              </div>
            </div>
          </div>
          <div className="content-body-text-list">
            <div>
              <div className="content-body-text-numbering">2</div>
            </div>
            <div>
              <div className="content-body-text-header">Verified and Certified Professionals</div>
              <div className="content-body-text-body">
                Rest easy knowing that Bunu App is your gateway to a network of verified and certified professionals. Our thorough
                verification process ensures that artisans listed on our platform meet the highest standards of skill and professionalism.
                When you engage with artisans through Bunu App, you&rsquo;re choosing a reliable workforce that is committed to delivering
                quality results, certified upon project completion.
              </div>
            </div>
          </div>
          <div className="content-body-text-list">
            <div>
              <div className="content-body-text-numbering">3</div>
            </div>
            <div>
              <div className="content-body-text-header">Streamlined Project Management</div>
              <div className="content-body-text-body">
                Simplify your project management processes with Bunu App. Our platform provides tools and features specifically designed for
                organizations, allowing you to efficiently manage multiple projects, track progress, and communicate seamlessly with
                artisans. Experience a streamlined approach to project execution, ensuring that your organizational goals are met with
                precision and professionalism.
              </div>
            </div>
          </div>
          <div className="content-body-text-list">
            <div>
              <div className="content-body-text-numbering">4</div>
            </div>
            <div>
              <div className="content-body-text-header">Dedicated Support for Organizational Clients</div>
              <div className="content-body-text-body">
                At Bunu App, we understand the importance of responsive and dedicated support for organizations. Our team is committed to
                assisting you at every step, from finding the right artisans to addressing any concerns or inquiries. Experience a
                partnership that goes beyond just connecting you with skilled professionals - we&rsquo;re here to ensure your organizational
                projects are executed smoothly and successfully.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizationIntro;
