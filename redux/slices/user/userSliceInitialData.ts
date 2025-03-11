import { IUser } from "@/types";

export interface IUserSlice {
  user: IUser;
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
    is_active: true,
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
