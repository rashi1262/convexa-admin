// ToolPage.js
import  { useState, useEffect } from 'react';
import Table from '../../common/Table'; 
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import useModal from '../../hooks/useModal'; 
import DeleteConfirmationModal from '../../common/DeleteConfirmationModal';
import ViewModal from '../../common/ViewModal';
import { BASE_URL } from '../../common/siteConstants';

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
        const response = await axios.get(`${BASE_URL}/api/getallbot`); 
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
        await axios.delete(`${BASE_URL}/api/deleteUserById/${selectedItem._id}`);
        setTools((prevTools) => prevTools.filter(tool => tool._id !== selectedItem._id));
      } catch (error) {
        console.error("Error deleting tool:", error);
      }
      handleCloseDeleteModal();
    }
  };

  const columns = [
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'plan', header: 'Plan' },
  ];

  const fieldsToShow = {
    "Name": "name",
    "Email": "email",
    "Referral": "referral",
    "Role": "role",
    "Plan":"plan"
   
  };
  return (
    <div className="tool-page">
      <h1>Users</h1>
      {/* <div>
        <Link to='/addTool'>Add Tool</Link>
      </div> */}
      <Table 
        data={tools} 
        columns={columns}
        onView={handleOpenViewModal} 
        onUpdate={(item) => navigate(`/user/edit/${item._id}`)}

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
