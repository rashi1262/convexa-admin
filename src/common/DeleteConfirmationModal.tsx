// DeleteConfirmationModal.js
import React from 'react';

const DeleteConfirmationModal = ({ show, onHide, message, onConfirm }) => {
  if (!show) return null; // Prevent rendering if show is false

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-5 shadow-lg max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end space-x-2">
          <button 
            onClick={onHide} 
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
