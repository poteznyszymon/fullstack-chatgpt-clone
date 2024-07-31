import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import ChatModel from "@/models/models";

interface DrawerItemProps {
  item: ChatModel;
  isLoading: boolean;
  handleDelete: (_id: string) => void;
  newTitle: string;
  isMobile?: boolean;
  handleClick?: () => void;
}

const DrawerItem = ({
  item,
  handleDelete,
  isLoading,
  handleClick,
  isMobile,
}: DrawerItemProps) => {
  const { id } = useParams();
  const handleIconClick = (e: React.MouseEvent, _id: string) => {
    e.preventDefault();
    e.stopPropagation();
    handleDelete(_id);
  };

  const [hoverState, setHoverState] = useState(false);

  return (
    <Link
      to={`/home/${item._id}`}
      className="block w-full"
      onClick={handleClick ? handleClick : () => {}}
    >
      <div
        className={`hover:bg-main-gray rounded-md py-2 pl-2 cursor-pointer text-drawer-item-text ${
          item._id === id ? "bg-main-gray" : ""
        }`}
        onMouseEnter={() => setHoverState(true)}
        onMouseLeave={() => setHoverState(false)}
      >
        <div className="flex items-center justify-between px-2">
          <p className="w-40 truncate">{item.title}</p>
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Dialog onOpenChange={() => setHoverState(false)}>
              <DialogTrigger asChild>
                <FaTrashAlt
                  size={15}
                  className={`hover:text-white pr-1 ${
                    hoverState || isMobile ? "block" : "hidden"
                  }`}
                />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-start">Delete chat?</DialogTitle>
                  <DialogDescription className="flex gap-1">
                    <p>This will delete </p>
                    <p className="font-bold max-w-80 truncate">{item.title}</p>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-2 sm:gap-0">
                  <DialogClose>
                    <Button variant={"outline"} className="w-full">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    variant={"destructive"}
                    className="w-22 "
                    onClick={(e) => handleIconClick(e, item._id)}
                  >
                    Delete
                    {isLoading && (
                      <img
                        src="/loading-icon-white.svg"
                        className="w-5 h-5 ml-1"
                      />
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DrawerItem;
