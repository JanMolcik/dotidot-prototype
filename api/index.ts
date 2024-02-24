import { setTimeout } from "timers/promises";
import { getAdditionalSources } from "./additional-sources";
import { getCampaignSettings } from "./campaign";
import { getFeedExports } from "./feed";
import { Data } from "./types";
import { getVariables } from "./variables";

export const getData = async (): Promise<Data> => {
  const variables = await getVariables();
  const additionalSources = await getAdditionalSources();
  const campaignSettings = await getCampaignSettings();
  const feedExports = await getFeedExports();

  await setTimeout(500);

  return {
    data: {
      variables,
      additionalSources,
      campaignSettings,
      feedExports,
    },
  };
};
