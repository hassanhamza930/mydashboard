import { useEffect, useState } from "react";
//
import AddNewButton from "./ui/AddNewButton";
import AddNewSelect from "./ui/AddNewSelect";
import Group from "./ui/Group";
import DividerX from "./ui/DividerX";
import AddNewGroup from "./ui/AddNewGroup";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { firebaseApp } from "../config/firebase";
import { IGroup } from "../types";
import AddNewFrame from "./ui/AddNewFrame";

const Sidebar = () => {
  // states
  const [isAddNewButtonClicked, setIsAddNewButtonClicked] =
    useState<boolean>(false);
  const [isAddNewGroupOpen, setIsAddNewGroupOpen] = useState<boolean>(false);
  const [isAddNewFrameOpen, setIsAddNewFrameOpen] = useState<boolean>(false);
  const [groups, setGroups] = useState<IGroup[]>([]);

  // handlers
  const handleClick = (arg: string) => {
    if (arg === "group") {
      setIsAddNewGroupOpen(true);
    } else if (arg === "frame") {
      setIsAddNewFrameOpen(true);
    }
    setIsAddNewButtonClicked(false);
  };

  // fetch groups
  const fetchGroups = async () => {
    const db = getFirestore(firebaseApp);
    const docRef = await collection(db, "groups");
    const snapshot = await getDocs(docRef);
    const groupArr = snapshot.docs.map((doc) => doc.data() as IGroup);

    setGroups(groupArr);
  };

  useEffect(() => {
    fetchGroups();
  }, [isAddNewGroupOpen]);

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
          onClick={() => setIsAddNewButtonClicked(!isAddNewButtonClicked)}
        />
        {isAddNewButtonClicked && <AddNewSelect handleClick={handleClick} />}
      </div>

      <DividerX />
      <div className="w-full py-3">
        {groups.map((group, index) => (
          <Group key={group.id + index} name={group.name} id={group.id} />
        ))}
      </div>
      {}
      <AddNewGroup open={isAddNewGroupOpen} setOpen={setIsAddNewGroupOpen} />
      <AddNewFrame open={isAddNewFrameOpen} setOpen={setIsAddNewFrameOpen} />
    </div>
  );
};

export default Sidebar;
