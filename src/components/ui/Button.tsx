import React, { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { ring } from "ldrs";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
}

const Button: React.FC<Props> = ({
  children,
  loading = false,
  className,
  ...rest
}) => {
  useEffect(() => {
    ring.register();
  }, []);
  return (
    <button
      className={twMerge(
        `
        bg-primary
        text-white
        font-semibold
        w-full
        text-lg
        px-5
        py-2
        rounded-md
        hover:bg-primary-hover
        active:bg-primary-active
        focus:outline-none
        focus:ring-2
        focus:ring-primary
        focus:ring-opacity-50
        disabled:opacity-50
        disabled:cursor-not-allowed
        `,
        className
      )}
      disabled={loading}
      {...rest}
    >
      {loading ? (
        // Default values shown
        <l-ring
          size="25"
          stroke="3"
          bg-opacity="0"
          speed="2"
          color="white"
        ></l-ring>
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

export default Button;
