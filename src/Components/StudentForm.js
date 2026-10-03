import React, { useState } from 'react';
import { FaSave, FaTimes, FaUserPlus, FaUserEdit } from 'react-icons/fa';
import { inputClass, studentAverage } from './ui';

const semesters = ['moyS1', 'moyS2', 'moyS3', 'moyS4'];

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
    onSave({
      ...formData,
      nom: formData.nom.trim(),
      prenom: formData.prenom.trim(),
      ...Object.fromEntries(semesters.map(s => [s, Number(formData[s])]))
    });
  };

  const allGradesEntered = semesters.every(s => formData[s] !== '');
  const Icon = editingStudent ? FaUserEdit : FaUserPlus;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg">
      <div className="flex items-center mb-6">
        <Icon className="text-blue-600 text-2xl mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">
          {editingStudent ? `Edit ${editingStudent.prenom} ${editingStudent.nom}` : 'Add New Student'}
        </h2>
      </div>
      <form onSubmit={handleSubmit} onKeyDown={(e) => e.key === 'Escape' && onCancel()} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              id="nom"
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className={inputClass}
              required
              autoFocus
            />
          </div>
          <div>
            <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              id="prenom"
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
          {semesters.map((name, i) => (
            <div key={name}>
              <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                S{i + 1} Average <span className="text-gray-400 font-normal">(0 – 20)</span>
              </label>
              <input
                id={name}
                type="number"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className={inputClass}
                required
                step="0.01"
                min="0"
                max="20"
                placeholder="e.g. 12.5"
              />
            </div>
          ))}
        </div>

        {allGradesEntered && (
          <p className="text-sm text-gray-600">
            Overall average: <span className="font-semibold">{studentAverage(formData)}</span>
          </p>
        )}

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaSave className="mr-2" />
            {editingStudent ? 'Save Changes' : 'Add Student'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
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
