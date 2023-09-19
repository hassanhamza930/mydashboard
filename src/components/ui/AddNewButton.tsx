import React from "react";
import { twMerge } from "tailwind-merge";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const AddNewButton: React.FC<Props> = ({ className, children, ...rest }) => {
  return (
    <button
      className={twMerge(
        `
        bg-white
        text-darkgray
        shadow-md
        font-medium
        w-full
        text-lg
        px-5
        py-3
        rounded-full
        hover:bg-primary-hover
        active:bg-primary-active
        focus:outline-none
        focus:ring-2
        focus:ring-primary
        hover:opacity-90
            active:opacity-80
        focus:ring-opacity-50
        focus:ring-opacity-50
        disabled:opacity-50
        disabled:cursor-not-allowed
        `,
        className
      )}
      {...rest}
    >
      + {children}
    </button>
  );
};

export default AddNewButton;
