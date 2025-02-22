// types/database.ts
export interface Lawyer {
    lawyer_id: number;
    auth_id: string;
    name: string;
    email: string;
    experience: number;
    specialty: string;
    location: string;
    rating?: number;
    jurisdiction: string;
    client_type: string;
    hourly_rate: number;
    avg_days_completion?: number;
    languages?: string;
  }
  
  export interface Client {
    client_id: number;
    auth_id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    budget?: number;
    languages?: string;
    preferred_contact_method: string;
  }