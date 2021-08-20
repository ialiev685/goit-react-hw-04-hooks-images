import React from 'react';

import './ButtonLoadMore.scss';

const ButtonLoadMore = ({ onClick }) => {
  return (
    <button className="Button" type="button" onClick={onClick}>
      Load more
    </button>
  );
};

export default ButtonLoadMore;
