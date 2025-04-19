export type Auth = {
  id: string;
  image: string;
  name: string;
  address?: string;
  lat?: string;
  lng?: string;
  email: string;
  phone?: string;
  birthday?: string;
  reward_points?: string;
  status?: string;
  refresh_token?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
};

export type LoginResponse = {
  status: number;
  message: string;
  user: Auth;
  access_token: string;
  token_type: string;
  error?: string;
};

export type Login = {
  email: string;
  password: string;
};

export type Register = {
  email: string;
  password: string;
  name: string;
};

export type ForgotPassword = {
  email: string;
  time: string;
  device: string;
};

export type ResetPassword = {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
};
