import { CampaignSetting, CampaignSettings } from "./types";

const campaignSettings: CampaignSettings = {
  campaignSettings: [
    {
      id: 53,
      icon: "search-campaign",
      name: "Produktová kampaň #1",
      getPlaceholdersWithoutConditions: ["brand", "product_id"],
      getConditionsPlaceholders: ["brand", "pricemin"],
      adwordsSetting: {
        id: 32,
        getPlaceholdersWithoutConditions: ["pricemin", "savepercentage"],
        __typename: "AdwordsSetting",
      },
      sklikSetting: null,
      bingSetting: null,
      keywordSettings: [
        {
          id: 20,
          name: "asdas",
          getPlaceholdersWithoutConditions: [
            "brand",
            "nazev_bez_brandu",
            "product_name",
            "upraveny_nazev",
          ],
          getConditionsPlaceholders: [],
          __typename: "KeywordSetting",
        },
        {
          id: 21,
          name: "asdas druhy",
          getPlaceholdersWithoutConditions: ["brand", "nazev_bez_brandu"],
          getConditionsPlaceholders: [],
          __typename: "KeywordSetting",
        },
      ],
      baseAdtexts: [
        {
          id: 65,
          type: "ExpandedAdtext",
          parentId: 64,
          name: "Ad 12 podrazeny",
          getPlaceholdersWithoutConditions: [
            "pricemin",
            "savepercentage",
            "url",
          ],
          getConditionsPlaceholders: [],
          __typename: "BaseAdtext",
        },
        {
          id: 66,
          type: "ExpandedAdtext",
          parentId: 65,
          name: "Ad 15",
          getPlaceholdersWithoutConditions: ["pricemin", "url"],
          getConditionsPlaceholders: [],
          __typename: "BaseAdtext",
        },
        {
          id: 64,
          type: "ExpandedAdtext",
          parentId: 0,
          name: "Ad 12",
          getPlaceholdersWithoutConditions: [
            "pricemin",
            "product_name",
            "savepercentage",
            "upraveny_nazev",
            "url",
          ],
          getConditionsPlaceholders: [],
          __typename: "BaseAdtext",
        },
      ],
      bidRules: [
        {
          id: 13,
          name: "CPC pravidlo #1",
          getConditionsPlaceholders: ["brand"],
          __typename: "BidRule",
        },
        {
          id: 14,
          name: "CPC pravidlo #2",
          getConditionsPlaceholders: ["mesto"],
          __typename: "BidRule",
        },
      ],
      __typename: "CampaignSetting",
    },
  ],
  __typename: "Collection",
};

export const getCampaignSettings = async (): Promise<CampaignSettings> => {
  return campaignSettings;
};

export const addCampaignSetting = async (
  campaignSetting: CampaignSetting
): Promise<CampaignSettings> => {
  campaignSettings.campaignSettings.push(campaignSetting);
  return campaignSettings;
};
