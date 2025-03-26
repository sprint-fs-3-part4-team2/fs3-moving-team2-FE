export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  passwordConfirmation: string;
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
