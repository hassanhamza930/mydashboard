import React from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ className, ...rest }) => {
  return (
    <input
      className={twMerge(
        `
      bg-transparent
      outline-none
      border-b-2
      border-[#bbbbbb]
      active:border-primary
      focus:border-primary
      w-full
      p-2
      text-md
      

    `,
        className
      )}
      {...rest}
    />
  );
};

export default Input;
