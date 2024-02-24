"use client";

import classNames from "classnames";
import DagreGraph from "dagre-d3-react";
import { useEffect, useRef, useState } from "react";
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
  const graphRef = useRef(null);
  const [graphWidth, setGraphWidth] = useState("0");
  console.log("🚀 -> Graph -> graphWidth:", graphWidth);
  const nodes: d3Node[] = Array.from(nodesProp).map((node) => ({
    id: node.id,
    label: node.name,
    labelType: "string",
    class: getClassName(node.__typename),
  }));

  const links: d3Link[] = nodes.flatMap(
    (node) =>
      deps.get(node.label)?.map((target) => ({
        source: node.id,
        target: target.id,
      })) ?? []
  );
  useEffect(() => {
    const updateSize = () => {
      if (!graphRef.current) return;
      // @ts-expect-error Does not exist on type never
      setGraphWidth(graphRef.current.offsetWidth);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
  }, []);

  return (
    // Not really stable implementation of d3-dagre
    <div className="flex w-full" ref={graphRef}>
      <ErrorBoundary
        fallback={<div className="mx-auto">Something went wrong</div>}
      >
        <DagreGraph
          nodes={nodes}
          links={links}
          config={{
            rankdir: "LR",
            minlen: 2,
          }}
          width={graphWidth}
          height="1200"
          animate={1000}
          shape="rect"
          fitBoundaries
          zoomable
          onNodeClick={(e: {
            d3node: { class: string; label: string };
            original: unknown;
          }) => console.log(e)}
          onRelationshipClick={(e: unknown) => console.log(e)}
        />
      </ErrorBoundary>
    </div>
  );
}

export default Graph;
