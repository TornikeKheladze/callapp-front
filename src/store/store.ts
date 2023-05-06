import { create } from "zustand";
import { add, getAllUsers, userDelete, userEdit } from "../services/axios";
import { Store, User, UserInfo } from "../types/global";

const useUserStore = create<Store>((set) => ({
  data: [],
  fetchAllUsers: async () => {
    const response = await getAllUsers();
    const dataWithKeys = response.data.map((user: UserInfo) => {
      return { ...user, key: user.id };
    });
    set({ data: dataWithKeys });
  },
  addUser: async (user: User) => {
    await add(user);
    const response = await getAllUsers();
    const dataWithKeys = response.data.map((user: UserInfo) => {
      return { ...user, key: user.id };
    });
    set({ data: dataWithKeys });
  },
  deleteUser: async (email: string) => {
    await userDelete(email);
    set((state: any) => ({
      data: [...state.data.filter((user: UserInfo) => user.email !== email)],
    }));
  },
  editUser: async (user: User) => {
    await userEdit(user);
    set((state: any) => ({
      data: [
        ...state.data.map((userInfo: UserInfo) => {
          if (userInfo.id === user.id) {
            return { ...userInfo, ...user };
          } else {
            return userInfo;
          }
        }),
      ],
    }));
  },
}));

export default useUserStore;
