import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { BASE_URL } from '../../common/siteConstants';
import { MdRealEstateAgent, MdEdit, MdDelete } from 'react-icons/md';

interface UserData {
  name?: string;
  email?: string;
  photoURL?: string;
  _id?: string;
}

interface Client {
  _id: string;
  name: string;
  website: string;
  phone: string;
  ownership: string;
  createdAt: string;
}

const Store = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData>({});
  const [showModal, setShowModal] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('userData');
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  const handleAddClient = () => {
    navigate('/addclient');
  };

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/partner/${userData._id}`);
      setClients(res.data);
    } catch (err) {
      console.error('Error fetching clients:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData._id) fetchClients();
  }, [userData._id]);

  const confirmDeleteClient = (id: string, name: string) => {
    setClientToDelete({ id, name });
    setShowModal(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!clientToDelete) return;

    try {
      await axios.delete(`${BASE_URL}/api/deleteUserById/${clientToDelete.id}`);
      fetchClients();
      setShowModal(false);
      setClientToDelete(null);
    } catch (err) {
      console.error('Error deleting client:', err);
      alert('Failed to delete client. Please try again.');
    }
  };

  const columns = [
    { name: 'Name', selector: (row: Client) => row.name, sortable: true },
    { name: 'Email', selector: (row: Client) => row.email, sortable: true },
   
    {
      name: 'Created At',
      selector: (row: Client) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      name: 'Actions',
      cell: (row: Client) => (
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/agents?client=${row._id}`)}
            className="text-green-600 hover:text-green-700"
            title="View Agents"
          >
            <MdRealEstateAgent size={20} />
          </button>
          <button
            onClick={() => navigate(`/edit/${row._id}`)}
            className="text-yellow-500 hover:text-yellow-600"
            title="Edit"
          >
            <MdEdit size={20} />
          </button>
          <button
            onClick={() => confirmDeleteClient(row._id, row.name)}
            className="text-red-600 hover:text-red-700"
            title="Delete"
          >
            <MdDelete size={20} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Client List</h2>
        <button
          onClick={handleAddClient}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Client
        </button>
      </div>

      <DataTable
        columns={columns}
        data={clients}
        progressPending={loading}
        pagination
        highlightOnHover
        striped
      />

      {/* Delete Confirmation Modal */}
      {showModal && clientToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-4">
              Are you sure you want to delete <strong>{clientToDelete.name}</strong>?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setClientToDelete(null);
                }}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Store;
