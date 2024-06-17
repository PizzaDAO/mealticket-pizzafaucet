"use client";

import BoringAvatar from "boring-avatars";
import classNames from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  id: string;
  imageUrl?: string | null;
  size?: number | `${number}`;
  name?: string;
  borderRadius?: "full" | "xl" | "lg" | "md" | "none";
  className?: string;
}

export const Avatar = (props: Props) => {
  const { id, name, size = 32, borderRadius = "full", className = "" } = props;
  const [imageUrl, setImageUrl] = useState<string | null>(props.imageUrl || null);

  useEffect(() => {
    setImageUrl(props.imageUrl || null);
  }, [props.imageUrl]);

  const borderRadiusClass = classNames({
    "rounded-full": borderRadius === "full",
    "rounded-md": borderRadius === "md",
    "rounded-lg": borderRadius === "lg",
    "rounded-xl": borderRadius === "xl",
    "rounded-none": borderRadius === "none",
  });

  return (
    <div
      className={classNames(
        "isolate max-h-full max-w-full shrink-0 overflow-hidden bg-zinc-100 dark:bg-zinc-800",
        borderRadiusClass,
        className,
      )}
      style={{ height: `${size}px`, width: `${size}px` }}
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={name || " "}
          className={`${borderRadiusClass} h-full w-full object-cover`}
          width={size}
          height={size}
          onError={() => setImageUrl(null)}
          unoptimized
        />
      )}

      {!imageUrl && (
        <BoringAvatar
          size={size}
          name={id || name}
          variant="pixel"
          square
        />
      )}
    </div>
  );
};
