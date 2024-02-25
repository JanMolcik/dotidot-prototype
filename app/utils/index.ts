import { Data, NamedId } from "@/api/types";

/**
 * Helper function to iterate array and set Map entries
 * @param id Id of node
 * @param map Map in which new node dependency will be added
 * @param rawArray Array of placeholder which should be added
 * as dependencies
 */
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

/**
 * Process data by constructing node for each entity and
 * map of dependencies which are then used to create nodes
 * with links (source -> target) to render graph
 * @param data Raw data from api endpoint
 * @returns Nodes and dependencies to be used to render graph
 */
export const processData = (data?: Data) => {
  const nodes: Set<NamedId> = new Set();
  const dependencies = new Map<string, NamedId[]>();

  if (!data) return { nodes, deps: dependencies };

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
