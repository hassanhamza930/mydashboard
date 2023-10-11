import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { IGroup } from "../types";
import toast from "react-hot-toast";

const uid = localStorage.getItem("uid");

/**
 *
 * @param db
 * @param user
 * @param setGroups
 */
export const fetchGroups = async (db, user, setGroups) => {
  const groupsCollection = collection(db, "groups");

  const groupsQuery = query(groupsCollection, where("user", "==", uid));

  onSnapshot(groupsQuery, (querySnapshot) => {
    const groupArr = querySnapshot.docs.map((doc) => doc.data() as IGroup);
    setGroups(groupArr);
  });
};

/**
 *
 * @param db
 * @param user
 * @param setGroups
 * @param id
 */
export const fetchGroupsWithId = async (db, user, setGroups, id) => {
  const groupsQuery = query(
    collection(db, "groups"),
    where("user", "==", uid),
    where("id", "==", id)
  );

  const snapshot = await getDocs(groupsQuery);
  const groupArr = snapshot.docs.map((doc) => doc.data() as IGroup);

  setGroups(groupArr[0]);
};

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
