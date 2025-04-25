import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Table from '../../common/Table'; 
import axios from 'axios';
import useModal from '../../hooks/useModal';
import DeleteConfirmationModal from '../../common/DeleteConfirmationModal';
import ViewModal from '../../common/ViewModal';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const {
    showDeleteModal,
    showViewModal,
    selectedItem,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleOpenViewModal,
    handleCloseViewModal
  } = useModal();


  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await axios.get(' http://localhost:8080/getCategory'); 
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchTools();
  }, []);

  const handleDeleteConfirm = async () => {
    if (selectedItem) {
      try {
        await axios.delete(`http://localhost:8080/deleteCategory/${selectedItem._id}`);
        setCategories((prevCategories) => prevCategories.filter(categories => categories._id !== selectedItem._id));
      } catch (error) {
        console.error("Error deleting tool:", error);
      }
      handleCloseDeleteModal();
    }
  };
  const columns = [
    { field: 'name', header: 'Category Name' },
    // { field: 'toolCount', header: 'Tool Count' }
  ]

  const fieldsToShow = {
    "Name": "name",
    "Category Icon": "icon"
  };

  return  (
    <div className="tool-page">
      <h1>Tools</h1>
      <div><Link to='/addCategory'>Add Category</Link>
      </div>
      <Table
      data={categories} 
      columns={columns} 
      onDelete={handleOpenDeleteModal}
      onView={handleOpenViewModal} 
      onUpdate={(item) => navigate(`/category/edit/${item._id}`)}

 

      />

<DeleteConfirmationModal
        show={showDeleteModal}
          onHide={handleCloseDeleteModal} 
          onConfirm={handleDeleteConfirm}
          message={`Are you sure you want to delete ${selectedItem?.name}?`}
        />
<ViewModal
          show={showViewModal}
          onHide={handleCloseViewModal}
          data={selectedItem}
          fields={fieldsToShow}
        />

    </div>
  );
}

export default Category
