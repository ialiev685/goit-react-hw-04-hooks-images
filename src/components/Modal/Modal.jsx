import React, { useEffect } from "react";
import { createPortal } from "react-dom";

import "./Modal.scss";

const rootModal = document.querySelector("#root-modal");

const Modal = ({ onClose, data }) => {
  useEffect(() => {
    const hadleKeyDown = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", hadleKeyDown);
    return () => {
      window.removeEventListener("keydown", hadleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const { src, alt } = data;

  return createPortal(
    <div className="Overlay" onClick={handleOverlayClick}>
      <div className="Modal">
        <img src={src} alt={alt} />
      </div>
    </div>,
    rootModal
  );
};

export default Modal;
