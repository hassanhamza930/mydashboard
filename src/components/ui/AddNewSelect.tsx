import React from "react";
import DividerX from "./DividerX";

interface Props {
  handleClick: (arg: string) => void;
}

const AddNewSelect: React.FC<Props> = ({ handleClick }) => {
  return (
    <div
      className={`
        absolute
        bg-white
        shadow-md
        rounded-xl
        w-[300px]
        top-14
        left-0
        `}
    >
      <ul className="flex flex-col ">
        <li
          onClick={() => handleClick("group")}
          className="text-darkgray 
                hover:bg-gray-100
                p-3
                cursor-pointer
                "
        >
          New MyDashboard group
        </li>
        <DividerX />
        <li
          onClick={() => handleClick("frame")}
          className="text-darkgray 
                hover:bg-gray-100
                p-3
                cursor-pointer
                "
        >
          New frame
        </li>
        <DividerX />
      </ul>
    </div>
  );
};

export default AddNewSelect;
