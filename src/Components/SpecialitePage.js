// Components/SpecialitePage.js
import React, { useState } from 'react';
import { FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const SpecialitePage = () => {
  const [specialites, setSpecialites] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSpecialite, setEditingSpecialite] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSaveSpecialite = (specialite) => {
    if (editingSpecialite) {
      setSpecialites(specialites.map(s => 
        s.NumSpec === editingSpecialite.NumSpec ? { ...specialite, NumSpec: editingSpecialite.NumSpec } : s
      ));
      setEditingSpecialite(null);
    } else {
      setSpecialites([...specialites, { ...specialite, NumSpec: specialites.length + 1 }]);
    }
    setShowForm(false);
  };

  const handleDelete = (NumSpec) => {
    setSpecialites(specialites.filter(spec => spec.NumSpec !== NumSpec));
  };

  const handleEdit = (specialite) => {
    setEditingSpecialite(specialite);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSpecialite(null);
  };

  const filteredSpecialites = specialites.filter(spec => 
    spec.nomSpec.toLowerCase().includes(searchQuery.toLowerCase()) ||
    spec.NumSpec.toString().includes(searchQuery)
  );

  const SpecialiteForm = ({ onSave, onCancel, editingSpecialite }) => {
    const [formData, setFormData] = useState(
      editingSpecialite || {
        nomSpec: '',
        nbrPlaces: '',
        placesAvailable: '' // Will be set equal to nbrPlaces initially
      }
    );

    const handleSubmit = (e) => {
      e.preventDefault();
      // Set placesAvailable equal to nbrPlaces for new specialities
      onSave({
        ...formData,
        placesAvailable: formData.placesAvailable || formData.nbrPlaces
      });
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Speciality Name</label>
            <input
              type="text"
              value={formData.nomSpec}
              onChange={(e) => setFormData({...formData, nomSpec: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Places</label>
            <input
              type="number"
              value={formData.nbrPlaces}
              onChange={(e) => setFormData({
                ...formData, 
                nbrPlaces: e.target.value,
                placesAvailable: e.target.value // Update available places when total changes
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              min="1"
            />
          </div>
        </div>
        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {showForm ? (
        <SpecialiteForm 
          onSave={handleSaveSpecialite}
          onCancel={handleCancel}
          editingSpecialite={editingSpecialite}
        />
      ) : (
        <>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center flex-1 bg-gray-50 rounded-lg p-2">
              <FaSearch className="text-gray-400 ml-2" />
              <input
                type="text"
                placeholder="Search specialities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-transparent border-none focus:outline-none"
              />
            </div>
            <button
              onClick={() => {
                setEditingSpecialite(null);
                setShowForm(true);
              }}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaPlus className="mr-2" />
              Add Speciality
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-10 py-5 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-10 py-5 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-10 py-5 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Total Places</th>
                  <th className="px-10 py-5 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Available Places</th>
                  <th className="px-10 py-5 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSpecialites.map(specialite => (
                  <tr key={specialite.NumSpec}>
                    <td className="px-6 py-4 whitespace-nowrap">{specialite.NumSpec}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{specialite.nomSpec}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{specialite.nbrPlaces}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium
                        ${specialite.placesAvailable === 0 
                          ? 'bg-red-100 text-red-800' 
                          : specialite.placesAvailable < 5 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                        {specialite.placesAvailable}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(specialite)}
                          className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          <FaEdit className="mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(specialite.NumSpec)}
                          className="flex items-center px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                        >
                          <FaTrash className="mr-1" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default SpecialitePage;