import { getData } from "@/api";
import { Variable } from "@/api/types";

const findHelper = (id: string) => (source: { id: number | string }) =>
  source.id.toString() === id;

async function DetailPage({ params: { id } }: { params: { id: string } }) {
  const data = await getData();

  if (!data) {
    return (
      <div className="flex p-4 min-h-screen">Cannot find node with id {id}</div>
    );
  }

  const {
    data: {
      variables: { variables },
      additionalSources: { additionalSources },
      campaignSettings: { campaignSettings },
      feedExports: { feedExports },
    },
  } = data;

  const findFun = findHelper(id);

  const entity =
    variables.find((variable) => {
      const varSplit = (variable as unknown as Variable).id.split("/");
      return varSplit[varSplit.length - 1] === id;
    }) ??
    additionalSources.find(findFun) ??
    feedExports.find(findFun) ??
    campaignSettings.find(findFun) ??
    campaignSettings
      .map((setting) =>
        setting.adwordsSetting.id.toString() === id
          ? setting.adwordsSetting
          : setting.baseAdtexts.find(findFun) ??
            setting.bidRules.find(findFun) ??
            setting.keywordSettings.find(findFun)
      )
      .filter((setting) => setting !== undefined)?.[0];

  return (
    <div className="w-full flex flex-col p-4 min-h-screen">
      {entity ? (
        <>
          <h1 className="text-2xl font-medium">
            Detail of{" "}
            <span className="font-bold">
              {entity.name ?? entity.__typename}
            </span>
          </h1>
          {Object.entries(entity).map(
            ([key, value]) =>
              value && (
                <div key={key} className="grid grid-cols-10">
                  <span className="col-span-4 text-lg font-medium">{key}:</span>
                  <span className="col-span-6 text-lg">
                    {typeof value === "object" ? JSON.stringify(value) : value}
                  </span>
                </div>
              )
          )}
        </>
      ) : (
        <h1 className="text-2xl font-medium">
          Could not find variable with id {id}
        </h1>
      )}
    </div>
  );
}

export default DetailPage;
