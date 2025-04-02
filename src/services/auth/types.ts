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

interface profile {
  id: string;
  userId: string;
  profileImage: string;
  location: string;
}

export interface AuthResponse {
  email: string;
  name: string;
  phoneNumber: string;
  userType: 'customer' | 'mover';
  profile: profile | null;
}

export type MyProfile = AuthResponse;
