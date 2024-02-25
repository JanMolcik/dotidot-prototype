import { Skeleton } from "@mantine/core";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex flex-col gap-4 w-full min-h-screen p-4">
      <Skeleton height={36} />
      <Skeleton height={1200} mt={6} />
    </div>
  );
}
