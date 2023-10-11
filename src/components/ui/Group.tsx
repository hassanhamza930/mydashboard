import React, { useEffect } from "react";
import { IGroup } from "../../types";
// import { ArrowDown } from "lucide-react";
import * as FaIcon from "lucide-react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Link } from "react-router-dom";
import UpdateGroup from "../modals/UpdateGroup";
import GroupMenu from "../DropDowns/GroupMenu";
import { deleteGroup } from "../../helper/groups";
import { getFirestore } from "firebase/firestore";
import { fetchFrames } from "../../helper/frames";

interface IGroupPorps {
  opened?: boolean;
  arrow?: boolean;
  options?: boolean;
  group: IGroup;
}

const Group: React.FC<IGroupPorps> = ({
  group,
  opened = false,
  arrow = false,
  options = false,
}) => {
  const Icon = FaIcon[group?.icon];
  const [open, setOpen] = React.useState(opened);
  const [isUpdateGroupOpen, setIsUpdateGroupOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [frames, setFrames] = React.useState([]);
  const [isFramesOpen, setIsFramesOpen] = React.useState(false);
  const db = getFirestore();

  useEffect(
    () => {
      fetchFrames(db, group.id, setLoading, setFrames);
    },
    // eslint-disable-next-line
    []
  );

  return (
    <div className="relative w-full ">
      <div
        className="
        w-full
        bg-white
        rounded-xl  
        my-2
        flex
        items-center   
        shadow-md
        cursor-pointer
        text-gray-500
        hover:text-gray-700
        hover:bg-gray-100
        group
        z-1
        transition
        duration-700
        ease-in-out

        "
      >
        <Link
          to={`/group/${group.id}`}
          className="flex items-center w-full p-3 mr-2"
        >
          <span>
            {(group?.icon && <Icon size={20} className="mr-2" />) ?? null}
          </span>
          <span
            className={
              `
          whitespace-nowrap
          overflow-hidden
          overflow-ellipsis
          px-2
          w-full
        ` + (arrow ? "w-[60%]" : "")
            }
          >
            {group.name}
          </span>
        </Link>
        {arrow && (
          <span
            className="flex items-center justify-center"
            onClick={() => setIsFramesOpen((prev) => !prev)}
          >
            <FaIcon.ArrowDown
              size={14}
              className={
                `
                transform
                transition
                duration-500
                ease-in-out   
                mr-2          
              ` + (isFramesOpen ? "rotate-180" : "")
              }
            />
          </span>
        )}
        {options && (
          <div className="flex items-center gap-2 mr-2">
            <BiDotsVerticalRounded
              size={18}
              className="text-gray-400 group-hover:text-gray-600"
              onClick={() =>
                setOpen((prev) => {
                  return !prev;
                })
              }
            />
          </div>
        )}
      </div>
      <div>
        {isFramesOpen && (
          <div
            className={`flex flex-col gap-2 relative  transition duration-700 ease-in-out ${
              isFramesOpen ? "h-auto" : "h-0"
            }
          
          `}
          >
            {loading && (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-t-2 border-gray-200 rounded-full animate-spin"></div>
              </div>
            )}
            {frames.map((frame) => (
              <div
                key={frame.id}
                className={`
              w-full
              bg-white
              rounded-xl  
              flex
              items-center  
              cursor-pointer
              text-gray-500
              hover:text-gray-700
              hover:bg-gray-100
              group
              z-1
              ${isFramesOpen ? "opacity-100" : "opacity-0"}
              transition
              duration-700
              ease-in-out
              ${isFramesOpen ? "h-10" : "h-0"}
              `}
              >
                <FaIcon.Dot />
                <Link
                  to={`/group/${group.id}/${"#"}${frame.id}`}
                  className="flex items-center w-full p-1 mr-2"
                >
                  <span
                    className={`
          whitespace-nowrap
          overflow-hidden
          overflow-ellipsis
          px-2
          w-full
        `}
                  >
                    {frame.name}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      {open && (
        <div
          className="
        absolute
        top-10
        right-0
        bg-white
        "
        >
          <GroupMenu
            open={open}
            setOpen={setOpen}
            deleteGroup={deleteGroup(db, group.id)}
            setIsUpdateGroupOpen={setIsUpdateGroupOpen}
          />
        </div>
      )}
      <UpdateGroup
        open={isUpdateGroupOpen}
        setOpen={setIsUpdateGroupOpen}
        group={group}
      />
    </div>
  );
};

export default Group;
