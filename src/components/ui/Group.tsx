import React from "react";
import { IGroup } from "../../types";
import { ArrowDown } from "lucide-react";
import * as FaIcon from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";
import DividerX from "./DividerX";
import { Link } from "react-router-dom";
import UpdateGroup from "../modals/UpdateGroup";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { firebaseApp } from "../../config/firebase";

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

  const deleteGroup = async () => {
    const groupId = group.id;
    const db = getFirestore(firebaseApp);
    const groupDocRef = doc(db, "groups", groupId);

    try {
      await deleteDoc(groupDocRef);
      console.log("Group deleted successfully");
    } catch (error) {
      console.error("Error deleting group:", error.message);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div className="relative">
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
        z-1

        "
      >
        <Link to={`/group/${group.id}`} className="flex">
          <span>{group?.icon && <Icon size={20} className="mr-2" />}</span>
          <span
            className="
          whitespace-nowrap
          overflow-hidden
          overflow-ellipsis
          px-2
          w-[70%]
        "
          >
            {group.name}
          </span>
        </Link>
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
        {options && (
          <div className="flex items-center gap-2">
            <BiDotsVerticalRounded
              size={14}
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

      {open && (
        <div
          className="
            absolute
            top-8
            right-0
            bg-white
            rounded-xl
            my-2
            flex
            gap-2
            items-left
            flex-col
            shadow-lg
            cursor-pointer
            text-gray-500
            border
            border-gray-200
            z-10
            "
        >
          <p
            className="
              hover:bg-gray-200
              p-2
              px-6

            "
            onClick={() => {
              setIsUpdateGroupOpen(true);
              setOpen(false);
            }}
          >
            Edit
          </p>
          <DividerX />
          <p
            className="
              hover:bg-gray-200
              p-2
              px-6
              mb-2
            "
            onClick={async () => {
              await deleteGroup();
              setOpen(false);
            }}
          >
            Delete
          </p>
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
