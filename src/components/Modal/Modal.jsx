import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import './Modal.scss';

const rootModal = document.querySelector('#root-modal');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.hadleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.hadleKeyDown);
  }

  hadleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { src, alt } = this.props.data;
    return createPortal(
      <div className="Overlay" onClick={this.handOverlayClick}>
        <div className="Modal">
          <img src={src} alt={alt} />
        </div>
      </div>,
      rootModal,
    );
  }
}
