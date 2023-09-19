import React from "react";
import toast from "react-hot-toast";
import { addDoc, collection, getFirestore } from "firebase/firestore";
//
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./Dialog";
import Button from "./Button";
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
  const [name, setName] = React.useState("");

  const addNewGroup = async () => {
    const docRef = collection(db, "groups");

    await addDoc(docRef, {
      user: user.uid,
      name: name,
      id: String(Date.now()),
    } as IGroup)
      .then(() => {
        toast.success("New group added");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className=" 
        bg-white
      "
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-left">
            New group
          </DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <input
            type="text"
            className="
                w-full
                bg-transparent
                border
                border-gray-200
                rounded-xl
                p-3
                my-2
                px-8
                shadow-sm
            "
            placeholder="Group name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* <input
            type="file"
            className="
                w-full
                bg-transparent
                border
                border-gray-200
                rounded-xl
                p-3
                my-2
                px-8
                shadow-sm
            "
            placeholder="Group name"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
          /> */}
        </div>
        <div
          className="
                flex
                justiify-between
                items-center
                gap-3
            "
        >
          <Button
            onClick={() => {
              setOpen(false);
            }}
            className="bg-transparent border-2 hover:opacity-75 "
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
    </Dialog>
  );
};

export default AddNewGroup;
