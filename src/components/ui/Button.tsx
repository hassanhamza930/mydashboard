import React from "react";
import { twMerge } from "tailwind-merge";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<Props> = ({ children, className, ...rest }) => {
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
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
