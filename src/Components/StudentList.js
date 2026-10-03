import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { thClass, tdClass, studentAverage } from './ui';

const averageBadge = (avg) =>
  avg >= 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

const StudentList = ({ students, onSelect, selectedStudent, onDelete, onEdit }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className={thClass}>ID</th>
            <th className={thClass}>Last Name</th>
            <th className={thClass}>First Name</th>
            <th className={thClass}>S1</th>
            <th className={thClass}>S2</th>
            <th className={thClass}>S3</th>
            <th className={thClass}>S4</th>
            <th className={thClass}>Average</th>
            <th className={thClass}>Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.map(student => {
            const avg = studentAverage(student);
            return (
              <tr
                key={student.NumE}
                onClick={() => onSelect(student)}
                title="Click to see details"
                className={`hover:bg-gray-50 cursor-pointer ${
                  selectedStudent?.NumE === student.NumE ? 'bg-blue-50' : ''
                }`}
              >
                <td className={tdClass}>{student.NumE}</td>
                <td className={tdClass}>{student.nom}</td>
                <td className={tdClass}>{student.prenom}</td>
                <td className={tdClass}>{student.moyS1}</td>
                <td className={tdClass}>{student.moyS2}</td>
                <td className={tdClass}>{student.moyS3}</td>
                <td className={tdClass}>{student.moyS4}</td>
                <td className={tdClass}>
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-sm font-medium ${averageBadge(avg)}`}>
                    {avg}
                  </span>
                </td>
                <td className={tdClass}>
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
                        onDelete(student);
                      }}
                      className="flex items-center px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                      <FaTrash className="mr-1" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
