import { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
//
import { fetchGroups } from "../helper/groups";
import useUser from "../hooks/useUser";
import { firebaseApp } from "../config/firebase";
import { IGroup } from "../types";
import Group from "../components/ui/Group";

export const Dashboard = () => {
  // states
  const [groups, setGroups] = useState<IGroup[]>([]);
  const db = getFirestore(firebaseApp);
  const user = useUser();

  // handlers
  useEffect(() => {
    fetchGroups(db, user, setGroups);
  }, [user, db]);

  return (
    <>
      <div>
        <h1
          className="
          text-3xl
          font-semibold
          text-left
          text-gray-800
          mb-5
        "
        >
          Groups
        </h1>
        <div
          className="
          grid
          xl:grid-cols-4
          md:grid-cols-3
          sm:grid-cols-2
          grid-cols-1
          gap-5
          w-full
        "
        >
          {groups.map((group, index) => (
            <Group key={group.id + index} options group={group} />
          ))}
        </div>
      </div>
    </>
  );
};
