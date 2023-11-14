import React, { useState } from "react";
import toast from "react-hot-toast";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import * as lucidIcon from "lucide-react";
import { v4 as uuid } from "uuid";
//
import IconSelector from "./IconSelector";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./Dialog";
import Button from "../ui/Button";
import { firebaseApp } from "../../config/firebase";
import { IGroup } from "../../types";
import useUser from "../../hooks/useUser";
import ColorSelection from "../ui/ColorSelection";

interface Props {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (arg: boolean) => void;
}

export const colors = [
  { id: 4, hex: "#DAA520" },
  { id: 5, hex: "#DC143C" },
  { id: 6, hex: "#708090" },
  { id: 7, hex: "#FF6347" },
  { id: 8, hex: "#800080" },
  { id: 9, hex: "#008080" },
  { id: 10, hex: "#D2691E" },
  { id: 11, hex: "#3e3e3e" },
];

const AddNewGroup: React.FC<Props> = ({ open, setOpen }) => {
  const db = getFirestore(firebaseApp);
  const user = useUser();
  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string>("AccessibilityIcon");
  const [isIconSelectorOpen, setIsIconSelectorOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [loading, setLoading] = useState(false);
  const [IconSelected] = [lucidIcon[selectedIcon]];

  // handlers
  const addNewGroup = async () => {
    const id = uuid();
    const docRef = doc(db, "groups", id); // Use the generated ID as the document ID

    if (name?.trim() === "") {
      toast.error("Name cannot be empty...");
      return;
    }
    setOpen(false);

    await setDoc(
      docRef,
      {
        user: user.uid,
        name: name,
        id: id,
        icon: selectedIcon,
        color: selectedColor,
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

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-black">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-left">
            New group
          </DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <input
            type="text"
            className="w-full bg-transparent border border-slate-400 rounded-xl p-3 my-2 px-8 shadow-sm"
            placeholder="Group name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex justify-between items-center gap-3">
            <Button
              className="bg-transparent border-slate-400  border hover:opacity-75 text-darkgray"
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
          <div className="flex justify-start flex-wrap items-center gap-3 my-3">
            {colors.map((color) => (
              <ColorSelection
                selectedColor={selectedColor}
                key={color.id}
                color={color}
                handleColorChange={handleColorChange}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center gap-3">
          <Button
            onClick={() => {
              setOpen(false);
            }}
            className="bg-transparent border border-slate-400  hover:opacity-75"
          >
            <span className="text-darkgray">cancel</span>
          </Button>
          <Button
            loading={loading}
            onClick={async () => {
              setLoading(true);
              await addNewGroup();
              setLoading(false);
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
