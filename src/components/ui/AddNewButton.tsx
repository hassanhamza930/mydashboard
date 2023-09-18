import React from "react";
import { twMerge } from "tailwind-merge";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const AddNewButton: React.FC<Props> = ({ className, ...rest }) => {
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
        focus:ring-opacity-50
        disabled:opacity-50
        disabled:cursor-not-allowed
        `,
        className
      )}
      {...rest}
    >
      + Add New
    </button>
  );
};

export default AddNewButton;
