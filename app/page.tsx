import { getData } from "@/api";
import { Data, NamedId } from "@/api/types";
import Graph from "./components/Graph";
import StoreProvider from "./store/StoreProvider";

const fillDependencies = (
  id: NamedId,
  map: Map<string, NamedId[]>,
  rawArray?: string[]
) => {
  rawArray?.forEach((placeholder) => {
    // Init empty placeholder in the Map
    if (!map.has(placeholder)) {
      map.set(placeholder, []);
    }
    map.get(placeholder)?.push(id);
  });
};

const processData = (data: Data) => {
  const nodes: Set<NamedId> = new Set();
  const dependencies = new Map<string, NamedId[]>();

  const {
    data: {
      variables: { variables },
      additionalSources: { additionalSources },
      campaignSettings: { campaignSettings },
      feedExports: { feedExports },
    },
  } = data;

  variables.forEach(
    ({
      getConditionsPlaceholders,
      getPlaceholdersWithoutConditions,
      placeholderName,
      id,
      __typename,
      additionalSource,
    }) => {
      const node = { id, name: placeholderName, __typename };
      nodes.add(node);

      [getConditionsPlaceholders, getPlaceholdersWithoutConditions].forEach(
        (arr) => fillDependencies(node, dependencies, arr)
      );

      if (!additionalSource?.id) return;

      const source = additionalSources.find(
        (source) => source.id === additionalSource.id
      );

      if (!source?.name) return;

      // Add additional source as dependency
      fillDependencies(node, dependencies, [source.name]);
    }
  );

  additionalSources.forEach(
    ({ mappingField, mappingFields, id, name, __typename }) => {
      const node = {
        id: id.toString(),
        name: name ?? `Additional source #${id}`,
        __typename,
      };
      nodes.add(node);
      fillDependencies(node, dependencies, mappingFields);
      if (!mappingField) return;

      if (!dependencies.has(mappingField)) {
        dependencies.set(mappingField, []);
      }

      dependencies?.get(mappingField)?.push(node);
    }
  );

  feedExports.forEach(
    ({
      getConditionsPlaceholders,
      getPlaceholdersWithoutConditions,
      id,
      name,
      __typename,
    }) => {
      const node = { id: id.toString(), name, __typename };
      nodes.add(node);
      [getConditionsPlaceholders, getPlaceholdersWithoutConditions].forEach(
        (arr) => fillDependencies(node, dependencies, arr)
      );
    }
  );

  campaignSettings.forEach(
    ({
      keywordSettings,
      adwordsSetting,
      baseAdtexts,
      bidRules,
      getConditionsPlaceholders,
      getPlaceholdersWithoutConditions,
      id,
      name,
      __typename,
    }) => {
      const campaignNode = { id: id.toString(), name, __typename };
      nodes.add(campaignNode);
      [getConditionsPlaceholders, getPlaceholdersWithoutConditions].forEach(
        (arr) => fillDependencies(campaignNode, dependencies, arr)
      );

      [keywordSettings, baseAdtexts, bidRules].forEach((setting) =>
        setting.forEach(
          ({
            getConditionsPlaceholders,
            getPlaceholdersWithoutConditions,
            id,
            name,
            __typename,
          }) => {
            const innerNode = { id: id.toString(), name, __typename };
            // Add each campaign's sub-setting as dependency of the campaign
            fillDependencies(innerNode, dependencies, [campaignNode.name]);
            nodes.add(innerNode);
            [
              getConditionsPlaceholders,
              getPlaceholdersWithoutConditions,
            ].forEach((arr) => fillDependencies(innerNode, dependencies, arr));
          }
        )
      );

      // Adwords setting object
      const adwordNode = {
        id: adwordsSetting.id.toString(),
        name: "Adwords setting",
        __typename: adwordsSetting.__typename,
      };
      nodes.add(adwordNode);
      // Add to dependency of the campaign too
      fillDependencies(adwordNode, dependencies, [campaignNode.name]);

      [
        adwordsSetting.getConditionsPlaceholders,
        adwordsSetting.getPlaceholdersWithoutConditions,
      ].forEach((arr) => fillDependencies(adwordNode, dependencies, arr));
    }
  );

  return { nodes, deps: dependencies };
};

export default async function Home() {
  const apiData = await getData();
  const { nodes, deps } = processData(apiData);

  return (
    <main className="flex min-h-screen flex-col items-start justify-between">
      <StoreProvider data={apiData} nodes={nodes} deps={deps}>
        <Graph />
      </StoreProvider>
      {/* <Dendrogram data={data} height={400} width={400} /> */}
    </main>
  );
}
