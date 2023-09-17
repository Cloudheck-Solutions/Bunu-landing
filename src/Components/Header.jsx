import React from 'react';

const Header = () => {
  return (
    <header>
      <div className="logo">
        <img src="assets/images/logo.png" alt='Bunu' />
        <div className="logo-text">Bunu</div>
      </div>
      <div className="header-links">
        <a href='/#'>Home</a>
        <a href='/#'>About</a>
        <a href='/#'>Become an Artisan</a>
        <a href='/#'>Download</a>
      </div>
    </header>
  )
}

export default Header
