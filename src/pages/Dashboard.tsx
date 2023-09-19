// const webviewArr: string[] = [
//   "https://www.linkedin.com",
//   "https://www.google.com",
// ];

import { useEffect, useState } from "react";
import { fetchGroups } from "../helper/groups";
import useUser from "../hooks/useUser";
import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "../config/firebase";
import { IGroup } from "../types";
import Group from "../components/ui/Group";
import { Link } from "react-router-dom";

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
          grid-cols-4
          gap-5
          w-full
        "
        >
          {groups.map((group, index) => (
            <Link to={`/group/${group.id}`}>
              <Group key={group.id + index} name={group.name} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
