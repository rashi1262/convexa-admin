import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../common/siteConstants';

const isValidDomain = (domain: string) => {
  const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/;
  return domainRegex.test(domain);
};

const generateSubdomain = (name: string) => {
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  const base = name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/gi, '');
  return `aitools.in-${base.substring(0, 6)}${randomSuffix}`;
};

const CreateAgentPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    description: '',
    plan: 'free',
    clientId: '',
    partnerId: '',
  });

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedWebsite, setGeneratedWebsite] = useState('');
  const [userData, setUserData] = useState<{ _id?: string; role?: string }>({});

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUserData(parsed);
      if (parsed._id && parsed.role === 'partner') {
        setFormData(prev => ({ ...prev, partnerId: parsed._id }));
      }
    }
  }, []);
console.log(formData.clientId,"sdkfnksjdnk");

  useEffect(() => {
    const fetchClients = async () => {
      if (!userData._id) return;
      try {
        const res = await axios.get(`${BASE_URL}/api/partner/${userData._id}`);
        setClients(res.data);
      } catch (err) {
        console.error('Error fetching clients:', err);
      }
    };
    fetchClients();
  }, [userData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'name') {
      if (isValidDomain(value)) {
        const website = generateSubdomain(value);
        setFormData(prev => ({ ...prev, website }));
        setGeneratedWebsite(website);
        setError('');
      } else {
        setGeneratedWebsite('');
        setError('Please enter a valid domain name (e.g., w3schools.com)');
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedWebsite);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        ...formData,
        isOwner: false,
      };

      const res = await axios.post(`${BASE_URL}/agent/createAgentForPartner`, payload);
      navigate(`/agents?client=${formData.clientId}`);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to create agent');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Create New Agent</h2>
      {error && <p className="text-red-600 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Enter a domain like w3schools.com"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {generatedWebsite && (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={generatedWebsite}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Copy
            </button>
          </div>
        )}

        <select
          name="clientId"
          value={formData.clientId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Client</option>
          {clients.map((client: any) => (
            <option key={client._id} value={client._id}>
              {client.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading || !generatedWebsite}
        >
          {loading ? 'Creating...' : 'Create Agent'}
        </button>
      </form>
    </div>
  );
};

export default CreateAgentPage;
