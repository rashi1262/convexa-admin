import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { BASE_URL } from '../../common/siteConstants';
import { MdVisibility } from 'react-icons/md';

const Agents = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<{ _id?: string; role?: string }>({});
  const [clientIdFilter, setClientIdFilter] = useState('');

  // Get clientId from URL
  useEffect(() => {
    const clientId = searchParams.get('client');
    if (clientId) {
      setClientIdFilter(clientId);
    } else {
      setClientIdFilter('');
    }
  }, [searchParams]);

  // Get user data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('userData');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUserData(parsed);
    }
  }, []);

  // Fetch agents based on clientIdFilter and userId
  useEffect(() => {
    const fetchAgents = async () => {
      if (!userData._id) return;

      try {
        setLoading(true);
        const url = clientIdFilter
          ? `${BASE_URL}/agent/partner/${userData._id}?clientId=${clientIdFilter}`
          : `${BASE_URL}/agent/partner/${userData._id}`;
        const res = await axios.get(url);
        setAgents(res.data);
      } catch (err) {
        console.error('Error fetching agents:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, [userData, clientIdFilter]);

  const handleCreateAgent = () => {
    navigate('/create-agent');
  };

  const columns = [
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Website', selector: row => row.website, sortable: true },
    { name: 'Client', selector: row => row.clientId?.name || 'N/A' },
    {
        name: 'Actions',
        cell: (row) => (
          <button
            onClick={() => navigate(`/agentdetail/${row._id}`)}
            className="text-blue-600 hover:text-blue-800"
            title="View Details"
          >
            <MdVisibility size={20} />
          </button>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      }
  ];

  // Remove filter by clientId
  const handleClearFilter = () => {
    setClientIdFilter('');
    setSearchParams({});
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Agents</h2>
        <button
          onClick={handleCreateAgent}
          className="bg-[black] text-white px-4 py-2 rounded hover:bg-[purple]"
        >
          Create Agent
        </button>
        {clientIdFilter && (
          <button
            onClick={handleClearFilter}
            className="ml-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Clear Filter
          </button>
        )}
      </div>

      <DataTable
        columns={columns}
        data={agents}
        progressPending={loading}
        pagination
        highlightOnHover
        responsive
      />
    </div>
  );
};

export default Agents;
