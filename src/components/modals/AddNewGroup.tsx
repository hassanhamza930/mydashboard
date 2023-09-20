import React, { useState } from "react";
import toast from "react-hot-toast";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import * as FaIcon from "react-icons/fa";
import { v4 as uuid } from "uuid";
//
import IconSelector from "./IconSelector";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./Dialog";
import Button from "../ui/Button";
import { firebaseApp } from "../../config/firebase";
import { IGroup } from "../../types";
import useUser from "../../hooks/useUser";

interface Props {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (arg: boolean) => void;
}

const AddNewGroup: React.FC<Props> = ({ open, setOpen }) => {
  const db = getFirestore(firebaseApp);
  const user = useUser();
  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string>(FaIcon.FaUser.name);
  const [isIconSelectorOpen, setIsIconSelectorOpen] = useState(false);
  const IconSelected = FaIcon[selectedIcon];

  // handlers
  const addNewGroup = async () => {
    const id = uuid();
    const docRef = doc(db, "groups", id); // Use the generated ID as the document ID

    await setDoc(
      docRef,
      {
        user: user.uid,
        name: name,
        id: id,
        icon: selectedIcon,
      } as IGroup,
      {
        merge: true,
      }
    )
      .then(() => {
        toast.success("New group added");
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
            New group
          </DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <input
            type="text"
            className="w-full bg-transparent border border-gray-200 rounded-xl p-3 my-2 px-8 shadow-sm"
            placeholder="Group name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex justify-between items-center gap-3">
            <Button
              className="bg-transparent border-2 hover:opacity-75 text-darkgray"
              onClick={() =>
                setIsIconSelectorOpen(
                  (isIconSelectorOpen) => !isIconSelectorOpen
                )
              }
            >
              Select icon
            </Button>
            <div className="flex justify-center items-center bg-gray-200 rounded-xl p-3 my-2 px-8 shadow-sm">
              <IconSelected />
            </div>
          </div>
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
            onClick={() => {
              addNewGroup();
              setOpen(false);
            }}
          >
            <span className="text-white">Create</span>
          </Button>
        </div>
      </DialogContent>
      <IconSelector
        open={isIconSelectorOpen}
        setOpen={setIsIconSelectorOpen}
        setSelectedIcon={setSelectedIcon}
      />
    </Dialog>
  );
};

export default AddNewGroup;
