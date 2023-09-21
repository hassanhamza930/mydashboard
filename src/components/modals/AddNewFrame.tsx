import React, { useState } from "react";
import toast from "react-hot-toast";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import validator from "validator";
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
  const [errorMessages, setErrorMessages] = useState<string>();

  // handlers
  const addNewFrame = async () => {
    if (link === "") {
      setErrorMessages("Link is required");
      return;
    }
    if (
      validator.isURL(link) === false ||
      link.startsWith("https://") === false
    ) {
      setErrorMessages("Link is not valid url format eg: https://example.com");
      return;
    }
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
    setOpen(false);
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
            onChange={(e) => {
              setErrorMessages("");
              setLink(e.target.value);
            }}
          />
          {errorMessages && (
            <p className="text-red-500 text-xs">{errorMessages}</p>
          )}
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
