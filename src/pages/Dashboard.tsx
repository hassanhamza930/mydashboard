import { useEffect, useState } from "react";
import { Timestamp, getFirestore } from "firebase/firestore";
import { motion } from "framer-motion";
//
import { fetchGroups } from "../helper/groups";
import useUser from "../hooks/useUser";
import { firebaseApp } from "../config/firebase";
import { IGroup } from "../types";
import Group from "../components/ui/Group";

export const Dashboard = () => {
  // states
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const db = getFirestore(firebaseApp);
  const user = useUser();

  // handlers
  useEffect(() => {
    setLoading(true);
    fetchGroups(db, user, setGroups, () => {
      setLoading(false);
    });
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
          {
            // if loading
            loading && (
              <div className=" absolute flex w-full h-[60vh] justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            )
          }
          {groups.map((group, index) => (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              variants={{
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: 20 },
              }}
              key={group.id + `${Timestamp.now().toMillis()}`}
            >
              <Group key={group.id + index} options group={group} />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};
