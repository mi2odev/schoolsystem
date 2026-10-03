import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const renderApp = (path = '/') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );

beforeEach(() => {
  window.localStorage.clear();
});

test('shows a helpful empty state when there are no students', () => {
  renderApp();
  expect(screen.getByText(/no students yet/i)).toBeInTheDocument();
});

test('adds a student, keeps it after reload, and never reuses IDs', () => {
  const addStudent = (nom, prenom) => {
    fireEvent.click(screen.getByRole('button', { name: /add student/i }));
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: nom } });
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: prenom } });
    ['S1', 'S2', 'S3', 'S4'].forEach(s =>
      fireEvent.change(screen.getByLabelText(new RegExp(`${s} average`, 'i')), { target: { value: '12' } })
    );
    fireEvent.click(screen.getByRole('button', { name: /add student/i }));
  };

  const { unmount } = renderApp();
  addStudent('Doe', 'Jane');
  addStudent('Roe', 'John');
  expect(screen.getByText('Jane')).toBeInTheDocument();

  // Delete the first student (after confirming), then add another one.
  jest.spyOn(window, 'confirm').mockReturnValue(true);
  const janeRow = screen.getByText('Jane').closest('tr');
  fireEvent.click(within(janeRow).getByRole('button', { name: /delete/i }));
  expect(screen.queryByText('Jane')).not.toBeInTheDocument();
  addStudent('Poe', 'Ann');
  expect(within(screen.getByText('Ann').closest('tr')).getByText('3')).toBeInTheDocument();

  // Data survives a reload.
  unmount();
  renderApp();
  expect(screen.getByText('John')).toBeInTheDocument();
  expect(screen.getByText('Ann')).toBeInTheDocument();
});

test('rejects duplicate speciality names', () => {
  renderApp('/specialites');
  const add = (name) => {
    fireEvent.click(screen.getByRole('button', { name: /add speciality/i }));
    fireEvent.change(screen.getByLabelText(/speciality name/i), { target: { value: name } });
    fireEvent.change(screen.getByLabelText(/total places/i), { target: { value: '10' } });
    fireEvent.click(screen.getByRole('button', { name: /add speciality/i }));
  };
  add('Math');
  add('math');
  expect(screen.getByText(/already exists/i)).toBeInTheDocument();
});
