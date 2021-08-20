import './ImageGalleryItem.scss';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ smallImg, largeImg, tags, onModal }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={smallImg}
        data-modal={largeImg}
        alt={tags}
        onClick={onModal}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
