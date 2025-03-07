import { IEmployeeProfile } from "@/types";

export interface IUserSlice {
  user: IEmployeeProfile;
}
export const UserInitialState: IUserSlice = {
  user: {
    first_name: "",
    last_name: "",
    email: "",
    position: "",
    department: "",
    role: "",
    company: "",
    hashed_password: "",
    gender: "",
    marital_status: "",
    date_of_birth: "",
    phone_number: "",
    salary: 0,
    address: "",
    profile_picture: "",
    employment_status: "",
    date_joined: "",
    date_terminated: "",
    manager: "",
    emergency_contact: {
      name: "",
      phone: "",
      relation: "",
    },
  },
};
