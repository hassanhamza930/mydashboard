import React from "react";
import toast from "react-hot-toast";
import { addDoc, collection, getFirestore } from "firebase/firestore";
//
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./Dialog";
import Button from "./Button";
import { firebaseApp } from "../../config/firebase";
import { IGroup } from "../../types";

interface Props {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (arg: boolean) => void;
}

const AddNewFrame: React.FC<Props> = ({ open, setOpen }) => {
  const db = getFirestore(firebaseApp);
  const [name, setName] = React.useState("");

  const addNewFrame = async () => {
    // const docRef = collection(db, "groups");
    // await addDoc(docRef, {
    //   name: name,
    //   id: String(Date.now()),
    // } as IGroup)
    //   .then(() => {
    //     toast.success("New group added");
    //   })
    //   .catch((err) => {
    //     toast.error(err.message);
    //   });
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
            New Frame
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
                
                px-8
                shadow-sm
            "
            placeholder="Folder name (Stocks, Schedule, ....)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
                mb-4
                px-8
                shadow-sm
            "
            placeholder="select Icon"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
              //   addNewFrame();
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
