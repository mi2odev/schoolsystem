// Components/SpecialitePage.js
import React, { useState } from 'react';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaBook } from 'react-icons/fa';
import { EmptyState, inputClass, thClass, tdClass } from './ui';
import useLocalStorage, { nextId } from '../hooks/useLocalStorage';

const SpecialiteForm = ({ onSave, onCancel, editingSpecialite, existingNames }) => {
  const [nomSpec, setNomSpec] = useState(editingSpecialite?.nomSpec || '');
  const [nbrPlaces, setNbrPlaces] = useState(editingSpecialite?.nbrPlaces ?? '');
  const [error, setError] = useState('');

  // Places already taken stay taken when the total is changed.
  const taken = editingSpecialite
    ? Number(editingSpecialite.nbrPlaces) - Number(editingSpecialite.placesAvailable)
    : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nomSpec.trim();
    const total = Number(nbrPlaces);

    if (existingNames.includes(name.toLowerCase())) {
      setError(`A speciality named "${name}" already exists.`);
      return;
    }
    if (total < taken) {
      setError(`${taken} places are already taken, so the total cannot be lower than ${taken}.`);
      return;
    }
    onSave({ nomSpec: name, nbrPlaces: total, placesAvailable: total - taken });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <FaBook className="text-blue-600 text-2xl mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">
          {editingSpecialite ? `Edit ${editingSpecialite.nomSpec}` : 'Add New Speciality'}
        </h2>
      </div>
      <form onSubmit={handleSubmit} onKeyDown={(e) => e.key === 'Escape' && onCancel()} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nomSpec" className="block text-sm font-medium text-gray-700">Speciality Name</label>
            <input
              id="nomSpec"
              type="text"
              value={nomSpec}
              onChange={(e) => { setNomSpec(e.target.value); setError(''); }}
              className={inputClass}
              placeholder="e.g. Computer Science"
              required
              autoFocus
            />
          </div>
          <div>
            <label htmlFor="nbrPlaces" className="block text-sm font-medium text-gray-700">Total Places</label>
            <input
              id="nbrPlaces"
              type="number"
              value={nbrPlaces}
              onChange={(e) => { setNbrPlaces(e.target.value); setError(''); }}
              className={inputClass}
              placeholder="e.g. 30"
              required
              min="1"
              step="1"
            />
            {taken > 0 && (
              <p className="text-xs text-gray-500 mt-1">{taken} places already taken.</p>
            )}
          </div>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaSave className="mr-2" />
            {editingSpecialite ? 'Save Changes' : 'Add Speciality'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 flex items-center justify-center bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <FaTimes className="mr-2" />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const availabilityBadge = (available) =>
  available === 0
    ? 'bg-red-100 text-red-800'
    : available < 5
      ? 'bg-yellow-100 text-yellow-800'
      : 'bg-green-100 text-green-800';

const SpecialitePage = () => {
  const [specialites, setSpecialites] = useLocalStorage('specialites', []);
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
      setSpecialites([...specialites, { ...specialite, NumSpec: nextId(specialites, 'NumSpec') }]);
    }
    setShowForm(false);
  };

  const handleDelete = (specialite) => {
    if (!window.confirm(`Delete the speciality "${specialite.nomSpec}"? This cannot be undone.`)) return;
    setSpecialites(specialites.filter(spec => spec.NumSpec !== specialite.NumSpec));
  };

  const handleEdit = (specialite) => {
    setEditingSpecialite(specialite);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingSpecialite(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSpecialite(null);
  };

  const query = searchQuery.trim().toLowerCase();
  const filteredSpecialites = specialites.filter(spec =>
    spec.nomSpec.toLowerCase().includes(query) ||
    spec.NumSpec.toString().includes(query)
  );

  const existingNames = specialites
    .filter(s => s.NumSpec !== editingSpecialite?.NumSpec)
    .map(s => s.nomSpec.toLowerCase());

  const addButton = (
    <button
      onClick={handleAdd}
      className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      <FaPlus className="mr-2" />
      Add Speciality
    </button>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      {showForm ? (
        <SpecialiteForm
          onSave={handleSaveSpecialite}
          onCancel={handleCancel}
          editingSpecialite={editingSpecialite}
          existingNames={existingNames}
        />
      ) : specialites.length === 0 ? (
        <EmptyState
          icon={FaBook}
          title="No specialities yet"
          message="Add a speciality and the number of places it offers."
          action={addButton}
        />
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center flex-1 bg-gray-50 rounded-lg p-2 border border-gray-200 focus-within:border-blue-500">
              <FaSearch className="text-gray-400 ml-2" />
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-transparent border-none focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="p-2 text-gray-400 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              )}
            </div>
            {addButton}
          </div>

          <p className="text-sm text-gray-500 mb-2">
            {query
              ? `${filteredSpecialites.length} of ${specialites.length} specialities match "${searchQuery.trim()}"`
              : `${specialites.length} ${specialites.length === 1 ? 'speciality' : 'specialities'}`}
          </p>

          {filteredSpecialites.length === 0 ? (
            <EmptyState
              icon={FaSearch}
              title="No matching specialities"
              message="Try a different name or ID."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className={thClass}>ID</th>
                    <th className={thClass}>Name</th>
                    <th className={thClass}>Total Places</th>
                    <th className={thClass}>Available Places</th>
                    <th className={thClass}>Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSpecialites.map(specialite => (
                    <tr key={specialite.NumSpec} className="hover:bg-gray-50">
                      <td className={tdClass}>{specialite.NumSpec}</td>
                      <td className={tdClass}>{specialite.nomSpec}</td>
                      <td className={tdClass}>{specialite.nbrPlaces}</td>
                      <td className={tdClass}>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${availabilityBadge(Number(specialite.placesAvailable))}`}>
                          {specialite.placesAvailable}
                        </span>
                      </td>
                      <td className={tdClass}>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(specialite)}
                            className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            <FaEdit className="mr-1" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(specialite)}
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
          )}
        </>
      )}
    </div>
  );
};

export default SpecialitePage;
