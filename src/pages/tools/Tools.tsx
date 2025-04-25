// ToolPage.js
import React, { useState, useEffect } from 'react';
import Table from '../../common/Table'; 
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import useModal from '../../hooks/useModal'; 
import DeleteConfirmationModal from '../../common/DeleteConfirmationModal';
import ViewModal from '../../common/ViewModal';

const ToolPage = () => {
  const [tools, setTools] = useState([]);
  const navigate = useNavigate();
  const {
    showDeleteModal,
    showViewModal,
    selectedItem,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleOpenViewModal,
    handleCloseViewModal,
  } = useModal();

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getAllToolWithoutPagination'); 
        setTools(response.data);
      } catch (error) {
        console.error("Error fetching tools:", error);
      }
    };

    fetchTools();
  }, []);

  const handleDeleteConfirm = async () => {
    if (selectedItem) {
      try {
        await axios.delete(`http://localhost:8080/deleteTool/${selectedItem._id}`);
        setTools((prevTools) => prevTools.filter(tool => tool._id !== selectedItem._id));
      } catch (error) {
        console.error("Error deleting tool:", error);
      }
      handleCloseDeleteModal();
    }
  };

  const columns = [
    { field: 'title', header: 'Tool Name' },
    { field: 'category', header: 'Category' },
    { field: 'averageRating', header: 'Average Rating' },
  ];

  const fieldsToShow = {
    "Title": "title",
    "Category": "category",
    "Description": "description",
    "Long Description": "longDescription",
    "Visit Link": "visit_link",
    "Status": "status",
    "Visit Count": "visit_count",
    "Tool Image": "firebase_image_url",
    "Tags": "tags",
    "Ranking": "ranking"
  };
  return (
    <div className="tool-page">
      <h1>Tools</h1>
      <div>
        <Link to='/addTool'>Add Tool</Link>
      </div>
      <Table 
        data={tools} 
        columns={columns}
        onView={handleOpenViewModal} 
        onUpdate={(item) => navigate(`/tool/edit/${item._id}`)}

        onDelete={handleOpenDeleteModal} 
      />
      
      
        <DeleteConfirmationModal
        show={showDeleteModal}
          onHide={handleCloseDeleteModal} 
          onConfirm={handleDeleteConfirm}
          message={`Are you sure you want to delete ${selectedItem?.title}?`}
        />

<ViewModal
          show={showViewModal}
          onHide={handleCloseViewModal}
          data={selectedItem}
          fields={fieldsToShow}
        />
      
    </div>
  );
};

export default ToolPage;
