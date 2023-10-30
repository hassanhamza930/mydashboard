import React from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchInput: React.FC<InputProps> = ({ className, ...rest }) => {
  return (
    <input
      className={twMerge(
        `
        bg-white
        border
        outline-none
        shadow-
        rounded-full
        border-[#e9e9e9]
        active:border-primary
        focus:border-primary
        w-full
        p-2
        px-5
        text-md
        `,
        className
      )}
      {...rest}
    />
  );
};

export default SearchInput;
