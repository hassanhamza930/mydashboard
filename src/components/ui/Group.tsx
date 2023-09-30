import React from "react";
import { IGroup } from "../../types";
// import { ArrowDown } from "lucide-react";
import * as FaIcon from "lucide-react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Link } from "react-router-dom";
import UpdateGroup from "../modals/UpdateGroup";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { firebaseApp } from "../../config/firebase";
import GroupMenu from "../DropDowns/GroupMenu";
import toast from "react-hot-toast";

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
      toast.success("Group deleted successfully");
      console.log("Group deleted successfully");
    } catch (error) {
      console.error("Error deleting group:", error.code);
      toast.error(error.code);
      // Handle error, e.g., show an error message to the user
    }
  };

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

        "
      >
        <Link to={`/group/${group.id}`} className="flex w-full p-3 mr-2">
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
        {/* {arrow && (
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
        )} */}
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
            deleteGroup={deleteGroup}
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
