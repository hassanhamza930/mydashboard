import { useEffect, useState } from "react";
//
import AddNewButton from "./ui/AddNewButton";
import Group from "./ui/Group";
import DividerX from "./ui/DividerX";
import AddNewGroup from "./ui/AddNewGroup";
import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "../config/firebase";
import { IGroup } from "../types";
import useUser from "../hooks/useUser";
import { fetchGroups } from "../helper/groups";

const Sidebar = () => {
  // states
  const [isAddNewGroupOpen, setIsAddNewGroupOpen] = useState<boolean>(false);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const db = getFirestore(firebaseApp);
  const user = useUser();

  // handlers
  const handleClick = () => {
    setIsAddNewGroupOpen(true);
  };

  useEffect(() => {
    fetchGroups(db, user, setGroups);
  }, [isAddNewGroupOpen, db, user]);

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
        <AddNewButton className="" onClick={handleClick}>
          Add Group
        </AddNewButton>
      </div>

      <DividerX />
      <div className="w-full py-3">
        {groups.map((group, index) => (
          <Group arrow key={group.id + index} name={group.name} />
        ))}
      </div>
      {}
      <AddNewGroup open={isAddNewGroupOpen} setOpen={setIsAddNewGroupOpen} />
    </div>
  );
};

export default Sidebar;
