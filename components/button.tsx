import { cn } from "@/lib/utils";
import React from "react";

export const Button: React.FC<{
  children?: React.ReactNode;
  className?: string;
  variant?: "simple" | "outline" | "primary" | "accent";
  as?: React.ElementType;
  [x: string]: any;
}> = ({
  children,
  className,
  variant = "primary",
  as: Tag = "button",
  ...props
}) => {
  const variantClass =
    variant === "simple"
      ? "bg-black relative z-10 bg-transparent hover:bg-gray-100  border border-transparent text-black text-md md:text-md transition font-medium duration-200  rounded px-4 py-2  flex items-center justify-center dark:text-white dark:hover:bg-neutral-800 dark:hover:shadow-xl"
      : variant === "outline"
      ? "bg-white relative z-10 hover:bg-black/90 hover:shadow-xl  text-black border border-black hover:text-white text-md md:text-md transition font-medium duration-200  rounded px-4 py-2 flex items-center justify-center"
      : variant === "primary"
      ? "bg-white relative z-10 hover:bg-black/90 hover:shadow-xl  text-black border border-black hover:text-white text-md md:text-md transition font-medium duration-200  rounded px-4 py-2  flex items-center justify-center"
      : variant === "accent"
      ? "bg-orange-500 relative z-10 hover:bg-orange-500/90 hover:shadow-xl text-md md:text-md transition font-medium duration-200 rounded px-4 py-2 flex items-center justify-center"
      : "";
  return (
    <Tag
      className={cn(
        "bg-black relative z-10 hover:bg-black/90  text-white text-md md:text-md transition font-medium duration-200  rounded px-4 py-2  flex items-center justify-center",
        variantClass,
        className
      )}
      // style={{
      //   boxShadow:
      //     "0px -1px 0px 0px #FFFFFF40 inset, 0px 1px 0px 0px #FFFFFF40 inset",
      // }}
      {...props}
    >
      {children ?? `Get Started`}
    </Tag>
  );
};
