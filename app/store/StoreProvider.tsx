"use client";

import { useState, createContext, useContext } from "react";
import { create } from "zustand";
import { Data, NamedId } from "@/api/types";

const createStore = (
  data: Data,
  nodes: Set<NamedId>,
  deps: Map<string, NamedId[]>
) =>
  create<{
    data: Data;
    nodes: Set<NamedId>;
    deps: Map<string, NamedId[]>;
    setData: (data: Data) => void;
  }>((set) => ({
    data,
    nodes,
    deps,
    setData(data: Data) {
      set({ data });
    },
  }));

const StoreContext = createContext<ReturnType<typeof createStore> | null>(null);

export const useStore = () => {
  if (!StoreContext)
    throw new Error("useStore must be used within a StoreProvider");
  return useContext(StoreContext)!;
};

const StoreProvider = ({
  data,
  nodes,
  deps,
  children,
}: {
  data: Data;
  nodes: Set<NamedId>;
  deps: Map<string, NamedId[]>;
  children: React.ReactNode;
}) => {
  const [store] = useState(() => createStore(data, nodes, deps));
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
