export const USERS = {
  employee: {
    email: 'employee@gmail.com',
    password: 'employee@123',
    role: 'employee',
    name: 'Employee Demo'
  },
  manager: {
    email: 'manager@gmail.com',
    password: 'manager@123',
    role: 'manager',
    name: 'Manager Demo'
  },
  admin: {
    email: 'admin@gmail.com',
    password: 'admin@123',
    role: 'admin',
    name: 'Admin Demo'
  }
} as const;

export type UserRole = keyof typeof USERS;