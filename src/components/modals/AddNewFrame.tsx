import React, { useState } from "react";
import toast from "react-hot-toast";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
//
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./Dialog";
import Button from "../ui/Button";
import { firebaseApp } from "../../config/firebase";
import useUser from "../../hooks/useUser";

interface Props {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (arg: boolean) => void;
  groupId: string;
}

const AddNewFrame: React.FC<Props> = ({ open, setOpen, groupId }) => {
  const db = getFirestore(firebaseApp);
  const user = useUser();
  const [link, setLink] = useState("");

  // handlers
  const addNewFrame = async () => {
    const id = uuid();
    const docRef = doc(db, "frames", id);

    await setDoc(
      docRef,
      {
        user: user.uid,
        groupId: groupId,
        link,
        id: id,
      },
      {
        merge: true,
      }
    )
      .then(() => {
        toast.success("New frame added");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-left">
            New Frame
          </DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <input
            type="text"
            className="w-full bg-transparent border border-gray-200 rounded-xl p-3 my-2 px-8 shadow-sm"
            placeholder="Frame link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center gap-3">
          <Button
            onClick={() => {
              setOpen(false);
            }}
            className="bg-transparent border-2 hover:opacity-75"
          >
            <span className="text-darkgray">cancel</span>
          </Button>
          <Button
            onClick={async () => {
              await addNewFrame();
              setOpen(false);
            }}
          >
            <span className="text-white">Create</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewFrame;
