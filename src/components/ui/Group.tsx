import { motion } from "framer-motion";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import * as FaIcon from "lucide-react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Link } from "react-router-dom";
//
import UpdateGroup from "../modals/UpdateGroup";
import GroupMenu from "../DropDowns/GroupMenu";
import { IGroup } from "../../types";

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

  useEffect(() => {
    const fetchFrames = async (groupId) => {
      setLoading(true);
      const db = getFirestore();
      const framesRef = collection(db, "frames");
      const framesQuery = query(
        framesRef,
        where("user", "==", localStorage.getItem("uid")),
        where("groupId", "==", groupId)
      );

      onSnapshot(framesQuery, async (snapshot) => {
        const frames = await snapshot.docs.map((doc) => doc.data() as any);
        setFrames(frames);
        setLoading(false);
      });
    };
    fetchFrames(group.id);
  }, [group.id]);
  return (
    <div className="relative w-full ">
      <div
        className={`
        w-full
        rounded-xl  
        my-2
        flex
        items-center   
        shadow-md
        cursor-pointer
        text-white
        hover:text-gray-200
        hover:bg-gray-100
        group
        z-1
        transition
        duration-300
        ease-in-out
        `}
        style={{
          backgroundColor: group?.color || "#",
        }}
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
          <div className="flex items-center gap-2 mr-3">
            <BiDotsVerticalRounded
              size={22}
              className="text-gray-100 group-hover:text-gray-200"
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
            {frames.map((frame, index) => (
              <motion.div
                key={frame.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: 0.1 * index }}
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 20 },
                }}
              >
                <div
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
              </motion.div>
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
            setIsUpdateGroupOpen={setIsUpdateGroupOpen}
            group={group}
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
