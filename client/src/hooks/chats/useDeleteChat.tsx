import { useToast } from "@/components/ui/use-toast";
import { Chat } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

const useDeleteChat = () => {
  const { toast } = useToast();
  const { chatId: currentChatId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteChat, isPending } = useMutation({
    mutationFn: async (chatId: string) => {
      const response = await fetch(`/api/chats/${chatId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error();
      return data.chat;
    },
    onSuccess: (deletedChat: Chat) => {
      toast({ description: "Chat deleted successfully" });

      queryClient.setQueryData<Chat[]>(["chats"], (oldChats) => {
        if (!oldChats) return;
        return oldChats.filter((chat) => chat._id !== deletedChat._id);
      });

      if (currentChatId === deletedChat._id) {
        navigate("/");
      }
    },
    onError: () => {
      toast({ description: "Something went wrong. Please try again" });
    },
  });

  return { deleteChat, isPending };
};

export default useDeleteChat;
