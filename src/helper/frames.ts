import { collection, onSnapshot, query, where } from "firebase/firestore";

const uid = localStorage.getItem("uid");

// handlers
export const fetchFrames = async (db, groupId, setLoading, setFrames) => {
  setLoading(true);
  const framesRef = collection(db, "frames");
  const framesQuery = query(
    framesRef,
    where("user", "==", uid),
    where("groupId", "==", groupId)
  );

  onSnapshot(framesQuery, async (snapshot) => {
    const frames = await snapshot.docs.map((doc) => doc.data() as any);
    setFrames(frames);
    setLoading(false);
  });
};
