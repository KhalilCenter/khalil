export interface Doctor {
  name: string;
  specialty: string;
  schedule: string[];
  whatsappMessage: string;
}

export interface SpecialtyData {
  id: string;
  label: string;
  doctors: Doctor[];
}

export type TabId = 'home' | 'contact' | 'specialties' | 'operations' | 'lab' | 'jobs';

export interface JobFormData {
  name: string;
  phone: string;
  age: string;
  type: string;
}