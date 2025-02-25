import { Variable, Variables } from "./types";

const variables: Variables = {
  __typename: "Collection",
  variables: [
    {
      id: "gid://ppcbee-controll/Modifier/87",
      name: "upraveny nazev",
      placeholderName: "upraveny_nazev",
      showValueType: "text",
      getPlaceholdersWithoutConditions: ["product_name"],
      getConditionsPlaceholders: [],
      imageGen: null,
      additionalSource: null,
      __typename: "DataSourceVariable",
    },
    {
      id: "gid://ppcbee-controll/Modifier/88",
      name: "nazev bez brandu",
      placeholderName: "nazev_bez_brandu",
      showValueType: "text",
      getPlaceholdersWithoutConditions: ["brand", "upraveny_nazev"],
      getConditionsPlaceholders: [],
      imageGen: null,
      additionalSource: null,
      __typename: "DataSourceVariable",
    },
    {
      id: "gid://ppcbee-controll/Modifier/89",
      name: "zkouska pole",
      placeholderName: "zkouska_pole",
      showValueType: "array",
      getPlaceholdersWithoutConditions: [],
      getConditionsPlaceholders: [],
      imageGen: null,
      additionalSource: null,
      __typename: "DataSourceVariable",
    },
    {
      id: "gid://ppcbee-controll/Modifier/90",
      name: "zkouska promenne s podminkou",
      placeholderName: "zkouska_promenne_s_podminkou",
      showValueType: "text",
      getPlaceholdersWithoutConditions: ["brand", "product_name"],
      getConditionsPlaceholders: ["savepercentage"],
      imageGen: null,
      additionalSource: null,
      __typename: "DataSourceVariable",
    },
    {
      id: "gid://ppcbee-controll/Modifier/91",
      name: "asd",
      placeholderName: "asd",
      showValueType: "image",
      getPlaceholdersWithoutConditions: [],
      getConditionsPlaceholders: [],
      imageGen: {
        getPlaceholdersWithoutConditions: [
          "brand",
          "deliverydate",
          "image_url",
          "nazev_bez_brandu",
        ],
        getConditionsPlaceholders: [],
        __typename: "ImageGen",
      },
      additionalSource: null,
      __typename: "DataSourceVariable",
    },
    {
      id: "gid://ppcbee-controll/Modifier/92",
      name: "mesto",
      placeholderName: "mesto",
      showValueType: "text",
      getPlaceholdersWithoutConditions: [],
      getConditionsPlaceholders: [],
      imageGen: null,
      additionalSource: null,
      __typename: "DataSourceVariable",
    },
    {
      id: "gid://ppcbee-controll/Modifier/93",
      name: "templota",
      placeholderName: "templota",
      showValueType: "text",
      getPlaceholdersWithoutConditions: ["mesto", "weather_today_temp_day"],
      getConditionsPlaceholders: [],
      imageGen: null,
      additionalSource: null,
      __typename: "DataSourceVariable",
    },
    {
      id: "gid://ppcbee-controll/DataField/949",
      name: "product_id",
      placeholderName: "product_id",
      showValueType: "text",
      getPlaceholdersWithoutConditions: [],
      getConditionsPlaceholders: [],
      imageGen: null,
      additionalSource: null,
      __typename: "DataSourceVariable",
    },
    {
      id: "gid://ppcbee-controll/DataField/950",
      name: "product_name",
      placeholderName: "product_name",
      showValueType: "text",
      getPlaceholdersWithoutConditions: [],
      getConditionsPlaceholders: [],
      imageGen: null,
      additionalSource: null,
      __typename: "DataSourceVariable",
    },
    {
      id: "gid://ppcbee-controll/DataField/951",
      name: "pricemin",
      placeholderName: "pricemin",
      showValueType: "number",
      getPlaceholdersWithoutConditions: [],
      getConditionsPlaceholders: [],
      imageGen: null,
      additionalSource: null,
      __typename: "DataSourceVariable",
    },
    {
      id: "gid://ppcbee-controll/DataField/952",
      name: "deliverydate",
      placeholderName: "deliverydate",
      showValueType: "number",
      getPlaceholdersWithoutConditions: [],
      getConditionsPlaceholders: [],
      imageGen: null,
      additionalSource: null,
      __typename: "DataSourceVariable",
    },
    {
      id: "gid://ppcbee-controll/DataField/953",
      name: "savepercentage",
      placeholderName: "savepercentage",
      showValueType: "number",
      getPlaceholdersWithoutConditions: [],
      getConditionsPlaceholders: [],
      imageGen: null,
      additionalSource: null,
      __typename: "DataSourceVariable",
    },
    {
      id: "gid://ppcbee-controll/DataField/954",
      name: "url",
      placeholderName: "url",
      showValueType: "text",
      getPlaceholdersWithoutConditions: [],
      getConditionsPlaceholders: [],
      imageGen: null,
      additionalSource: null,
      __typename: "DataSourceVariable",
    },
    {
      id: "gid://ppcbee-controll/DataField/955",
      name: "brand",
      placeholderName: "brand",
      showValueType: "text",
      getPlaceholdersWithoutConditions: [],
      getConditionsPlaceholders: [],
      imageGen: null,
      additionalSource: null,
      __typename: "DataSourceVariable",
    },
    {
      id: "gid://ppcbee-controll/DataField/956",
      name: "image_url",
      placeholderName: "image_url",
      showValueType: "text",
      getPlaceholdersWithoutConditions: [],
      getConditionsPlaceholders: [],
      imageGen: null,
      additionalSource: null,
      __typename: "DataSourceVariable",
    },
    {
      id: "gid://ppcbee-controll/DataField/957",
      name: "first_seen_on",
      placeholderName: "first_seen_on",
      showValueType: "date",
      getPlaceholdersWithoutConditions: [],
      getConditionsPlaceholders: [],
      imageGen: null,
      additionalSource: null,
      __typename: "DataSourceVariable",
    },
    {
      id: "gid://ppcbee-controll/DataField/958",
      name: "weather_today_temp_day",
      placeholderName: "weather_today_temp_day",
      showValueType: "number",
      getPlaceholdersWithoutConditions: [],
      getConditionsPlaceholders: [],
      imageGen: null,
      additionalSource: {
        id: 17,
        __typename: "AdditionalSource",
      },
      __typename: "DataSourceVariable",
    },
    {
      id: "gid://ppcbee-controll/DataField/959",
      name: "sheet_akce_brandu",
      placeholderName: "sheet_akce_brandu",
      showValueType: "text",
      getPlaceholdersWithoutConditions: [],
      getConditionsPlaceholders: [],
      imageGen: null,
      additionalSource: {
        id: 18,
        __typename: "AdditionalSource",
      },
      __typename: "DataSourceVariable",
    },
    {
      id: "gid://ppcbee-controll/DataField/960",
      name: "sheet_akce_zapnuta",
      placeholderName: "sheet_akce_zapnuta",
      showValueType: "text",
      getPlaceholdersWithoutConditions: [],
      getConditionsPlaceholders: [],
      imageGen: null,
      additionalSource: {
        id: 18,
        __typename: "AdditionalSource",
      },
      __typename: "DataSourceVariable",
    },
  ],
};

export const getVariables = async (): Promise<Variables> => {
  return variables;
};

export const addVariable = async (variable: Variable): Promise<Variables> => {
  variables.variables.push(variable);
  return variables;
};
