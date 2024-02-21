import { FeedExport, FeedExports } from "./types";

const feedExports: FeedExports = {
  feedExports: [
    {
      id: 110,
      icon: "feed-export-dsa",
      name: "Feed export #2",
      getPlaceholdersWithoutConditions: ["url"],
      getConditionsPlaceholders: ["brand"],
      __typename: "FeedExport",
    },
    {
      id: 111,
      icon: "shopmania",
      name: "Feed export #3",
      getPlaceholdersWithoutConditions: [
        "brand",
        "image_url",
        "pricemin",
        "product_id",
        "product_name",
        "url",
      ],
      getConditionsPlaceholders: [],
      __typename: "FeedExport",
    },
    {
      id: 109,
      icon: "feed-export-gmc",
      name: "Feed export #1",
      getPlaceholdersWithoutConditions: [
        "brand",
        "image_url",
        "nazev_bez_brandu",
        "pricemin",
        "product_id",
        "product_name",
        "url",
        "zkouska_pole",
      ],
      getConditionsPlaceholders: [],
      __typename: "FeedExport",
    },
  ],
  __typename: "Collection",
};

export const getFeedExports = async (): Promise<FeedExports> => {
  return feedExports;
};

export const addFeedExport = async (
  feedExport: FeedExport
): Promise<FeedExports> => {
  feedExports.feedExports.push(feedExport);
  return feedExports;
};
