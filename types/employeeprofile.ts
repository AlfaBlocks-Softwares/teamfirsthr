export interface IEmployeeProfile {
  first_name: string;
  last_name: string;
  email: string;
  position: string;
  department: string;
  role: string;
  company: string;
  hashed_password: string;
  gender: string;
  marital_status: string;
  date_of_birth: string;
  phone_number: string;
  salary: number;
  address: string;
  profile_picture: string;
  employment_status: string;
  date_joined: string;
  date_terminated?: string | null;
  manager?: string;
  emergency_contact?: {
    name?: string;
    phone?: string;
    relation?: string;
  };
}

export interface IUser {
  _id?: string;
  first_name: string;
  last_name: string;
  email: string;
  position: string;
  department: string;
  role: string;
  company: string;
  hashed_password: string;
  gender: string;
  marital_status: string;
  date_of_birth: string;
  phone_number: string;
  salary: number;
  address: string;
  profile_picture: string;
  employment_status: string;
  date_joined: string;
  date_terminated?: string | null;
  manager?: string;
  is_active: boolean;
  emergency_contact?: {
    name?: string;
    phone?: string;
    relation?: string;
  };
}
