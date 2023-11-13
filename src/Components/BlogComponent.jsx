import React from 'react';

const BlogComponent = ({image, title}) => {
  return (
    <div className='blog-wrapper'>
      <img src={image} alt={title} />
      <a href="/">{title}</a>
    </div>
  )
}

export default BlogComponent;
