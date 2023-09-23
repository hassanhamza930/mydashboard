import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdowmMenu";

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
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
        <DropdownMenuItem
          onClick={() => {
            setIsUpdateGroupOpen(true);
            setOpen(false);
          }}
        >
          edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem> */}
        <DropdownMenuItem
          onClick={() => {
            deleteGroup();
            setOpen(false);
          }}
        >
          delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GroupMenu;
