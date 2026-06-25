// src/Components/StudentPage.js
import React, { useState } from 'react';
import { FaSearch, FaUserPlus } from 'react-icons/fa';
import StudentList from './StudentList';
import StudentForm from './StudentForm';

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSaveStudent = (student) => {
    if (editingStudent) {
      setStudents(students.map(s => 
        s.NumE === editingStudent.NumE ? { ...student, NumE: editingStudent.NumE } : s
      ));
      setEditingStudent(null);
    } else {
      setStudents([...students, { ...student, NumE: students.length + 1 }]);
    }
    setShowForm(false);
  };

  const handleDeleteStudent = (NumE) => {
    setStudents(students.filter(student => student.NumE !== NumE));
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  const filteredStudents = students.filter(student => 
    student.nom?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.prenom?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.NumE?.toString().includes(searchQuery)
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {showForm ? (
        <StudentForm 
          onSave={handleSaveStudent}
          onCancel={handleCancel}
          editingStudent={editingStudent}
        />
      ) : (
        <>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center flex-1 bg-gray-50 rounded-lg p-2">
              <FaSearch className="text-gray-400 ml-2" />
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-transparent border-none focus:outline-none"
              />
            </div>
            <button
              onClick={() => {
                setEditingStudent(null);
                setShowForm(true);
              }}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaUserPlus className="mr-2" />
              Add Student
            </button>
          </div>
          <StudentList 
            students={filteredStudents}
            onDelete={handleDeleteStudent}
            onEdit={handleEditStudent}
            selectedStudent={null}
            onSelect={() => {}}
          />
        </>
      )}
    </div>
  );
};

export default StudentPage;