import { Data, NamedId, UnknownEntity, Variable } from "@/api/types";

/**
 * Helper function to iterate array and set Map entries
 * @param id Id of node
 * @param map Map in which new node dependency will be added
 * @param vriables
 * @param placeholderNames Array of placeholder which should be added
 * as dependencies
 */
const fillDependencies = (
  id: NamedId,
  map: Map<string, NamedId[]>,
  variables: Map<string, Variable>,
  ...placeholderNames: string[]
) => {
  placeholderNames?.forEach((placeholderName) => {
    const variable = variables.get(placeholderName);
    if (!variable) return;
    // Init empty placeholder in the Map
    if (!map.has(variable.id)) {
      map.set(variable.id, []);
    }
    map.get(variable.id)?.push(id);
  });
};

/**
 * Recursive function to expand data properties and search for dependencies
 * @param entity Unknown entity to inspect
 * @param nodes Map of nodes for Graph to store new node into
 * @param dependencies Map of dependencies (by id)
 * @param variables Map of variables by placeholderName
 * @param prevId In case of pairing campaign setting to each sub-settings (keywords, adwords etc.)
 * @returns void
 */

const recursivelyFillDependencies = (
  entity: Partial<UnknownEntity>,
  nodes: Map<string, NamedId>,
  dependencies: Map<string, NamedId[]>,
  variables: Map<string, Variable>,
  prevId?: string
) => {
  if (!entity) return;

  const {
    getConditionsPlaceholders,
    getPlaceholdersWithoutConditions,
    mappingField,
    mappingFields,
    parentId,
    id,
    name,
    __typename,
  } = entity;

  if (!id) return;

  let node = {
    id: id?.toString(),
    name,
    __typename,
  } as NamedId;

  if (!node.name) {
    if (__typename === "AdwordsSetting") {
      node.name = "Adwords setting";
    } else {
      node.name = `Entity #${id}`;
    }
  }

  if (nodes.has(node.id)) {
    node = { ...node, ...nodes.get(node.id) };
  }

  nodes.set(node.id, node);

  // Pair campaing setting (prevId) with current node
  if (prevId) {
    if (!dependencies.has(prevId)) {
      dependencies.set(prevId, []);
    }
    dependencies.get(prevId)?.push(node);
  }

  // Store dependency for adwords
  if (parentId) {
    const parentIdStr = parentId?.toString();
    if (!dependencies.has(parentIdStr)) {
      dependencies.set(parentIdStr, []);
    }
    dependencies.get(parentIdStr)?.push(node);
  }

  // Inspect and store dependecies in arrays of deps
  [
    getConditionsPlaceholders,
    getPlaceholdersWithoutConditions,
    mappingFields,
    mappingField ? [mappingField] : [],
  ].forEach((placeholderNameArray) => {
    if (!placeholderNameArray) return;
    fillDependencies(node, dependencies, variables, ...placeholderNameArray);
  });

  // Recursively search in all objects and arrays in properties of current entity
  Object.values(entity).forEach((value) => {
    // We don't care about other types than object or array
    if (!value || typeof value !== "object") return;

    // Check if value is array
    if (value?.length || value?.length === 0) {
      value.forEach((obj) => {
        // We don't care about non-expandable props
        if (typeof obj !== "object") return;

        recursivelyFillDependencies(
          obj as Partial<UnknownEntity>,
          nodes,
          dependencies,
          variables,
          entity.__typename === "CampaignSetting"
            ? entity.id?.toString()
            : undefined
        );
      });
    }

    // Value is object
    recursivelyFillDependencies(
      value as unknown as Partial<UnknownEntity>,
      nodes,
      dependencies,
      variables
    );
  });
};

/**
 * Process data by constructing node for each entity and
 * map of dependencies which are then used to create nodes
 * with links (source -> target) to render graph
 * @param data Raw data from api endpoint
 * @returns Nodes and dependencies to be used to render graph
 */
export const processData = (dataProp?: Data) => {
  const nodes: Map<string, NamedId> = new Map();
  const variables: Map<string, Variable> = new Map();
  const dependencies = new Map<string, NamedId[]>();

  if (!dataProp) return { nodes, deps: dependencies };

  const { data } = dataProp;

  const entities = Object.entries(data);

  // Firstly let's map variables by their placeholderName
  // so in the next mapping process, we can access a variable
  // by their name with O(1) complexity instead of searching for it
  // in array by their name just to get their id
  entities.forEach(([colName, collection]) => {
    collection[colName]?.forEach((unknownEntity) => {
      const entity = unknownEntity as Partial<UnknownEntity>;
      if (!entity || entity.__typename !== "DataSourceVariable") return;
      const variable = entity as unknown as Variable;
      variables.set(variable.placeholderName, variable);

      if (variable.additionalSource) {
        const sourceId = variable.additionalSource.id.toString();

        if (!dependencies.has(sourceId)) {
          dependencies.set(sourceId, []);
        }

        dependencies.get(sourceId)?.push({
          id: variable.id,
          __typename: variable.__typename,
          name: variable.name,
        });
      }
    });
  });

  // Now let's map dependencies using id's for all entities
  entities.forEach(([colName, collection]) => {
    collection[colName]?.forEach((unknownEntity: unknown) => {
      recursivelyFillDependencies(
        unknownEntity as Partial<UnknownEntity>,
        nodes,
        dependencies,
        variables
      );
    });
  });

  return { nodes, deps: dependencies };
};
