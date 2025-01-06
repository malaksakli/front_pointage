export interface User {
  token: any;
  id: number;
  username: string;
  password: string;
  role: 'ROLE_ADMIN' | 'ROLE_USER';  // Rôle de l'utilisateur
  }