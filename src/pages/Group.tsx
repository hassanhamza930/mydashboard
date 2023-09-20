import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchGroupsWithId } from "../helper/groups";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import useUser from "../hooks/useUser";
import { IGroup } from "../types";
import { ArrowLeftIcon } from "lucide-react";
import AddNewButton from "../components/ui/AddNewButton";
import AddNewFrame from "../components/modals/AddNewFrame";

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

  // handlers
  const fetchFrames = async () => {
    const framesQuery = query(
      collection(db, "frames"),
      where("user", "==", user?.uid),
      where("groupId", "==", id)
    );

    const snapshot = await getDocs(framesQuery);
    const frames = snapshot.docs.map((doc) => doc.data() as any);
    setFrames(frames);
  };

  useEffect(() => {
    if (id) {
      fetchGroupsWithId(db, user, setGroup, id);
      fetchFrames();
    }
  }, [id, db, user, open]);

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
          {frames.map((frame: any) => (
            <div key={frame.id} style={{ resize: "both", overflow: "auto" }}>
              <webview
                src={frame.link}
                className="
            h-full
            w-full
            resize-both
            overflow-auto
            rounded-xl
            shadow-md
          "
              />
            </div>
          ))}
          {/* <webview src="https://www.google.com" /> */}
        </div>
      )}
      <AddNewFrame groupId={id} open={open} setOpen={setOpen} />
    </div>
  );
};
