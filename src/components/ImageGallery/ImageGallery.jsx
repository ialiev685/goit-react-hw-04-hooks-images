import ImageGalleryItem from '../ImageGalleryItem';
import React from 'react';
import PropTypes from 'prop-types';

import './ImageGallery.scss';

const ImageGallery = ({ listGallery, onImgClick }) => {
  return (
    <ul className="ImageGallery">
      {listGallery.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          smallImg={webformatURL}
          largeImg={largeImageURL}
          tags={tags}
          onModal={onImgClick}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  listGallery: PropTypes.arrayOf(PropTypes.object),
};

export default ImageGallery;
