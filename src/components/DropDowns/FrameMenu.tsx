import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdowmMenu";
import { Edit, Trash } from "lucide-react";

interface IFrameMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUpdateFrameOpen?: any;
  deleteFrame?: any;
}

const FrameMenu: React.FC<IFrameMenuProps> = ({
  open,
  setOpen,
  setIsUpdateFrameOpen,
  deleteFrame,
}) => {
  return (
    <DropdownMenu aria-label="Frame menu" open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            setIsUpdateFrameOpen(true);
            setOpen(false);
          }}
        >
          <div className="flex items-center gap-x-2">
            <Edit size={12} /> Edit
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            deleteFrame();
            setOpen(false);
          }}
        >
          <div className="flex items-center gap-x-2">
            <Trash size={12} /> Delete
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FrameMenu;
