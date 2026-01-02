export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'guest';
  created_at: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
}

export interface News {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  service_id: string | null;
  created_at: string;
  service?: Service;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  service_id: string;
  subject: string;
  message: string;
  created_at: string;
}

export interface Appointment {
  id: string;
  user_id: string;
  service_id: string;
  date: string;
  time: string;
  description: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  service?: Service;
}

export type ColorScheme = 'light' | 'dark';
