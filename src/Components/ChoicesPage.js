// Components/ChoicesPage.js
import React from 'react';
import { FaListOl } from 'react-icons/fa';
import { EmptyState } from './ui';

const ChoicesPage = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <EmptyState
        icon={FaListOl}
        title="Choices are coming soon"
        message="This page will let students pick their specialities. For now, use the Students and Specialités tabs."
      />
    </div>
  );
};

export default ChoicesPage;
