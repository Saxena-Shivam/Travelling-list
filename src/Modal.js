import React from "react";
import "./Modal.css"; // Import the CSS for the modal

export default function Modal({ onConfirm, onCancel, message }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
}
