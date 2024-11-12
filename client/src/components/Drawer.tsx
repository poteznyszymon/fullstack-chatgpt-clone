import { FiLayout } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";
import { toast } from "./ui/use-toast";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatModel from "@/models/models";
import DrawerItem from "./DrawerItem";

interface DrawerProps {
  handleClick: () => void;
  showDrawer: boolean;
  newTitle: string;
}

const Drawer = ({ handleClick, showDrawer, newTitle }: DrawerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [chats, setChats] = useState<ChatModel[]>([]);

  useEffect(() => {
    if (user) {
      fetchChats(user.uid);
    }
  }, [user]);

  useEffect(() => {
    fetchChats(user?.uid || "");
  }, [newTitle, user]);

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
    <section
      className={`fixed top-0 left-0 h-full lg:w-64 z-20 bg-gray-drawer hidden justify-between px-4 py-3 transition-transform duration-300 lg:flex ${
        showDrawer ? "translate-x-0" : "-translate-x-[100%]"
      }`}
    >
      <div className="w-screen h-full flex flex-col">
        <nav className="flex justify-between mb-5">
          <FiLayout
            title="Hide menu"
            size={24}
            className="cursor-pointer text-gray-text hover:text-gray-300"
            onClick={handleClick}
          />
          <BiEdit
            title="Create new chat"
            size={26}
            className="cursor-pointer text-gray-text hover:text-gray-300"
            onClick={() => createChat(user?.uid || "")}
          />
        </nav>
        <div className="flex-1">
          {chats.map((item) => (
            <DrawerItem
              key={item._id}
              item={item}
              handleDelete={deleteChat}
              isLoading={isLoading}
              newTitle={newTitle}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Drawer;
