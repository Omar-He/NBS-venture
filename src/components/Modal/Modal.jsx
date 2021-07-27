import React, { useEffect } from "react";
import RModal from "react-modal";
import { CloseIcon } from "../../icons/closeIcon";
import "./Modal.css";

const Modal = ({ children, title, onClose, open }) => {
  useEffect(() => {
    const appElement = document.getElementById("root");
    RModal.setAppElement(appElement ? "#root" : "body");
  }, []);
  if (!open) {
    return null;
  }
  const closeModal = () => {
    onClose();
  };
  return (
    <RModal
      isOpen={open}
      onRequestClose={() => {
        closeModal();
      }}
      className="bc-modal"
      overlayClassName="bc-overlay"
    >
      <div className="modal-header">
        <span className="modal-title">{title}</span>
        <span className="close-icon" onClick={closeModal}>
          <CloseIcon />
        </span>
      </div>
      <div className="modal-body">{children}</div>
    </RModal>
  );
};

export default Modal;
