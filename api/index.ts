import { Data } from "./types";

export const getData = async (): Promise<Data | undefined> => {
  try {
    const res = await fetch(
      "https://gist.githubusercontent.com/ondrejbartas/1d1f070808fe582475a752fd8dd9bc5c/raw/03ff2c97e5b9576017be7ad70fa345ecf7dafc94/example_data.json"
    );
    const { data } = (await res.json()) as Data;
    return {
      data,
    };
  } catch (error) {
    console.error(error);
  }
};
