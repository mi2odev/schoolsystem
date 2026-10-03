import React from 'react';

export const inputClass =
  'mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200';

export const thClass =
  'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider';

export const tdClass = 'px-6 py-4 whitespace-nowrap';

export const studentAverage = (student) =>
  (
    (Number(student.moyS1) +
      Number(student.moyS2) +
      Number(student.moyS3) +
      Number(student.moyS4)) /
    4
  ).toFixed(2);

export const EmptyState = ({ icon: Icon, title, message, action }) => (
  <div className="text-center py-12 px-4">
    {Icon && <Icon className="mx-auto text-4xl text-gray-300 mb-3" />}
    <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    {message && <p className="text-gray-500 mt-1">{message}</p>}
    {action && <div className="mt-4">{action}</div>}
  </div>
);
