import { useState } from 'react';

const useModal = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenDeleteModal = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedItem(null);
    setShowDeleteModal(false);
  };

  const handleOpenViewModal = (item) => {
    setSelectedItem(item);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => {
    setSelectedItem(null);
    setShowViewModal(false);
  };

  return {
    showDeleteModal,
    showViewModal,
    selectedItem,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleOpenViewModal,
    handleCloseViewModal,
  };
};

export default useModal;
