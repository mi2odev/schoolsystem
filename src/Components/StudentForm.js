import React, { useState } from 'react';
import { FaSave, FaTimes, FaUserPlus } from 'react-icons/fa';

const StudentForm = ({ onSave, onCancel, editingStudent }) => {
  const [formData, setFormData] = useState(
    editingStudent || {
      nom: '',
      prenom: '',
      moyS1: '',
      moyS2: '',
      moyS3: '',
      moyS4: ''
    }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        <FaUserPlus className="text-blue-600 text-2xl mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Add New Student</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">S1 Average</label>
            <input
              type="number"
              name="moyS1"
              value={formData.moyS1}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              step="0.01"
              min="0"
              max="20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">S2 Average</label>
            <input
              type="number"
              name="moyS2"
              value={formData.moyS2}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              step="0.01"
              min="0"
              max="20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">S3 Average</label>
            <input
              type="number"
              name="moyS3"
              value={formData.moyS3}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              step="0.01"
              min="0"
              max="20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">S4 Average</label>
            <input
              type="number"
              name="moyS4"
              value={formData.moyS4}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              step="0.01"
              min="0"
              max="20"
            />
          </div>
        </div>
        
        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaSave className="mr-2" />
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <FaTimes className="mr-2" />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;