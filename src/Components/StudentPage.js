// src/Components/StudentPage.js
import React, { useState } from 'react';
import { FaSearch, FaUserPlus, FaUsers, FaTimes } from 'react-icons/fa';
import StudentList from './StudentList';
import StudentForm from './StudentForm';
import StudentDetails from './StudentDetails';
import { EmptyState } from './ui';
import useLocalStorage, { nextId } from '../hooks/useLocalStorage';

const StudentPage = () => {
  const [students, setStudents] = useLocalStorage('students', []);
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSaveStudent = (student) => {
    if (editingStudent) {
      const updated = { ...student, NumE: editingStudent.NumE };
      setStudents(students.map(s => (s.NumE === editingStudent.NumE ? updated : s)));
      if (selectedStudent?.NumE === updated.NumE) setSelectedStudent(updated);
      setEditingStudent(null);
    } else {
      setStudents([...students, { ...student, NumE: nextId(students, 'NumE') }]);
    }
    setShowForm(false);
  };

  const handleDeleteStudent = (student) => {
    if (!window.confirm(`Delete ${student.prenom} ${student.nom}? This cannot be undone.`)) return;
    setStudents(students.filter(s => s.NumE !== student.NumE));
    if (selectedStudent?.NumE === student.NumE) setSelectedStudent(null);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingStudent(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  const query = searchQuery.trim().toLowerCase();
  const filteredStudents = students.filter(student =>
    student.nom?.toLowerCase().includes(query) ||
    student.prenom?.toLowerCase().includes(query) ||
    `${student.prenom} ${student.nom}`.toLowerCase().includes(query) ||
    student.NumE?.toString().includes(query)
  );

  const addButton = (
    <button
      onClick={handleAdd}
      className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      <FaUserPlus className="mr-2" />
      Add Student
    </button>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      {showForm ? (
        <StudentForm
          onSave={handleSaveStudent}
          onCancel={handleCancel}
          editingStudent={editingStudent}
        />
      ) : students.length === 0 ? (
        <EmptyState
          icon={FaUsers}
          title="No students yet"
          message="Add your first student to get started."
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
              ? `${filteredStudents.length} of ${students.length} students match "${searchQuery.trim()}"`
              : `${students.length} student${students.length === 1 ? '' : 's'} · click a row to see details`}
          </p>

          {filteredStudents.length === 0 ? (
            <EmptyState
              icon={FaSearch}
              title="No matching students"
              message="Try a different name or ID."
            />
          ) : (
            <StudentList
              students={filteredStudents}
              onDelete={handleDeleteStudent}
              onEdit={handleEditStudent}
              selectedStudent={selectedStudent}
              onSelect={(student) =>
                setSelectedStudent(selectedStudent?.NumE === student.NumE ? null : student)
              }
            />
          )}

          <StudentDetails student={selectedStudent} onClose={() => setSelectedStudent(null)} />
        </>
      )}
    </div>
  );
};

export default StudentPage;
