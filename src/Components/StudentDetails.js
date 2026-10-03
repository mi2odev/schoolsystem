import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { studentAverage } from './ui';

const StudentDetails = ({ student, onClose }) => {
  if (!student) {
    return null;
  }

  const average = studentAverage(student);
  const passed = Number(average) >= 10;

  return (
    <div className="mt-6 border border-blue-100 bg-blue-50 rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {student.prenom} {student.nom}
          </h3>
          <p className="text-sm text-gray-500">Student ID: {student.NumE}</p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close details"
          className="p-2 text-gray-500 hover:text-gray-800 rounded-lg hover:bg-blue-100"
        >
          <FaTimes />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
        {['moyS1', 'moyS2', 'moyS3', 'moyS4'].map((key, i) => (
          <div key={key} className="bg-white rounded-lg p-3 text-center shadow-sm">
            <div className="text-xs text-gray-500 uppercase">Semester {i + 1}</div>
            <div className="text-lg font-semibold">{student[key]}</div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-lg">
        Overall average:{' '}
        <span className={`font-bold ${passed ? 'text-green-700' : 'text-red-700'}`}>
          {average} / 20
        </span>
      </p>
    </div>
  );
};

export default StudentDetails;
