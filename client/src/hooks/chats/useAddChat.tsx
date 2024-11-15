import { useToast } from "@/components/ui/use-toast";
import { Chat } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useAddChat = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: addChat, isPending } = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/chats/create", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to create chat");

      const data = await response.json();
      return data.chat;
    },
    onSuccess: (newChat: Chat) => {
      toast({ description: "Chat created successfully" });

      queryClient.setQueryData<Chat[]>(["chats"], (oldChats) => {
        if (!oldChats) return;
        return [newChat, ...oldChats];
      });

      navigate(`/${newChat._id}`);
    },
    onError: () => {
      toast({ description: "Something went wrong. Please try again" });
    },
  });

  return { addChat, isPending };
};

export default useAddChat;
