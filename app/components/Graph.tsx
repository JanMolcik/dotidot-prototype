"use client";

import classNames from "classnames";
import DagreGraph from "dagre-d3-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useStore } from "../store/StoreProvider";

type labelType = "html" | "svg" | "string";
type d3Node = {
  id: any;
  label: string;
  class?: string;
  labelType?: labelType;
  config?: object;
};
type d3Link = {
  source: string;
  target: string;
  class?: string;
  label?: string;
  config?: object;
};

const classNameString = `[&>.label]:fill-white`;

const getClassName = (type: string) => {
  // https://tailwindcss.com/docs/content-configuration#dynamic-class-names
  switch (type) {
    case "DataSourceVariable":
      return classNames(classNameString, "[&>.label-container]:fill-slate-400");
    case "AdditionalSource":
      return classNames(
        classNameString,
        "[&>.label-container]:fill-orange-400"
      );
    case "FeedExport":
      return classNames(
        classNameString,
        "[&>.label-container]:fill-fuchsia-400"
      );
    case "CampaignSetting":
      return classNames(classNameString, "[&>.label-container]:fill-black");
    default:
      return classNames(classNameString, "[&>.label-container]:fill-gray-300");
  }
};

function Graph() {
  const { nodes: nodesProp, deps } = useStore()();
  const { push } = useRouter();
  const graphRef = useRef(null);
  const [graphWidth, setGraphWidth] = useState("0");
  const [graphHeight, setGraphHeight] = useState("0");

  const nodes: d3Node[] = useMemo(
    () =>
      nodesProp.map((node) => ({
        id: node.id,
        label: node.name,
        labelType: "string",
        class: getClassName(node.__typename),
      })),
    [nodesProp]
  );

  const links: d3Link[] = useMemo(
    () =>
      nodes.flatMap(
        (node) =>
          deps.get(node.id)?.map((target) => ({
            source: node.id,
            target: target.id,
          })) ?? []
      ),
    [nodes, deps]
  );

  // Resizing graph on screen change
  useEffect(() => {
    const updateSize = () => {
      if (!graphRef.current) return;
      // @ts-expect-error Does not exist on type never
      setGraphWidth(graphRef.current.offsetWidth);
      // @ts-expect-error Does not exist on type never
      setGraphHeight(graphRef.current.offsetHeight);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
  }, []);

  return (
    <div className="flex w-full h-[calc(100%-68px)]" ref={graphRef}>
      {/* Not really stable implementation of d3-dagre -> adding fallback */}
      <ErrorBoundary
        fallback={<div className="mx-auto">Unable to render graph</div>}
      >
        <DagreGraph
          nodes={nodes}
          links={links}
          config={{
            rankdir: "LR",
            minlen: 2,
          }}
          width={graphWidth}
          height={graphHeight}
          animate={200}
          shape="rect"
          fitBoundaries
          zoomable
          onNodeClick={(e: {
            d3node: {
              class: string;
              label: string;
              elem: unknown;
            };
            original: d3Node;
          }) => {
            let path: string = e.original.id;
            if (path.includes("/")) {
              const splitPath = path.split("/");
              path = splitPath[splitPath.length - 1];
            }
            push(`/detail/${path}`);
          }}
          onRelationshipClick={(e: unknown) => console.log(e)}
        />
      </ErrorBoundary>
    </div>
  );
}

export default Graph;
