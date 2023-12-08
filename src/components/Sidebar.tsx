import { useEffect, useState } from "react";
//
import AddNewButton from "./ui/AddNewButton";
import Group from "./ui/Group";
import DividerX from "./ui/DividerX";
import AddNewGroup from "./modals/AddNewGroup";
import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "../config/firebase";
import { IGroup } from "../types";
import useUser from "../hooks/useUser";
import { fetchGroups } from "../helper/groups";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Sidebar = () => {
  // states
  const [isAddNewGroupOpen, setIsAddNewGroupOpen] = useState<boolean>(false);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const db = getFirestore(firebaseApp);
  const user = useUser();

  // handlers
  const handleClick = () => {
    if (user?.plan !== "pro" && groups?.length >= 3) {
      toast.error("You can only create 3 groups in the free plan");
      return;
    }
    setIsAddNewGroupOpen(true);
  };

  useEffect(() => {
    fetchGroups(db, user, setGroups);
  }, [db, user]);

  return (
    <div
      className="
        w-[305px]
        h-[100vh]
        overflow-y-auto
        flex
        flex-col
        items-start
        p-5
      "
    >
      <div className="relative w-full mb-5">
        <AddNewButton
          className="text-md bg-primary text-white"
          onClick={handleClick}
        >
          Add Group
        </AddNewButton>
      </div>

      <DividerX />
      <div className="w-full py-3">
        {groups.map((group, index) => (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 10 },
            }}
            key={group.id + index}
          >
            <Group key={group.id + index} arrow group={group} />
          </motion.div>
        ))}
      </div>
      {}
      <AddNewGroup open={isAddNewGroupOpen} setOpen={setIsAddNewGroupOpen} />
    </div>
  );
};

export default Sidebar;
