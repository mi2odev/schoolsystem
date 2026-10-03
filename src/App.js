import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { FaGraduationCap, FaUsers, FaBook, FaListOl } from 'react-icons/fa';
import StudentPage from './Components/StudentPage';
import SpecialitePage from './Components/SpecialitePage';
import ChoicesPage from './Components/ChoicesPage';

const links = [
  { to: '/', label: 'Students', icon: FaUsers, end: true },
  { to: '/specialites', label: 'Specialités', icon: FaBook },
  { to: '/choices', label: 'Choices', icon: FaListOl },
];

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 py-3 sm:h-16 sm:py-0">
            <div className="flex items-center">
              <FaGraduationCap className="text-white text-2xl mr-2" />
              <h1 className="text-white text-xl font-bold">
                Student Management System
              </h1>
            </div>
            <div className="flex space-x-2">
              {links.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-white text-blue-600'
                        : 'text-white hover:bg-blue-500'
                    }`
                  }
                >
                  <Icon className="mr-2" />
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route path="/" element={<StudentPage />} />
          <Route path="/specialites" element={<SpecialitePage />} />
          <Route path="/choices" element={<ChoicesPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
