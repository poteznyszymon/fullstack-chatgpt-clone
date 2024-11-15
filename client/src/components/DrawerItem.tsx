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
import { Chat } from "@/lib/types";
import { Loader2 } from "lucide-react";
import useDeleteChat from "@/hooks/chats/useDeleteChat";

interface DrawerItemProps {
  item: Chat;
}

const DrawerItem = ({ item }: DrawerItemProps) => {
  const { chatId } = useParams();
  console.log(chatId);
  const { deleteChat, isPending: isLoading } = useDeleteChat();
  const handleIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    deleteChat(item._id);
    setIsDialogOpen(false);
  };

  const [hoverState, setHoverState] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Link to={`/${item._id}`} className="block w-full" onClick={() => {}}>
      <div
        className={`hover:bg-main-gray rounded-md py-2 pl-2 cursor-pointer text-drawer-item-text ${
          item._id === chatId ? "bg-main-gray" : ""
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
            <Dialog
              open={isDialogOpen}
              onOpenChange={() => {
                setHoverState(false);
                (isOpen: boolean) => setIsDialogOpen(isOpen);
              }}
            >
              <DialogTrigger asChild>
                <FaTrashAlt
                  title="Delete chat"
                  size={15}
                  className={`hover:text-white pr-1 ${
                    hoverState ? "block" : "hidden"
                  }`}
                  onClick={() => setIsDialogOpen(true)}
                />
              </DialogTrigger>
              <DialogContent onClick={() => setIsDialogOpen(false)}>
                <DialogHeader>
                  <DialogTitle className="text-start">Delete chat?</DialogTitle>
                  <DialogDescription className="flex gap-1">
                    <p>This will delete </p>
                    <p className="font-bold max-w-80 truncate">{item.title}</p>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-2 sm:gap-0">
                  <DialogClose onClick={() => setIsDialogOpen(false)}>
                    <Button variant={"outline"} className="w-full">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    variant={"destructive"}
                    className="w-22 "
                    onClick={(e) => handleIconClick(e)}
                  >
                    {isLoading ? (
                      <Loader2 className="size-5 animate-spin w-11" />
                    ) : (
                      <p className="w-11">Delete</p>
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
