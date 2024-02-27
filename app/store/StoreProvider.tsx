"use client";

import { Data, NamedId } from "@/api/types";
import { createContext, useContext, useState } from "react";
import { create } from "zustand";

const createStore = (
  data: Data | undefined,
  nodes: Map<string, NamedId>,
  deps: Map<string, NamedId[]>
) =>
  create<{
    data: Data | undefined;
    originalNodes: Map<string, NamedId>;
    nodes: NamedId[];
    setNodes: (nodes: Map<string, NamedId>) => void;
    originalDeps: Map<string, NamedId[]>;
    deps: Map<string, NamedId[]>;
    setData: (data: Data) => void;
  }>((set) => ({
    data,
    originalNodes: nodes,
    nodes: Array.from(nodes).map(([, value]) => value),
    setNodes(nodes: Map<string, NamedId>) {
      set({ nodes: Array.from(nodes.values()) });
    },
    originalDeps: deps,
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
  data: Data | undefined;
  nodes: Map<string, NamedId>;
  deps: Map<string, NamedId[]>;
  children: React.ReactNode;
}) => {
  const [store] = useState(() => createStore(data, nodes, deps));
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
