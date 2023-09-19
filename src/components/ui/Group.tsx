import React from "react";
import { IGroup } from "../../types";
import { ArrowDown } from "lucide-react";

interface IGroupPorps {
  opened?: boolean;
  arrow?: boolean;
  name: IGroup["name"];
}

const Group: React.FC<IGroupPorps> = ({
  name,
  opened = false,
  arrow = false,
}) => {
  return (
    <div
      className="
        w-full
        bg-white
        rounded-xl
        p-3
        my-2
        px-6
        flex
        items-center
        justify-between
        shadow-md
        cursor-pointer
        text-gray-500
        hover:text-gray-700
        hover:bg-gray-100
        group

        "
    >
      <span>{name}</span>
      {arrow && (
        <span>
          <ArrowDown
            size={14}
            className={
              `
          transform
          transition
          duration-300
          ease-in-out             
        ` + (opened ? "rotate-180" : "")
            }
          />
        </span>
      )}
    </div>
  );
};

export default Group;
