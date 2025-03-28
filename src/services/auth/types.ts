export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
  phoneNumber: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: 'customer' | 'mover';
  };
}
