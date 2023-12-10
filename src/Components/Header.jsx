import React, {useState} from 'react';
import MobileHeaderLinks from './MobileHeaderLinks';

const Header = () => {
  const [sliderHeight, setSliderHeight] = useState('0px');
  
  const toggleMobileBar = () => {
    setSliderHeight((prevHeight) => (prevHeight === '0px' || prevHeight === '' ? '326px' : '0px'));
  }

  return (
    <>
    <MobileHeaderLinks toggleMobileBar={toggleMobileBar} height={sliderHeight}/>
    <header>
      <div className="logo">
        <img src="assets/images/logo.png" alt='Bunu' />
        <div className="logo-text">Bunu</div>
      </div>
      <div className="header-links">
        <a href='/#landing'>Home</a>
        <a href='/#about'>About</a>
        <a href='/#earn'>Become an Artisan</a>
        <a href='/#download'>Download</a>
      </div>
      <div className="mobile-header-links">
        <div onClick={toggleMobileBar}>
          <span
            className="iconify"
            data-icon="jam:bar-chart"
            style={{
              fontSize: '28px',
              color: '#252525',
              transform: 'scaleY(-1) rotate(-90deg)',
            }}
          ></span>
        </div>
      </div>
    </header>
    </>
  )
}

export default Header
