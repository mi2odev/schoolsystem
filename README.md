# Student Management System

A small React app to manage students, their specialities and their ranked choices. Data is kept in the browser with `localStorage`, so it works without a backend.

## Features

- **Students** — add, list and view student details
- **Spécialités** — manage the available specialities
- **Choices** — record and rank each student's speciality choices
- Responsive layout with a top navigation bar

## Stack

React · React Router · Material UI · Tailwind CSS · React Icons · Create React App

## Run it

```bash
npm install
npm start      # http://localhost:3000
npm run build  # production build in build/
```

## Structure

```
src/
  App.js                 routes + navigation
  Components/            StudentPage, StudentForm, StudentList, StudentDetails,
                         SpecialitePage, ChoicesPage, ui
  hooks/useLocalStorage  persists data in the browser
```
