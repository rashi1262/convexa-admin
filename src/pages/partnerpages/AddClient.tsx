import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../common/siteConstants';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
interface UserData {
    name?: string;
    email?: string;
    photoURL?: string;
    // Add more fields if present in localStorage
  }
const AddUserForm = () => {
  const navigate = useNavigate();
    const [userData, setUserData] = useState<UserData>({});
    
      useEffect(() => {
        const data = localStorage.getItem('userData');
        if (data) {
          setUserData(JSON.parse(data));
        }
      }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    googleLog:true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
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
      const response = await axios.post(`${BASE_URL}/api/create`, {
        ...formData,
        partnerId: userData._id,  // ← include partnerId
      });
  
      console.log('User created:', response.data);
      setSuccess('User created successfully!');
      toast.success("User created successfully!");
      setFormData({ name: '', email: '' });
      navigate(`/store`);
    } catch (error: any) {
      console.error('Error creating user:', error);
      setErrors({ general: error?.response?.data?.message || 'Something went wrong' });
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create User</h2>

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
        Submit
      </button>
    </form>
  );
};

export default AddUserForm;
