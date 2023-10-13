import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { IGroup, IUser } from "../types";
import toast from "react-hot-toast";

/**
 *
 * @param db
 * @param user
 * @param setGroups
 */
export const fetchGroups = async (
  db,
  user: IUser,
  setGroups,
  cb?: () => void
) => {
  if (!user?.uid) return;
  const groupsCollection = collection(db, "groups");

  const groupsQuery = query(groupsCollection, where("user", "==", user?.uid));

  onSnapshot(groupsQuery, (querySnapshot) => {
    const groupArr = querySnapshot.docs.map((doc) => doc.data() as IGroup);
    setGroups(groupArr);
    if (cb) cb();
  });
};

/**
 *
 * @param db
 * @param user
 * @param setGroups
 * @param id
 */
export const fetchGroupsWithId = async (db, user: IUser, setGroups, id) => {
  if (!user?.uid) return;
  const groupsQuery = query(
    collection(db, "groups"),
    where("user", "==", user?.uid),
    where("id", "==", id)
  );

  const snapshot = await getDocs(groupsQuery);
  const groupArr = snapshot.docs.map((doc) => doc.data() as IGroup);

  setGroups(groupArr[0]);
};

/**
 *
 * @param db
 * @param groupId
 */
export const deleteGroup = async (db, groupId) => {
  const groupDocRef = doc(db, "groups", groupId);

  try {
    await deleteDoc(groupDocRef);
    toast.success("Group deleted successfully");
    console.log("Group deleted successfully");
  } catch (error) {
    console.error("Error deleting group:", error.code);
    toast.error(error.code);
  }
};
