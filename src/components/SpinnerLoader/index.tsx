import React from "react";

type LoaderVariant = "primary" | "secondary" | "white" | "dark";
type LoaderSize = "xs" | "sm" | "md" | "lg";

interface SpinnerLoaderProps {
  size?: LoaderSize;
  variant?: LoaderVariant;
  className?: string;
  fullWidth?: boolean;
  label?: string;
}

const SpinnerLoader: React.FC<SpinnerLoaderProps> = ({
  size = "md",
  variant = "primary",
  className = "",
  fullWidth = false,
  label,
}) => {
  const sizeMap = {
    xs: "w-3 h-3 border",
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-[3px]",
  };

  const variantMap = {
    primary: "border-gray-300 border-t-primary",
    secondary: "border-gray-200 border-t-gray-600",
    white: "border-white/30 border-t-white",
    dark: "border-gray-600 border-t-gray-900",
  };

  const containerClass = fullWidth ? "flex justify-center w-full" : "inline-flex";

  return (
    <div className={`${containerClass} items-center ${className}`}>
      <div
        className={`animate-spin rounded-full ${sizeMap[size]} ${variantMap[variant]}`}
        role="status"
        aria-label={label || "Loading"}
      >
        <span className="sr-only">{label || "Loading..."}</span>
      </div>
      {label && <span className="ml-2 text-sm">{label}</span>}
    </div>
  );
};

export default SpinnerLoader;
