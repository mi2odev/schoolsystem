import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const StudentList = ({ students, onSelect, selectedStudent, onDelete, onEdit }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-6"> 
      <div className="flex justify-between items-center mb-6">
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg p-6 mb-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-10 py-5 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-10 py-5 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
              <th className="px-10 py-5 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">First Name</th>
              <th className="px-10 py-5 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">S1</th>
              <th className="px-10 py-5 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">S2</th>
              <th className="px-10 py-5 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">S3</th>
              <th className="px-10 py-5 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">S4</th>
              <th className="px-10 py-5 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map(student => (
              <tr 
                key={student.NumE}
                onClick={() => onSelect(student)}
                className={`hover:bg-gray-50 cursor-pointer ${
                  selectedStudent?.NumE === student.NumE ? 'bg-blue-50' : ''
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">{student.NumE}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.nom}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.prenom}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.moyS1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.moyS2}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.moyS3}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.moyS4}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(student);
                      }}
                      className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <FaEdit className="mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(student.NumE);
                      }}
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
    </div>
  );
};

export default StudentList;