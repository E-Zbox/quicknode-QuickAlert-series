import { io, Socket } from "socket.io-client";
import { create } from "zustand";
// utils
import { IMenuItem, menuItems } from "@/utils/menu";

interface IAppStore {
  menuItems: IMenuItem[];
  setMenuItems: (newState: IMenuItem[]) => void;
  toggleMenuItemSelectedField: (title: string) => void;
  showMenu: boolean;
  toggleShowMenu: () => void;
  socket: Socket;
  setSocket: (newSocket: Socket) => void;
  socketConnected: boolean;
  setSocketConnected: (newState: boolean) => void;
}

export const useAppStore = create<IAppStore>((set) => ({
  menuItems: [],
  setMenuItems: (newState: IMenuItem[]) => set({ menuItems: newState }),
  toggleMenuItemSelectedField: (title: string) =>
    set((store) => {
      const updatedMenuItems = store.menuItems.map((item) => {
        if (item.title === title) {
          return { ...item, selected: true };
        }

        return { ...item, selected: false };
      });
      return {
        menuItems: updatedMenuItems,
      };
    }),
  showMenu: false,
  toggleShowMenu: () => set((store) => ({ showMenu: !store.showMenu })),
  socket: io(),
  setSocket: (newSocket: Socket) => set({ socket: newSocket }),
  socketConnected: false,
  setSocketConnected: (newState: boolean) => set({ socketConnected: newState }),
}));

export interface IAccessListEntity {
  address: string;
  storageKeys?: string[] | null;
}

export interface ITransaction {
  accessList?: IAccessListEntity[] | null;
  blockHash: string;
  blockNumber: string;
  chainId: string;
  from: string;
  gas: string;
  gasPrice: string;
  hash: string;
  input: string;
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
  nonce: string;
  r: string;
  s: string;
  to: string;
  transactionIndex: string;
  type: string;
  v: string;
  value: string;
}

interface ITransactionRecord {
  [address: string]: ITransaction[];
}

interface ITransactionStore {
  loading: boolean;
  setLoading: (newState: boolean) => void;
  searchQuery: string;
  setSearchQuery: (newState: string) => void;
  selectedAddress: string;
  setSelectedAddress: (newState: string) => void;
  txState: ITransactionRecord;
  setTxState: (newState: ITransactionRecord) => void;
  updateTxState: (newState: ITransaction[]) => void;
}

export const useTransactionStore = create<ITransactionStore>((set) => ({
  loading: false,
  setLoading: (newState: boolean) => set({ loading: newState }),
  searchQuery: "",
  setSearchQuery: (newState: string) => set({ searchQuery: newState }),
  selectedAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
  setSelectedAddress: (newState: string) => set({ selectedAddress: newState }),
  txState: {},
  setTxState: (newState: ITransactionRecord) => set({ txState: newState }),
  updateTxState: (newState: ITransaction[]) =>
    set((store) => {
      const key = store.selectedAddress;

      if (!store.txState[key]) {
        return {
          txState: {
            [key]: newState,
          },
        };
      }

      return {
        txState: {
          [key]: [...newState, ...store.txState[key]],
        },
      };
    }),
}));
