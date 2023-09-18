import React from "react";
import { IGroup } from "../../types";

const Group: React.FC<IGroup> = ({ name }) => {
  return (
    <div
      className="
        w-full
        bg-red-100
        rounded-full
        p-3
        my-2
        px-8
        shadow-sm
        cursor-pointer
        hover:bg-red-200
        "
    >
      {name}
    </div>
  );
};

export default Group;
