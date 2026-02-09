import alice from '@/assets/alice.jpg'
import bob from '@/assets/bob.jpg'
import emma from '@/assets/emma.jpg'
import chloe from '@/assets/chloe.jpg'
import david from '@/assets/david.jpg'

export const defaultEmployees = [
  {
    id: 1,
    firstName: 'Alice',
    lastName: 'Martin',
    role: 'Frontend Developer',
    department: 'IT',
    email: 'alic.martin@company.com',
    phone: '+41 79 123 45 67',
    photo: alice,
    startDate: '2023-03-12',
    status: 'Active',
  },
  {
    id: 2,
    firstName: 'Bob',
    lastName: 'Dupont',
    role: 'Backend Developer',
    department: 'IT',
    email: 'bob.dupont@company.com',
    phone: '+41 78 234 56 78',
    photo: bob,
    startDate: '2022-09-01',
    status: 'Active',
  },
  {
    id: 3,
    firstName: 'Emma',
    lastName: 'Rossi',
    role: 'HR Manager',
    department: 'Human Resources',
    email: 'emma.rossi@company.com',
    phone: '+41 76 345 67 89',
    photo: emma,
    startDate: '2021-05-20',
    status: 'Active',
  },
  {
    id: 4,
    firstName: 'Chloe',
    lastName: 'Bernard',
    role: 'UX Designer',
    department: 'Design',
    email: 'chloe.bernard@company.com',
    phone: '+41 77 456 78 90',
    photo: chloe,
    startDate: '2023-01-10',
    status: 'On Leave',
  },
  {
    id: 5,
    firstName: 'David',
    lastName: 'Meier',
    role: 'Project Manager',
    department: 'Management',
    email: 'david.meier@company.com',
    phone: '+41 75 567 89 01',
    photo: david,
    startDate: '2020-11-03',
    status: 'Active',
  },
]

export const getEmployees = () => {
  const stored = localStorage.getItem('employees')
  return stored ? JSON.parse(stored) : defaultEmployees
}

export const saveEmployees = (employees) => {
  localStorage.setItem('employees', JSON.stringify(employees))
}
