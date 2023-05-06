export interface User {
  name: string;
  email: string;
  gender: string;
  address: { street: string; city: string };
  phone: string;
  id?: number | string;
}

export interface UserInfo extends User {
  id: number;
  key: number;
}

export interface ModalProps {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
}
export interface AddUserFormProps {
  closeModal: () => void;
  defaultValues?: User;
}

export interface Store {
  data?: UserInfo[] | undefined;
  fetchAllUsers: () => Promise<void>;
  addUser: (user: User) => Promise<void>;
  deleteUser: (email: string) => Promise<void>;
  editUser: (user: User) => Promise<void>;
}
