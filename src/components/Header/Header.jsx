import React from 'react';

import './Header.scss';

const Header = ({ children }) => {
  return <header className="Searchbar">{children}</header>;
};

export default Header;
