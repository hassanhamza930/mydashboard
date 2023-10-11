import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdowmMenu";
import { Edit, Trash } from "lucide-react";

interface IGroupMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUpdateGroupOpen?: any;
  deleteGroup?: any;
}

const GroupMenu: React.FC<IGroupMenuProps> = ({
  open,
  setOpen,
  setIsUpdateGroupOpen,
  deleteGroup,
}) => {
  return (
    <DropdownMenu aria-label="Group menu" open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            setIsUpdateGroupOpen(true);
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
            deleteGroup();
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

export default GroupMenu;
