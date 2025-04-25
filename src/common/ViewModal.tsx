import React from 'react';

const ViewModal = ({ show, onHide, data, fields }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-5 shadow-lg max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">View Details</h2>
        <div className="mb-4">
          {Object.entries(fields).map(([label, field]) => (
            <div key={label} className="mb-2">
              <span className="font-semibold">{label}: </span>
              {field === "firebase_image_url" && data[field] ? (
                <img src={data[field]} alt={label} className="w-32 h-32 object-cover rounded" />
              ) : (
                <span>{data[field]}</span>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={onHide}
          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewModal;
