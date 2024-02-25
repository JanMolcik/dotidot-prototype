"use client";

import { NamedId } from "@/api/types";
import { Autocomplete } from "@mantine/core";
import { useEffect, useState } from "react";
import { useStore } from "../store/StoreProvider";

const expandDependencies = (
  node: NamedId,
  deps: Map<string, NamedId[]>
): NamedId[] => {
  return [
    node,
    ...(deps.get(node.name) ?? []).flatMap((innerNode) =>
      expandDependencies(innerNode, deps)
    ),
  ];
};

function SearchBar() {
  const [search, setSearch] = useState("");
  const { originalNodes, nodes, deps, setNodes } = useStore()();

  useEffect(() => {
    if (!search) {
      setNodes(originalNodes);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      const filteredNodes = Array.from(originalNodes)
        .filter((node) =>
          node.name.toLowerCase().includes(search.toLocaleLowerCase())
        )
        .flatMap((node) => expandDependencies(node, deps));
      setNodes(new Set(filteredNodes));
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [search, deps, originalNodes, setNodes]);

  return (
    <Autocomplete
      className="w-full py-4 px-4"
      placeholder="Search by name"
      value={search}
      onChange={(value) => {
        setSearch(value);
      }}
      data={nodes.map((node) => node.name)}
    />
  );
}

export default SearchBar;
