import ChatModel from "@/models/models";
import { auth } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdClose } from "react-icons/md";
import DrawerItem from "./DrawerItem";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "./ui/use-toast";
import { BiEdit } from "react-icons/bi";

interface MobileDrawerProps {
  newTitle: string;
  openDrawer: boolean;
  handleClick: () => void;
}

const MobileDrawer = ({
  openDrawer,
  handleClick,
  newTitle,
}: MobileDrawerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [chats, setChats] = useState<ChatModel[]>([]);

  useEffect(() => {
    if (user) {
      fetchChats(user.uid);
    }
  }, [user]);

  useEffect(() => {
    fetchChats(user?.uid || "");
  }, [user]);

  const fetchChats = async (uid: string) => {
    const response = await fetch(`http://localhost:5000/get-chats/${uid}`);
    const data = await response.json();
    data.sort(
      (a: ChatModel, b: ChatModel) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    setChats(data);
  };

  const createChat = async (userId: string) => {
    try {
      const response = await fetch("http://localhost:5000/add-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
      }

      const newChat = await response.json();
      console.log("Chat created:", newChat);

      setChats((prevChats) => {
        const updatedChats = [newChat, ...prevChats];
        updatedChats.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        return updatedChats;
      });

      toast({ title: "Chat added successfully" });
      navigate(`/home/${newChat._id}`);
    } catch (error) {
      toast({
        title: "Something went wrong, try again",
        variant: "destructive",
      });
      console.error("Error creating chat:", error);
    }
  };

  const deleteChat = async (_id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/delete-chat/${_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
      }

      toast({ title: "Chat deleted successfully" });
      setIsLoading(false);
      fetchChats(user?.uid || "");
      if (id === _id) {
        navigate("/home");
      }
    } catch (error) {
      toast({
        title: "Something went wrong, try again",
        variant: "destructive",
      });
      setIsLoading(false);
      console.error("Error with deleting chat:", error);
    }
  };

  return (
    <div
      className={`text-gray-text fixed top-0 w-[60%] md:w-[50%] lg:hidden h-full border-r font-inter border-r-gray-900 bg-gray-drawer ease-in-out duration-500 z-30 ${
        openDrawer ? "left-0" : "left-[-100%]"
      }`}
    >
      <div className="flex justify-between items-center py-3 px-5">
        <h1 className="w-full text-2xl font-bold">ChatAi.</h1>
        <div className="flex gap-2">
          <BiEdit
            size={24}
            className="cursor-pointer text-gray-text hover:text-gray-300"
            onClick={() => createChat(user?.uid || "")}
          />
          <button onClick={handleClick}>
            <MdClose size={26} className="hover:text-gray-300" />
          </button>
        </div>
      </div>
      <div className="flex-1 px-3">
        {chats.map((item) => (
          <DrawerItem
            key={item._id}
            item={item}
            handleDelete={deleteChat}
            isLoading={isLoading}
            newTitle={newTitle}
            handleClick={handleClick}
            isMobile={true}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileDrawer;
