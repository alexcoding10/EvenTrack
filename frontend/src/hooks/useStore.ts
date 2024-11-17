import { User } from "@/types/user";
import {create} from "zustand";

const useStore = create((set)=>({
    user:null,
    setUser:(user:User) => set({user})
}))