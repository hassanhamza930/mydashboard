import React, { useEffect, useState } from "react";
//
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./Dialog";
// import * as Icons from "react-icons/fa";
import * as LucidIcon from "lucide-react";

interface Props {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (arg: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  setSelectedIcon: (args: any) => void;
}

const IconSelector: React.FC<Props> = ({ open, setOpen, setSelectedIcon }) => {
  // state
  const [search, setSearch] = useState("");
  const [iconArray, setIconArray] = useState<string[]>([]);

  // handlers
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search === "")
        return setIconArray(Object.keys(LucidIcon).slice(1, 400));
      const filteredIcons = Object.keys(LucidIcon).filter((icon) => {
        return icon.toLowerCase().includes(search.toLowerCase());
      });
      setIconArray(filteredIcons);
    }, 500);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    const iconArray = Object.keys(LucidIcon).slice(1, 400);
    setIconArray(iconArray);
  }, [search]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className=" 
        bg-white
      "
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-left">
            Select Icons
          </DialogTitle>
        </DialogHeader>

        <input
          type="text"
          className="
                w-full
                p-3
                rounded-xl
                outline-none
                border
                border-gray-200
                focus:border-blue-500
                focus:ring-0
                "
          placeholder="Search for icons"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div
          className="
                flex
                justiify-center
                items-start
                gap-3
                flex-wrap
                overflow-y-auto
                h-[400px]

            "
        >
          {iconArray.map((icon, index) => {
            const Icon = LucidIcon[icon];
            return (
              <div
                key={index}
                className="
                               grid
                                place-items-center
                                p-3
                                rounded-xl
                                cursor-pointer
                                hover:opacity-75
                                ease-in-out
                                border
                                border-gray-200
                                hover:bg-gray-100

                                "
                onClick={() => {
                  setSelectedIcon(icon);
                  setOpen(false);
                }}
              >
                <Icon className="text-4xl" />
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IconSelector;
