import { AdditionalSource, AdditionalSources } from "./types";

const additionalSources: AdditionalSources = {
  additionalSources: [
    {
      id: 17,
      icon: "enrich-weather",
      name: "Počasí #1",
      mappingField: "Praha",
      mappingFields: [],
      __typename: "AdditionalSource",
    },
    {
      id: 18,
      icon: "enrich-sheet",
      name: "Google spreadsheet #2",
      mappingField: "brand",
      mappingFields: [],
      __typename: "AdditionalSource",
    },
  ],
  __typename: "Collection",
};

export const getAdditionalSources = async (): Promise<AdditionalSources> => {
  return additionalSources;
};

export const addAdditionalSource = async (
  additionalSource: AdditionalSource
): Promise<AdditionalSources> => {
  additionalSources.additionalSources.push(additionalSource);
  return additionalSources;
};
