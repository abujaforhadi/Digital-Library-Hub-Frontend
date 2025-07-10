import React from "react";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export const Heading = ({
  size = "md",
  children,
  className = "",
  ...props
}: HeadingProps) => {
  const baseStyle = "font-semibold";
  const sizeStyle =
    size === "sm" ? "text-lg" : size === "lg" ? "text-2xl" : "text-xl";

  return (
    <h2 className={`${baseStyle} ${sizeStyle} ${className}`} {...props}>
      {children}
    </h2>
  );
};
