import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { IGroup } from "../types";

/**
 *
 * @param db
 * @param user
 * @param setGroups
 */
export const fetchGroups = async (db, user, setGroups) => {
  const groupsCollection = collection(db, "groups");

  const groupsQuery = query(groupsCollection, where("user", "==", user?.uid));

  onSnapshot(groupsQuery, (querySnapshot) => {
    const groupArr = querySnapshot.docs.map((doc) => doc.data() as IGroup);
    setGroups(groupArr);
  });
};

export const fetchGroupsWithId = async (db, user, setGroups, id) => {
  const groupsQuery = query(
    collection(db, "groups"),
    where("user", "==", user?.uid),
    where("id", "==", id)
  );

  const snapshot = await getDocs(groupsQuery);
  const groupArr = snapshot.docs.map((doc) => doc.data() as IGroup);

  setGroups(groupArr[0]);
};
