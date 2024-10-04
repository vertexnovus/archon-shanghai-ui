import { Skeleton, Stack } from "@mantine/core";
import range from "lodash/range";

interface SkeletonProps {
  count: number;
  width?: number | string;
  height?: number | string;
}

export function SkeletonWrapper({ count, width = "100%", height = "25" }: SkeletonProps) {
  return (
    <Stack gap="sm">
      {range(0, count).map((val) => (
        <Skeleton key={val} width={width} height={height} />
      ))}
    </Stack>
  );
}
