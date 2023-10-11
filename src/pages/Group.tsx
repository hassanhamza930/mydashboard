import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchGroupsWithId } from "../helper/groups";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import useUser from "../hooks/useUser";
import { IFrame, IGroup } from "../types";
import { ArrowLeftIcon } from "lucide-react";
import AddNewButton from "../components/ui/AddNewButton";
import AddNewFrame from "../components/modals/AddNewFrame";
import Frame from "../components/ui/Frame";

export const Group = () => {
  //
  const { id } = useParams();
  const db = getFirestore();
  const user = useUser();
  const navigate = useNavigate();
  // states
  const [group, setGroup] = useState<IGroup>(null);
  const [frames, setFrames] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // handlers
  const fetchFrames = async () => {
    setLoading(true);
    const framesRef = collection(db, "frames");
    const framesQuery = query(
      framesRef,
      where("user", "==", user?.uid),
      where("groupId", "==", id)
    );

    onSnapshot(framesQuery, async (snapshot) => {
      const frames = await snapshot.docs.map((doc) => doc.data() as any);
      setFrames(frames);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (id) {
      fetchGroupsWithId(db, user, setGroup, id);
      fetchFrames();
    }
  }, [id, db, user]);

  if (loading)
    return (
      <div className="w-full h-[50vh] flex items-center justify-center">
        <div
          className="animate-spin rounded-full h-12 w-12  border-b-2 
          border-blue-500
        "
        ></div>
      </div>
    );

  return (
    <div>
      <div
        className="
        w-full
        flex
        items-center
        justify-between
        mb-5
      "
      >
        <div className="groupname flex  items-center">
          <ArrowLeftIcon
            className="mr-2 -ml-4 text-gray-500 cursor-pointer"
            size={20}
            onClick={() => navigate("/dashboard")}
          />
          <span className="text-2xl font-semibold ">
            {group?.name.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center">
          <AddNewButton
            className="
            bg-primary
            text-white
            font-medium
            text-sm
            focus:ring-primary
          "
            onClick={() => setOpen(true)}
          >
            Add Frame
          </AddNewButton>
        </div>
      </div>
      {frames.length === 0 ? (
        <div
          className="
        text-center
        text-gray-300
        text-[30px]
        font-medium
        w-full
        h-[50vh]
        flex
        items-center
        justify-center
        "
        >
          No frames added yet. Add a new frame to get started.
        </div>
      ) : (
        <div
          className="
        flex
        flex-wrap
        gap-5
      "
        >
          {frames.map((frame: IFrame) => (
            <Frame frame={frame} key={frame.id} />
          ))}
          {/* <webview src="https://www.google.com" /> */}
        </div>
      )}
      <AddNewFrame groupId={id} open={open} setOpen={setOpen} />
    </div>
  );
};
