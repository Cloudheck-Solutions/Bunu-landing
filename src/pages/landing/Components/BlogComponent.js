import React from 'react';

// eslint-disable-next-line react/prop-types
const BlogComponent = ({ image, title }) => {
  return (
    <div className="blog-wrapper">
      <img src={image} alt={title} />
      <a href="/">{title}</a>
    </div>
  );
};

export default BlogComponent;
