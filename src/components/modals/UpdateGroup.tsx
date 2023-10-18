import React, { useState } from "react";
import toast from "react-hot-toast";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import * as FaIcon from "lucide-react";
import IconSelector from "./IconSelector";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./Dialog";
import Button from "../ui/Button";
import { firebaseApp } from "../../config/firebase";
import { IGroup } from "../../types";
import ColorSelection from "../ui/ColorSelection";
import { colors } from "./AddNewGroup";

interface Props {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (arg: boolean) => void;
  group: IGroup;
}

const UpdateGroup: React.FC<Props> = ({ open, setOpen, group }) => {
  const db = getFirestore(firebaseApp);
  const [name, setName] = useState(group?.name);
  const [selectedIcon, setSelectedIcon] = useState<string>(group?.icon);
  const [isIconSelectorOpen, setIsIconSelectorOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");

  const IconSelected = FaIcon[selectedIcon];
  const updateGroup = async () => {
    const docRef = doc(db, "groups", group.id);

    await updateDoc(docRef, {
      name: name,
      icon: selectedIcon,
      color: selectedColor,
    })
      .then(() => {
        toast.success("group updated");
      })
      .catch((err) => {
        toast.error(err.code);
      });
  };
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-left">
            Update group
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
          </div>{" "}
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
            className="bg-transparent border-2 hover:opacity-75"
          >
            <span className="text-darkgray">cancel</span>
          </Button>
          <Button
            onClick={() => {
              updateGroup();
              setOpen(false);
            }}
          >
            <span className="text-white">update</span>
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

export default UpdateGroup;
