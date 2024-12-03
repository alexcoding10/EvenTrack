import { User } from '@/types/user';
import { create } from 'zustand';

type Store = {
  user: User | null;
  updateUser: (user: User) => void;
};

const useStore = create<Store>((set) => ({
  user: null,
  updateUser: (user: User) => set((state) => ({ ...state, user })),
}));

export default useStore;
