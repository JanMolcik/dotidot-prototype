export interface Placeholders {
  getPlaceholdersWithoutConditions?: string[];
  getConditionsPlaceholders?: string[];
}

export interface ImageGen extends Placeholders {
  __typename: "ImageGen";
}

export interface AdditionalSource {
  id: number;
  icon?: string;
  name?: string;
  mappingField?: string;
  mappingFields?: string[];
  __typename: "AdditionalSource";
}

export interface Variable extends Placeholders {
  id: string;
  name: string;
  placeholderName: string;
  showValueType: string;
  imageGen: ImageGen | null;
  additionalSource: AdditionalSource | null;
  __typename: "DataSourceVariable";
}

export interface AdwordsSetting extends Placeholders {
  id: number;
  __typename: "AdwordsSetting";
}

export interface KeywordSetting extends Placeholders {
  id: number;
  name: string;
  __typename: "KeywordSetting";
}

export interface BaseAdtext extends Placeholders {
  id: number;
  type: string;
  parentId: number;
  name: string;
  __typename: "BaseAdtext";
}

export interface BidRule extends Placeholders {
  id: number;
  name: string;
  __typename: "BidRule";
}

export interface CampaignSetting extends Placeholders {
  id: number;
  icon: string;
  name: string;
  adwordsSetting: AdwordsSetting;
  sklikSetting: null;
  bingSetting: null;
  keywordSettings: KeywordSetting[];
  baseAdtexts: BaseAdtext[];
  bidRules: BidRule[];
  __typename: "CampaignSetting";
}

export interface FeedExport extends Placeholders {
  id: number;
  icon: string;
  name: string;
  __typename: "FeedExport";
}

export interface Variables {
  variables: Variable[];
  __typename: "Collection";
}

export interface CampaignSettings {
  campaignSettings: CampaignSetting[];
  __typename: "Collection";
}

export interface AdditionalSources {
  additionalSources: AdditionalSource[];
  __typename: "Collection";
}

export interface FeedExports {
  feedExports: FeedExport[];
  __typename: "Collection";
}

export interface Data {
  data: {
    feedExports: FeedExports;
    campaignSettings: CampaignSettings;
    additionalSources: AdditionalSources;
    variables: Variables;
  };
}
