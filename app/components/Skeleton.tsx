import classNames from "classnames";
import { CSSProperties } from "react";

interface Props {
  className?: string;
  count?: number;
  height?: CSSProperties["height"];
  width?: CSSProperties["width"];
}

export const Skeleton = (props: Props) => {
  const { count = 1, className, height = 20, width = "100%" } = props;

  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div
          className={classNames(
            "max-w-full shrink-0 animate-pulse rounded-xl bg-yellow-100",
            className,
          )}
          key={`skeleton_${index}_${count}_${height}`}
          style={{ width, height }}
        />
      ))}
    </>
  );
};
