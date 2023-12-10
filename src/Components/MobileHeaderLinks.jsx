import React from "react";

const MobileHeaderLinks = ({toggleMobileBar, height}) => {
    const navigateToSection = (section) => {
        window.location.href = section;
        // toggleMobileBar()
    }
  return (
    <div id="menu-slider" style={{height: height}}>
      <div className="menu-content">
        <div className="cancel-icon" onClick={toggleMobileBar}>
          <span
            className="iconify"
            data-icon="fluent-mdl2:cancel"
            style={{fontSize: '33.5px', color: '#000000'}}
          ></span>
        </div>
        <div className="mobile-link">
          <a href="/#landing">Home</a>
        </div>
        <div className="mobile-link">
          <a href="/#about">About</a>
        </div>
        <div className="mobile-link">
          <a href="/#earn">Become an Artisan</a>
        </div>
        <div className="mobile-link">
          <a href="/#download">Download</a>
        </div>
      </div>
    </div>
  );
};

export default MobileHeaderLinks;
