import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { FaGraduationCap } from 'react-icons/fa';
import StudentPage from './Components/StudentPage';
import SpecialitePage from './Components/SpecialitePage';
import ChoicesPage from './Components/ChoicesPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <FaGraduationCap className="text-white text-2xl mr-2" />
              <h1 className="text-white text-xl font-bold">
                Student Management System
              </h1>
            </div>
            <div className="flex space-x-4">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-white text-blue-600'
                      : 'text-white hover:bg-blue-500'
                  }`
                }
              >
                Students
              </NavLink>
              <NavLink
                to="/specialites"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-white text-blue-600'
                      : 'text-white hover:bg-blue-500'
                  }`
                }
              >
                Specialités
              </NavLink>
              <NavLink
                to="/choices"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-white text-blue-600'
                      : 'text-white hover:bg-blue-500'
                  }`
                }
              >
                Choices
              </NavLink>
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
