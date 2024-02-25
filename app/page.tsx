import { getData } from "@/api";
import Graph from "./components/Graph";
import SearchBar from "./components/SearchBar";
import StoreProvider from "./store/StoreProvider";
import { processData } from "./utils";

export default async function Home() {
  const apiData = await getData();
  const { nodes, deps } = processData(apiData);

  return (
    <main className="w-full flex min-h-screen flex-col">
      <StoreProvider data={apiData} nodes={nodes} deps={deps}>
        <SearchBar />
        <Graph />
      </StoreProvider>
    </main>
  );
}
