import { useToast } from "@/components/ui/use-toast";
import { Chat, Message } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useSendMessage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: sendMessage, isPending } = useMutation<
    Message,
    Error,
    { chatId: string; prompt: string },
    {
      previousMessages: Message[] | undefined;
      previousChats: Chat[] | undefined;
    }
  >({
    mutationFn: async ({
      chatId,
      prompt,
    }: {
      chatId: string;
      prompt: string;
    }) => {
      const response = await fetch(`/api/messages/send/${chatId}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) throw new Error("Failed to send message");

      const data = await response.json();
      return data.response as Message;
    },
    onMutate: async ({ chatId, prompt }) => {
      await queryClient.cancelQueries({ queryKey: ["messages", chatId] });
      await queryClient.cancelQueries({ queryKey: ["chats"] });

      const previousMessages = queryClient.getQueryData<Message[]>([
        "messages",
        chatId,
      ]);

      const previousChats = queryClient.getQueryData<Chat[]>(["chats"]);

      const newMessage: Message = {
        _id: "temp-id-" + Date.now(),
        userId: "current-user",
        chatId,
        content: prompt,
        sender: "user",
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData<Message[]>(
        ["messages", chatId],
        (oldMessages = []) => [...oldMessages, newMessage]
      );

      queryClient.setQueryData<Chat[]>(["chats"], (oldChats = []) =>
        oldChats.map((chat) => {
          if (chat._id === chatId) {
            return { ...chat, title: prompt };
          }
          return chat;
        })
      );

      return { previousMessages, previousChats };
    },
    onSuccess: (botAnswer, { chatId }) => {
      queryClient.setQueryData<Message[]>(
        ["messages", chatId],
        (oldMessages = []) => [...oldMessages, botAnswer]
      );
    },
    onError: (_error, { chatId }, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(
          ["messages", chatId],
          context.previousMessages
        );
      }
      if (context?.previousChats) {
        queryClient.setQueryData(["chats"], context.previousChats);
      }
      toast({ description: "Something went wrong. Please try again" });
    },
  });

  return { sendMessage, isPending };
};

export default useSendMessage;
