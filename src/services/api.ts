import { supabase } from '@/config/supabase';
import { News, Service, Message, Appointment } from '@/types';

export const authService = {
  async signUp(email: string, password: string, name: string) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('User creation failed');

    const { error: profileError } = await supabase
      .from('users')
      .insert([
        {
          id: authData.user.id,
          email,
          name,
          role: 'user',
        },
      ]);

    if (profileError) throw profileError;

    return authData;
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return data;
  },
};

export const newsService = {
  async getNews(serviceId?: string): Promise<News[]> {
    let query = supabase
      .from('news')
      .select('*, service:services(*)')
      .order('created_at', { ascending: false });

    if (serviceId) {
      query = query.eq('service_id', serviceId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },
};

export const serviceService = {
  async getServices(): Promise<Service[]> {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
  },
};

export const messageService = {
  async createMessage(message: Omit<Message, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('messages')
      .insert([message])
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

export const appointmentService = {
  async createAppointment(appointment: Omit<Appointment, 'id' | 'created_at' | 'status'>) {
    const { data, error } = await supabase
      .from('appointments')
      .insert([{ ...appointment, status: 'pending' }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getUserAppointments(userId: string): Promise<Appointment[]> {
    const { data, error } = await supabase
      .from('appointments')
      .select('*, service:services(*)')
      .eq('user_id', userId)
      .order('date', { ascending: true });

    if (error) throw error;
    return data || [];
  },
};
