import { create } from 'zustand';

type ModalContextType = {
  title: string;
  children?: React.ReactNode;
  buttons: { label: string; onClick: () => void }[];
  resolve: (value: unknown) => void;
  reject?: () => void;
};

type ModalStoreType = {
  modalStack: ModalContextType[];
  addModal: (modal: ModalContextType) => void;
  closeModal: () => void;
  clearModalStack: () => void;
};

export const useModalStore = create<ModalStoreType>(set => ({
  modalStack: [],
  addModal: modal => {
    set(state => ({
      modalStack: [...state.modalStack, modal],
    }));
  },
  closeModal: () => {
    set(state => ({
      modalStack: state.modalStack.slice(0, -1),
    }));
  },
  clearModalStack: () => {
    set({ modalStack: [] });
  },
}));
