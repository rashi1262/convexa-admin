import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../common/siteConstants';

const EditClientForm = () => {
  const { id } = useParams(); // <-- get client ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (id) {
      axios.get(`${BASE_URL}/api/getUserById/${id}`)
        .then(res => {
          const { name,email } = res.data;
          setFormData({ name,email });
        })
        .catch(err => {
          console.error('Error fetching client:', err);
          setErrors({ general: 'Failed to fetch client data' });
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'email is required';
   
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.put(`${BASE_URL}/api/updateUserById/${id}`, formData);
      setSuccess('Client updated successfully!');
      setTimeout(() => navigate(-1), 1000); // navigate back after success
    } catch (error: any) {
      console.error('Error updating client:', error);
      setErrors({ general: error?.response?.data?.message || 'Something went wrong' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Client</h2>

      {success && <p className="text-green-600 mb-2">{success}</p>}
      {errors.general && <p className="text-red-500 mb-2">{errors.general}</p>}

      {['name', 'email'].map((field) => (
        <div className="mb-4" key={field}>
          <label className="block mb-1 font-medium capitalize">{field}</label>
          <input
            type="text"
            name={field}
            value={(formData as any)[field]}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
        </div>
      ))}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Update Client
      </button>
    </form>
  );
};

export default EditClientForm;
