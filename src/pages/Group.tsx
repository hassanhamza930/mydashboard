import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchGroupsWithId } from "../helper/groups";
import { getFirestore } from "firebase/firestore";
import useUser from "../hooks/useUser";
import { IGroup } from "../types";
import { ArrowLeftIcon } from "lucide-react";
import AddNewButton from "../components/ui/AddNewButton";

export const Group = () => {
  //
  const { id } = useParams();
  const db = getFirestore();
  const user = useUser();
  const navigate = useNavigate();
  // states
  const [group, setGroup] = useState<IGroup>(null);

  useEffect(() => {
    if (id) {
      fetchGroupsWithId(db, user, setGroup, id);
    }
  }, [id, db, user]);

  return (
    <div>
      <div
        className="
        w-full
        flex
        items-center
        justify-between
        mb-5
      "
      >
        <div className="groupname flex  items-center">
          <ArrowLeftIcon
            className="mr-2 -ml-4 text-gray-500 cursor-pointer"
            size={20}
            onClick={() => navigate("/dashboard")}
          />
          <span className="text-2xl font-semibold ">
            {group?.name.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center">
          <AddNewButton
            className="
            bg-primary
            text-white
            font-medium
            text-sm
            focus:ring-primary
          "
          >
            Add Frame
          </AddNewButton>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <webview src="https://www.google.com" />
      </div>
    </div>
  );
};
