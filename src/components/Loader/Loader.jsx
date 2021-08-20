import React, { Component } from 'react';

import LoaderSpinner from 'react-loader-spinner';

export default class Loader extends Component {
  render() {
    return (
      <LoaderSpinner type="ThreeDots" color="#00BFFF" height={100} width={100} timeout={3000} />
    );
  }
}
