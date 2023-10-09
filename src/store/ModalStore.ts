import { getTodosGroupedByColumn } from "@/utils/getTodosGroupedByColumns";
import { create } from "zustand";
import { databases, storage } from "../../appwrite";

interface Store {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create<Store>()((set, get) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
